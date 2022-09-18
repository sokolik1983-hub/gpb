import { getExportStatementAttachment, repeatStatement } from 'actions/client';
import type { IExtendedIActionWithAuth } from 'interfaces';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { DATA_ACTION } from 'interfaces/data-action';
import { locale } from 'localization';
import { PRIVILEGE } from 'stream-constants/client';
import { Icons, ServiceIcons } from '@platform/ui';

/** Функция экспорта файла выписки или документа. */
const EXPORT_STATEMENT: IExtendedIActionWithAuth = {
  dataAction: DATA_ACTION.EXPORT,
  icon: Icons.Download,
  label: locale.historyScroller.action.exportStatement,
  action: getExportStatementAttachment(EXPORT_PARAMS_USE_CASES.FOURTEEN),
  name: 'EXPORT_STATEMENT',
  authorities: [PRIVILEGE.ATTACHMENT_DOWNLOAD],
};

/** Повторный запрос выписки. */
const REPEAT_STATEMENT: IExtendedIActionWithAuth = {
  dataAction: DATA_ACTION.REPEAT_REQUEST,
  icon: ServiceIcons.Refresh,
  label: locale.historyScroller.action.repeatStatement,
  action: repeatStatement,
  name: 'REPEAT_STATEMENT',
  authorities: [PRIVILEGE.STATEMENT_REQUEST],
};

/** Действия строки скроллера. */
export const ROW_ACTIONS: IExtendedIActionWithAuth[] = [EXPORT_STATEMENT, REPEAT_STATEMENT];
