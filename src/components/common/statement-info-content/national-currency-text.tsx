import type { FC } from 'react';
import React from 'react';
import { locale } from 'localization';
import { Typography } from '@platform/ui';
import css from './styles.scss';

/** Текст указывающий на признак национального эквивалента. */
export const NationalCurrencyText: FC = () => (
  <Typography.Text align="RIGHT" className={css.natCurrencyText}>
    {locale.transactionsScroller.labels.nationalCurrency}
  </Typography.Text>
);

NationalCurrencyText.displayName = 'NationalCurrencyText';
