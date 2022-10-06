import type { FC } from 'react';
import React, { useMemo } from 'react';
import { ItemWithRestInPopUp } from 'components/common';
import { formatAccountCode } from '@platform/tools/localization';
import { Typography } from '@platform/ui';
import type { StatementHistoryCellProps } from './types';

/** Ячейка таблицы с информацией по счетам. */
export const AccountNumbers: FC<StatementHistoryCellProps> = ({ value: { accountNumbers } }) => {
  const formattedAccounts = useMemo(() => accountNumbers.map(item => formatAccountCode(item)), [accountNumbers]);

  return <ItemWithRestInPopUp component={Typography.P} items={formattedAccounts} />;
};

AccountNumbers.displayName = 'AccountNumbers';
