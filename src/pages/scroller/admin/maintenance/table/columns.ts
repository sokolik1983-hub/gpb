import type { MaintenanceRow } from 'interfaces/admin';
import { locale } from 'localization';
import { CreationDate, Status } from 'pages/scroller/admin/maintenance/table/cells';
import { COLUMN_NAMES } from 'pages/scroller/admin/maintenance/table/constants';
import { accessor, addMaxWidthField } from 'utils/common';

/** Конфигурация колонок таблицы журнала технических работ. */
export const columns = addMaxWidthField<MaintenanceRow, { isVisible: boolean }>([
  {
    Cell: CreationDate,
    Header: locale.admin.maintenanceScroller.table.header.creationDate,
    accessor,
    id: COLUMN_NAMES.CREATION_DATE,
    isVisible: true,
    maxWidth: 258,
    minWidth: 138,
    width: 188,
  },
  {
    Cell: Status,
    Header: locale.admin.maintenanceScroller.table.header.maintenanceType,
    accessor,
    id: COLUMN_NAMES.MAINTENANCE_TYPE,
    isVisible: true,
    maxWidth: 430,
    minWidth: 280,
    width: 380,
  },
]);
