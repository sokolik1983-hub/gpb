import type { FC } from 'react';
import React from 'react';
import type { MaintenanceCellProps } from 'pages/scroller/admin/maintenance/table/cells/types';
import { MAINTENANCE_STATUS_COLOR, MAINTENANCE_STATUS_LABEL } from 'stream-constants/admin';
import { Horizon, Typography, Status as StatusMarker } from '@platform/ui';

/** Ячейка таблицы со статусом технических работ. */
export const Status: FC<MaintenanceCellProps> = ({ value: { maintenanceType } }) => (
  <Horizon>
    <StatusMarker type={MAINTENANCE_STATUS_COLOR[maintenanceType]} />
    <Typography.P>{MAINTENANCE_STATUS_LABEL[maintenanceType]}</Typography.P>
  </Horizon>
);

Status.displayName = 'Status';
