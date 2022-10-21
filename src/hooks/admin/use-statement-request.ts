import { useMemo, useState } from 'react';
import type { IUrlParams } from 'interfaces';
import { DATE_PERIODS } from 'interfaces';
import type { RequestPeriodType } from 'interfaces/dto';
import type { IStatementRequestCardDto } from 'interfaces/dto/admin';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { statementService } from 'services/admin';
import { NEW_ENTITY_ID } from 'stream-constants';
import { ERROR } from '@platform/services/admin';

/**
 * Возвращает начальные значения для формы создания выписки.
 *
 * Если форма открывается для создания новой выписки,
 * то она предзаполняентся значениями последний запрашиваемой выписки.
 *
 * Иначе подразумевается, что форма открыта на копирование,
 * и предзаполняентся значениями выписки, id которой указан в УРЛе.
 */
export const useStatementRequest = (): {
  statementRequest: IStatementRequestCardDto | undefined;
  isLoading: boolean;
  isError: boolean;
  isForbidden;
} => {
  const { id } = useParams<IUrlParams>();
  const [isForbidden, setIsForbidden] = useState(false);

  const statementRequestFetcher = useMemo(
    () => () => {
      const isNewStatement = id === NEW_ENTITY_ID;

      if (isNewStatement) {
        return new Error('Creating a new statement is unavailable for bank employee.');
      }

      return statementService.getStatementRequest(id);
    },
    [id]
  );

  const { data: statementRequestResp, isLoading: isStatementRequestLoading, isError: isStatementRequestLoadingError } = useQuery<any>({
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

  const { data: statementRequest } = statementRequestResp ?? {};

  const { periodType } = statementRequest ?? {};

  const { data: periodResp, isLoading: isPeriodLoading, isError: isPeriodLoadingError } = useQuery<any>({
    queryKey: ['@eco/statement', 'initial-period', periodType],
    queryFn: () =>
      statementService.getDatePeriod({
        periodType: periodType as RequestPeriodType,
      }),
    // При создании новой выписки, для запроса последней выписки, не требуется пересчитывать период, т.к это выполняется на беке.
    enabled: Boolean(periodType) && periodType !== DATE_PERIODS.SELECT_PERIOD,
    retry: false,
  });

  if (statementRequest && periodResp) {
    statementRequest.periodStart = periodResp.dateFrom;
    statementRequest.periodEnd = periodResp.dateTo;
  }

  return {
    statementRequest,
    isLoading: isStatementRequestLoading || isPeriodLoading,
    isError: isStatementRequestLoadingError || isPeriodLoadingError,
    isForbidden,
  };
};
