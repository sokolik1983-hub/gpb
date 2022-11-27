import type { FC } from 'react';
import React from 'react';
import { ACTION } from 'interfaces';
import { locale } from 'localization';
import type { StatementHistoryCellProps } from 'pages/scroller/admin/statements/components/table/cells/types';
import { STATEMENT_FORMAT_LABELS } from 'stream-constants';
import { Typography } from '@platform/ui';

/** Ячейка таблицы с форматом запроса выписки. */
export const Format: FC<StatementHistoryCellProps> = ({ value: { format, action } }) =>
  action === ACTION.VIEW ? (
    <Typography.P>{locale.historyScroller.statementFormat.labels.onScreen}</Typography.P>
  ) : (
    <Typography.P data-field={'statementFormat'}>{STATEMENT_FORMAT_LABELS[format]}</Typography.P>
  );

Format.displayName = 'Format';
