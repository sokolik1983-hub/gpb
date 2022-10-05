import type { FC } from 'react';
import React from 'react';
import { locale } from 'localization';
import { RUB_CURRENCY } from 'stream-constants';
import { Typography } from '@platform/ui';
import css from './styles.scss';

export enum SUMMARY_TYPE {
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
  UNSIGNED = 'unsigned',
}

const SUMMARY_COLORS: Record<SUMMARY_TYPE, 'ACCENT' | 'BASE' | 'CRITIC' | 'FAINT' | 'SUCCESS' | 'WARNING' | undefined> = {
  [SUMMARY_TYPE.POSITIVE]: 'SUCCESS',
  [SUMMARY_TYPE.NEGATIVE]: 'CRITIC',
  [SUMMARY_TYPE.UNSIGNED]: 'BASE',
};

const SUMMARY_LABELS: Record<SUMMARY_TYPE, (amount: string, currencyCode: string) => string> = {
  [SUMMARY_TYPE.POSITIVE]: (amount, currencyCode) => locale.moneyString.positive({ amount, currencyCode }),
  [SUMMARY_TYPE.NEGATIVE]: (amount, currencyCode) => locale.moneyString.negative({ amount, currencyCode }),
  [SUMMARY_TYPE.UNSIGNED]: (amount, currencyCode) => locale.moneyString.unsigned({ amount, currencyCode }),
};

/** Информация о сумме транзакций в национальном эквиваленте. */
export const NationalCurrencyTransactionSummary: FC<{ amount: number; type: SUMMARY_TYPE }> = ({ amount, type }) => (
  <Typography.Text align="RIGHT" className={css[type]} fill={SUMMARY_COLORS[type]}>
    {SUMMARY_LABELS[type](String(amount), RUB_CURRENCY)}
  </Typography.Text>
);

NationalCurrencyTransactionSummary.displayName = 'NationalCurrencyTransactionSummary';
