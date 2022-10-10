import type { IExtendedIActionWithAuth } from 'interfaces';
import type { StatementHistoryRow } from 'interfaces/admin';

/** Свойства полей скроллера Истории запросов выписок. */
export interface TableValues extends StatementHistoryRow {
  /** Экшены. */
  ACTIONS: IExtendedIActionWithAuth[];
}
