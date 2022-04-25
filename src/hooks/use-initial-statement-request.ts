import { useMemo, useState } from 'react';
import type { IUrlParams } from 'interfaces';
import { DATE_PERIODS, HTTP_STATUS_CODE } from 'interfaces';
import type { ILatestStatementDto, IGetDatePeriodResponseDto, RequestPeriodType } from 'interfaces/dto';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services';
import { NEW_ENTITY_ID } from 'stream-constants';
import type { IServerDataResp } from '@platform/services';
import { ERROR } from '@platform/services/client';

/**
 * Возвращает начальные значения для формы создания выписки.
 *
 * Если форма открывается для создания новой выписки,
 * то она предзаполняентся значениями последний запрашиваемой выписки.
 *
 * Иначе подразумевается, что форма открыта на копирование,
 * и предзаполняентся значениями выписки, id которой указан в УРЛе.
 */
export const useInitialStatementRequest = (): {
  initialStatementRequest: ILatestStatementDto | undefined;
  isInitialLoading: boolean;
  isInitialError: boolean;
  isForbidden;
} => {
  const { id } = useParams<IUrlParams>();
  const [isForbidden, setIsForbidden] = useState(false);

  const isNewStatement = id === NEW_ENTITY_ID;

  const statementRequestFetcher = useMemo(() => {
    if (isNewStatement) {
      return statementService.getLatestStatementRequest;
    }

    return () => statementService.getStatementRequest(id);
  }, [id, isNewStatement]);

  const {
    data: statementRequestResp,
    isLoading: isStatementRequestLoading,
    isError: isStatementRequestLoadingError,
    isSuccess: isSuccessStatementRequest,
  } = useQuery<IServerDataResp<ILatestStatementDto>>({
    queryKey: ['@eco/statement', 'get-statement-request', id],
    queryFn: statementRequestFetcher,
    retry: false,
    onError: err => {
      // При 403 выкидывается ошибка с помощью createError, поэтому перехватываем здесь
      const { status } = (err as { response: { status: number } }).response;

      if (status === ERROR.FORBIDDEN) {
        setIsForbidden(true);
      }
    },
    cacheTime: 0,
  });

  const { data: statementRequest, error: statementRequestError } = statementRequestResp ?? {};

  const { periodType } = statementRequest ?? {};

  const { data: periodResp, isLoading: isPeriodLoading, isError: isPeriodLoadingError } = useQuery<IGetDatePeriodResponseDto>({
    queryKey: ['@eco/statement', 'initial-period', periodType],
    queryFn: () =>
      statementService.getDatePeriod({
        periodType: periodType as RequestPeriodType,
      }),
    // При создании новой выписки, для запроса последней выписки, не требуется пересчитывать период, т.к это выполняется на беке.
    enabled: Boolean(periodType) && periodType !== DATE_PERIODS.SELECT_PERIOD && !isNewStatement,
    retry: false,
  });

  if (statementRequest && periodResp) {
    statementRequest.periodStart = periodResp.dateFrom;
    statementRequest.periodEnd = periodResp.dateTo;
  }

  // Код 404 не считается ошибкой - пользователь открыл форму для создания первой выписки, и у него нет предыдущих выписок.
  const allowedState = Number(statementRequestError?.code) === HTTP_STATUS_CODE.NOT_FOUND || isSuccessStatementRequest;

  return {
    initialStatementRequest: statementRequest,
    isInitialLoading: isStatementRequestLoading || isPeriodLoading,
    isInitialError:
      isStatementRequestLoadingError || isPeriodLoadingError || (Boolean(statementRequestError) && !allowedState && isNewStatement),
    isForbidden,
  };
};
