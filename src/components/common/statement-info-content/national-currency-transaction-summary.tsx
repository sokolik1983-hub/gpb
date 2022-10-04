import type { FC } from 'react';
import React from 'react';
import { locale } from 'localization';
import { RUB_CURRENCY } from 'stream-constants';
import { Typography } from '@platform/ui';
import css from './styles.scss';

/** Информация о сумме транзакций в национальном эквиваленте. */
export const NationalCurrencyTransactionSummary: FC<{ amount: number; type: keyof typeof locale.moneyString }> = ({ amount, type }) => {
  const fill = { positive: 'SUCCESS', negative: 'CRITIC', unsigned: 'BASE' } as const;

  return (
    <Typography.Text align="RIGHT" className={css[type]} fill={fill[type]}>
      {locale.moneyString[type]({ amount: String(amount), currencyCode: RUB_CURRENCY })}
    </Typography.Text>
  );
};

NationalCurrencyTransactionSummary.displayName = 'NationalCurrencyTransactionSummary';
