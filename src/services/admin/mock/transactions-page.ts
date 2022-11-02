import type { ScrollerResponseDto } from 'interfaces';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { RUB_CURRENCY } from 'stream-constants';
import type { IServerDataResp } from '@platform/services/admin';

const transactionsList: BankAccountingEntryCard[] = Array<BankAccountingEntryCard>(9)
  .fill(
    {
      account: {
        id: '0a40198d-14f0-4d83-bc2b-5c1db766f60d',
        bankClient: {
          // eslint-disable-next-line @eco/no-missing-localization
          name: 'ООО «Банк Софт Системс Кредит»',
          inn: '044525593',
        },
        currency: {
          letterCode: RUB_CURRENCY,
        },
        number: '40702810100210201421',
      },
      amountCredit: 2000,
      amountDebit: 0,
      counterpartyAccountNumber: '40702810100210201421',
      // eslint-disable-next-line @eco/no-missing-localization
      counterpartyName: 'ООО «Банк Софт Системс Контрагент»',
      debitSign: false,
      documentDate: '2022-18-06',
      documentNumber: 40_702_810_100,
      entryDate: '2022-19-06',
      id: '465f91be-1814-4e89-9a59-2394f11636d2',
      incomingBalance: 30_000,
      outgoingBalance: 40_000,
      paymentPurpose: 'CreditPurpose',
      turnoverCredit: 2000,
      turnoverDebit: 0,
    },
    0,
    4
  )
  .fill(
    {
      account: {
        id: '0a40198d-14f0-4d83-bc2b-5c1db766f60d',
        bankClient: {
          // eslint-disable-next-line @eco/no-missing-localization
          name: 'ООО «Банк Софт Системс Дебит»',
          inn: '044525593',
        },
        currency: {
          letterCode: RUB_CURRENCY,
        },
        number: '40702810100210201421',
      },
      amountCredit: 0,
      amountDebit: 2000,
      counterpartyAccountNumber: '40702810100210201421',
      // eslint-disable-next-line @eco/no-missing-localization
      counterpartyName: 'ООО «Банк Софт Системс Контрагент»',
      debitSign: true,
      documentDate: '2021-18-06',
      documentNumber: 40_702_810_100,
      entryDate: '2021-18-06',
      id: '465f91be-1814-4e89-9a59-2394f11636d2',
      incomingBalance: 30_000,
      outgoingBalance: 40_000,
      paymentPurpose: 'DebitPurpose',
      turnoverCredit: 0,
      turnoverDebit: 2000,
    },
    5
  );

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
