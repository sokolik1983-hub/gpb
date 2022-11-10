import type { FC } from 'react';
import React from 'react';
import { Typography } from '@platform/ui';

/** Ячейка таблицы справочника курсов валют. */
export const Cell: FC<{ value: number | string }> = ({ value }) => <Typography.P>{value}</Typography.P>;

Cell.displayName = 'Cell';
