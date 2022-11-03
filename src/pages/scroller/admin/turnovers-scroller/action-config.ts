import { exportTurnovers } from 'actions/admin/export-turnovers';
import type { IExtendedIActionWithAuth } from 'interfaces';
import { DATA_ACTION } from 'interfaces/data-action';
import { locale } from 'localization';
import { Icons } from '@platform/ui';

/** Экшон экспорта ПФ журнала остатков и оборотов. */
const EXPORT_TURNOVERS: IExtendedIActionWithAuth = {
  action: exportTurnovers,
  authorities: [],
  dataAction: DATA_ACTION.EXPORT,
  icon: Icons.Export,
  label: locale.admin.turnoverScroller.actions.exportTurnovers,
  name: 'EXPORT_TURNOVERS',
};

/** Экшоны для хэдера скроллера. */
export const HEADER_ACTIONS = [EXPORT_TURNOVERS];

/** Экшоны для строки скроллера. */
export const ROW_ACTIONS = [EXPORT_TURNOVERS];

/** Экшоны для футера скроллера. */
export const FOOTER_ACTIONS = [EXPORT_TURNOVERS];
