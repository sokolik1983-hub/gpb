import type { ScrollerResponseDto } from 'interfaces';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import type { IServerDataResp } from '@platform/services/admin';

const transactionsList: BankAccountingEntryCard[] = [];

export const mockTransactionsPageData: IServerDataResp<ScrollerResponseDto<BankAccountingEntryCard>> = {
  data: {
    page: transactionsList,
    size: transactionsList.length,
  },
  // TODO: Для проверки ошибки сервера.
  // error: {
  //   code: '540',
  //   message: 'Error Closed Days',
  // },
};
