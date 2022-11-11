/* eslint-disable @eco/no-missing-localization */
import type { IScrollerResponseDto } from 'interfaces';
import type { BankAccountingChangedEntry } from 'interfaces/admin/dto/bank-accounting-changed-entry';
import { CHANGED_ENTRY_STATUSES } from 'interfaces/changed-entry-statuses';
import type { IServerDataResp } from '@platform/services/admin';

const changedEntries: BankAccountingChangedEntry[] = Array(30)
  .fill(null)
  .map((_, index) => {
    const credit = index % 2 === 0 ? (index + 1) * 1000 : 0;
    const debit = index % 2 === 0 ? 0 : (index + 1) * 1000;

    return {
      id: `_randomId_${index}`,
      amountByCredit: credit,
      amountByDebit: debit,
      counterpartyAccountNumber: '40702810100210201421',
      counterpartyName: 'ООО «Контрагент Софт Системс»',
      debitSign: index % 2 !== 0,
      documentDate: '2021-18-06',
      documentNumber: 1000 + index,
      entryDate: '2021-18-06',
      incomingBalance: credit,
      outgoingBalance: debit,
      paymentPurpose: 'Тестовая проводка',
      turnoverByCredit: credit,
      turnoverByDebit: debit,
      currencyNumericCodeByDebit: 'RUB',
      currencyNumericCodeByCredit: 'RUB',
      bankClientAccountNumber: '40702810100210201421',
      bankClientName: 'ООО «Клиент Софт Системс»',
      status: index % 3 === 0 ? CHANGED_ENTRY_STATUSES.ADDED : CHANGED_ENTRY_STATUSES.REMOVED,
    };
  });

export const mockChangedEntriesData: IServerDataResp<IScrollerResponseDto<BankAccountingChangedEntry>> = {
  data: {
    page: changedEntries,
    size: changedEntries.length,
  },
  // TODO: Для проверки ошибки сервера.
  // error: {
  //   code: '540',
  //   message: 'Error Closed Days',
  // },
};
