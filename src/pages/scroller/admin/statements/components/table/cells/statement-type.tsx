import type { FC } from 'react';
import React from 'react';
import type { StatementHistoryCellProps } from 'pages/scroller/admin/statements/components/table/cells/types';
import { STATEMENT_TYPE_LABEL } from 'stream-constants/admin';
import { Typography } from '@platform/ui';

/** Ячейка таблицы с типом выписки. */
export const StatementType: FC<StatementHistoryCellProps> = ({ value: { statementType } }) => (
  <Typography.P data-field={'statementType'}>{STATEMENT_TYPE_LABEL[statementType]}</Typography.P>
);

StatementType.displayName = 'StatementType';
