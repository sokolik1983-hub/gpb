/* eslint-disable @eco/no-missing-localization */
import type { IStatementTransactionRow } from 'interfaces/client';
import { dateTime } from '@platform/tools/date-time';

// TODO: Заглушка. Удалить при подключении реста.
export const transactions: IStatementTransactionRow[] = new Array(26).fill('').map((_, index) => {
  const rnd = Math.random();

  return {
    operationDate: dateTime().toISOString(),
    documentNumber: String(index),
    documentDate: dateTime().toISOString(),
    counterpartyName: 'ООО "Биотек"',
    counterpartyAccountNumber: '40702810500440170469',
    outcome: rnd >= 0.5 ? 1000 : undefined,
    income: rnd >= 0.5 ? undefined : 1000,
    purpose: 'Комиссия за прием и исполнение электронных платежей, и lorem ipsum',
    currencyCode: 'RUB',
  };
});
