import type { FC } from 'react';
import React from 'react';
import { ItemWithRestInPopUp } from 'components/common';
import type { StatementHistoryCellProps } from 'pages/scroller/admin/statements/components/table/cells/types';
import { Typography } from '@platform/ui';

/** Ячейка таблицы с информацией по счетам. */
export const AccountNumbers: FC<StatementHistoryCellProps> = ({ value: { accountNumbers } }) => (
  <ItemWithRestInPopUp component={Typography.P} items={accountNumbers} />
);

AccountNumbers.displayName = 'AccountNumbers';
