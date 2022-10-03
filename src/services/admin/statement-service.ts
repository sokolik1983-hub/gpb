/**
 * Сервис выписок сотрудника банка.
 */
import type { RequestPeriodType } from 'interfaces/dto';
import { asyncNoop } from 'utils/common';

export const statementService = {
  getLatestStatementRequest: asyncNoop,
  getStatementRequest: (id: string) => {
    console.log(id);

    return asyncNoop;
  },
  getDatePeriod: ({ periodType }: { periodType: RequestPeriodType }) => {
    console.log(periodType);

    return asyncNoop;
  },
};
