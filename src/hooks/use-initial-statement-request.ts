import { useMemo } from 'react';
import type { IUrlParams } from 'interfaces';
import { DATE_PERIODS } from 'interfaces';
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
} => {
  const { id } = useParams<IUrlParams>();

  const isNewStatement = id === NEW_ENTITY_ID;

  const statementRequestFetcher = useMemo(() => {
    if (isNewStatement) {
      return statementService.getLatestStatementRequest;
    }

    return () => statementService.getStatementRequest(id);
  }, [id, isNewStatement]);

  const { data: StatementRequestResp, isLoading: isStatementRequestLoading, isError: isStatementRequestLoadingError } = useQuery<
    IServerDataResp<ILatestStatementDto>
  >({
    queryKey: ['@eco/statement', 'get-statement-request', id],
    queryFn: statementRequestFetcher,
    retry: false,
  });

  const { data: statementRequest, error: statementRequestError } = StatementRequestResp ?? {};

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

  // Если по запросу последней выписки пришёл ответ 404, то это не считается ошибкой,
  // так как подразумевается, что пользователь открыл форму для создания первой выписки
  // и у него нет предыдущих выписок.
  const isStatementRequestError =
    // Приведение к строке потому, что в ДТО на фронте указано, что code - это строка, и в свагере указано, что code - это строка,
    // а по факту возвращается числовой тип, в других сервисах наблюдается аналогичное поведение.
    Boolean(statementRequestError && !(String(statementRequestError.code) === String(ERROR.NOT_FOUND) && isNewStatement));

  return {
    initialStatementRequest: statementRequest,
    isInitialLoading: isStatementRequestLoading || isPeriodLoading,
    isInitialError: isStatementRequestLoadingError || isPeriodLoadingError || isStatementRequestError,
  };
};
