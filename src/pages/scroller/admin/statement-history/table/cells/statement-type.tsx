import type { FC } from 'react';
import React from 'react';
import { STATEMENT_TYPE_LABEL } from 'stream-constants/admin';
import { Typography } from '@platform/ui';
import type { StatementHistoryCellProps } from './types';

/** Ячейка таблицы с типом выписки. */
export const StatementType: FC<StatementHistoryCellProps> = ({ value: { statementType } }) => (
  <Typography.P data-field={'statementType'}>{STATEMENT_TYPE_LABEL[statementType]}</Typography.P>
);

StatementType.displayName = 'StatementType';
