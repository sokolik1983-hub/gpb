import React from 'react';
import type { BankAccountingChangedEntry } from 'interfaces/admin/dto/bank-accounting-changed-entry';
import type { CellProps } from 'react-table';
import { CHANGED_ENTRIES_STATUS_LABEL, CHANGED_ENTRIES_STATUS_COLOR } from 'stream-constants/admin';
import { Horizon, Typography } from '@platform/ui';
import { Status as StatusMarker } from '@platform/ui/dist-types/status/status';

// TODO Заменить any после реализации DTO
/** Компонент с ячейкой для отображения информации о состоянии проводки. */
export const Status: React.FC<CellProps<BankAccountingChangedEntry, BankAccountingChangedEntry>> = ({ value: { status } }) => (
  <Horizon align="CENTER">
    <StatusMarker type={CHANGED_ENTRIES_STATUS_COLOR[status]} />
    <Typography.P data-field={'statementStatus'}>{CHANGED_ENTRIES_STATUS_LABEL[status]}</Typography.P>
  </Horizon>
);

Status.displayName = 'Status';
