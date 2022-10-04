/**
 * Сервис выписок сотрудника банка.
 */
import type { RequestPeriodType, IGetTransactionCardResponseDto } from 'interfaces/dto';
import { asyncNoop } from 'utils/common';
import type { IServerDataResp } from '@platform/services/client';

export const statementService = {
  /** Получить сущность "Запрос выписки". */
  // TODO убрать eslint-disable после реализации метода
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getStatementRequest: (id: string) => asyncNoop,
  /** Возвращает проводку. */
  // TODO убрать eslint-disable после реализации метода
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getTransaction: ({ accountingEntryId }: { accountingEntryId: string }): Promise<IServerDataResp<IGetTransactionCardResponseDto>> =>
    asyncNoop(),
  /** Возвращает временной период. */
  // TODO убрать eslint-disable после реализации метода
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDatePeriod: ({ periodType }: { periodType: RequestPeriodType }) => asyncNoop,
};
