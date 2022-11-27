import type { FC } from 'react';
import React from 'react';
import type { ClosedDayCellProps } from 'pages/scroller/admin/closed-days/table/cells/types';
import { Typography } from '@platform/ui';

/** Ячейка таблицы с операционной датой. */
export const OperationDate: FC<ClosedDayCellProps> = ({ value: { operationDate } }) => <Typography.P>{operationDate}</Typography.P>;

OperationDate.displayName = 'OperationDate';
