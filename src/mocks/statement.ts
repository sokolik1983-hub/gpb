/* eslint-disable @eco/no-missing-localization */
import type { IStatement } from 'interfaces/client/statement';
import { dateTime } from '@platform/tools/date-time';

// TODO: Заглушка. Удалить при подключении реста.
export const statement: IStatement = {
  dateStart: dateTime().toISOString(),
  dateEnd: dateTime().toISOString(),
  accountNumber: '40702810500440170469',
  organizationName: 'ООО "Ромашка"',
  incomingBalance: 566_999,
  outcome: 1450,
  outcomeTransactions: 9,
  income: 535_000,
  incomeTransactions: 17,
  outgoingBalance: 10_566_999,
  currencyCode: 'RUB',
};
