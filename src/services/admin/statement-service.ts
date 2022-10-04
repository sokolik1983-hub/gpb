/**
 * Сервис выписок сотрудника банка.
 */
import type { RequestPeriodType } from 'interfaces/dto';
import { asyncNoop } from 'utils/common';

export const statementService = {
  /** Получить сущность "Запрос выписки". */
  getStatementRequest: (id: string) => {
    console.log(id);

    return asyncNoop;
  },
  /** Возвращает временной период. */
  getDatePeriod: ({ periodType }: { periodType: RequestPeriodType }) => {
    console.log(periodType);

    return asyncNoop;
  },
};
