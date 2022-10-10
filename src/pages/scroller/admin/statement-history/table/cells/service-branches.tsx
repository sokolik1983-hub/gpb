import type { FC } from 'react';
import React from 'react';
import { ItemWithRestInPopUp } from 'components/common';
import { Typography } from '@platform/ui';
import type { StatementHistoryCellProps } from './types';

/** Ячейка таблицы с филиалами обслуживания. */
export const ServiceBranches: FC<StatementHistoryCellProps> = ({ value: { serviceBranches } }) => (
  <ItemWithRestInPopUp component={Typography.P} items={serviceBranches} />
);

ServiceBranches.displayName = 'ServiceBranches';
