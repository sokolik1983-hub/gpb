import React from 'react';
import type { BankAccountingEntryTurnoverCard } from 'interfaces/admin/dto/bank-accounting-entry-turnover-card';
import type { CellProps } from 'react-table';
import { CHANGED_ENTRIES_STATUS_COLOR, CHANGED_ENTRIES_STATUS_LABEL } from 'stream-constants/admin';
import { Horizon, Typography } from '@platform/ui';
import { Status as StatusMarker } from '@platform/ui/dist-types/status/status';

// TODO Заменить any после реализации DTO
/** Компонент с ячейкой для отображения информации о состоянии проводки. */
export const Status: React.FC<CellProps<BankAccountingEntryTurnoverCard, BankAccountingEntryTurnoverCard>> = ({ value: { deleted } }) => (
  <Horizon align="CENTER">
    <StatusMarker type={CHANGED_ENTRIES_STATUS_COLOR[deleted]} />
    <Typography.P data-field={'statementStatus'}>{CHANGED_ENTRIES_STATUS_LABEL[deleted]}</Typography.P>
  </Horizon>
);

Status.displayName = 'Status';
