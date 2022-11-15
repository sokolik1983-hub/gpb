import type { FC } from 'react';
import React from 'react';
import { ItemWithRestInPopUp } from 'components/common';
import type { StatementHistoryCellProps } from 'pages/scroller/admin/statements/components/table/cells/types';
import { Typography } from '@platform/ui';

/** Ячейка таблицы с филиалами обслуживания. */
export const ServiceBranches: FC<StatementHistoryCellProps> = ({ value: { serviceBranches } }) => (
  <ItemWithRestInPopUp component={Typography.P} items={serviceBranches} />
);

ServiceBranches.displayName = 'ServiceBranches';
