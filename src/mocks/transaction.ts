/* eslint-disable @eco/no-missing-localization */
import type { ITransaction } from 'interfaces/client';
import { TRANSACTION_ATTACHMENT_TYPES } from 'interfaces/client';

// TODO: Заглушка. Удалить
export const transaction: ITransaction = {
  id: '29ed910e-dfc2-4091-9cff-7cbf3528aa7a',
  isDebit: false,
  number: '123',
  date: '2021-16-12',
  documentName: 'Платежное поручение',
  amount: 100_000,
  currencyCode: 'RUB',
  payerInn: '1877448597',
  payerOrgName: 'ООО «Банк Софт Системс»',
  payerAccountNumber: '60123275300798099183',
  payerBankBic: '044525225',
  payerBankCorrAccount: '40702810872657576918',
  payerBankName: 'АО “ГАЗПРОМБАНК”',
  receiverInn: '1877448597',
  receiverOrgName: 'ООО «Банк Софт Системс»',
  receiverAccountNumber: '60123275300798099183',
  receiverBankBic: '044525225',
  receiverBankCorrAccount: '40702810872657576918',
  receiverBankName: 'АО “ГАЗПРОМБАНК”',
  paymentPurpose:
    'по дог. 20/ЕП-2017 от 07.07.17 и тов. накл. 21 от 19.09.17 увеличение стоимости материальных запасов (расходные материалы для оргтехники) , в т.ч. НДС = 2885,8',
  attachments: [
    { size: '1,5 Мб', name: 'Платежное поручение', documentType: TRANSACTION_ATTACHMENT_TYPES.DOCUMENT_BASE },
    { size: '1,1 Мб', name: 'Мемориальный ордер', documentType: TRANSACTION_ATTACHMENT_TYPES.STATEMENT },
  ],
};
