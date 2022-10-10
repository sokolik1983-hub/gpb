import type { FC } from 'react';
import React from 'react';
import { ItemWithRestInPopUp } from 'components/common';
import { Typography } from '@platform/ui';
import type { StatementHistoryCellProps } from './types';

/** Ячейка таблицы с информацией по счетам. */
export const AccountNumbers: FC<StatementHistoryCellProps> = ({ value: { accountNumbers } }) => (
  <ItemWithRestInPopUp component={Typography.P} items={accountNumbers} />
);

AccountNumbers.displayName = 'AccountNumbers';
