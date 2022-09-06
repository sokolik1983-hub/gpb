import { getExportStatementAttachment, repeatStatement } from 'actions/client';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { locale } from 'localization';
import { PRIVILEGE } from 'stream-constants/client';
import type { IActionWithAuth } from '@platform/services';
import { Icons, ServiceIcons } from '@platform/ui';

/** Функция экспорта файла выписки или документа. */
const EXPORT_STATEMENT: IActionWithAuth = {
  icon: Icons.Download,
  label: locale.historyScroller.action.exportStatement,
  action: getExportStatementAttachment(EXPORT_PARAMS_USE_CASES.FOURTEEN),
  name: 'EXPORT_STATEMENT',
  authorities: [PRIVILEGE.ATTACHMENT_DOWNLOAD],
};

/** Повторный запрос выписки. */
const REPEAT_STATEMENT: IActionWithAuth & { dataAction: string } = {
  dataAction: '',
  icon: ServiceIcons.Refresh,
  label: locale.historyScroller.action.repeatStatement,
  action: repeatStatement,
  name: 'REPEAT_STATEMENT',
  authorities: [PRIVILEGE.STATEMENT_REQUEST],
};

/** Действия строки скроллера. */
export const ROW_ACTIONS: IActionWithAuth[] = [EXPORT_STATEMENT, REPEAT_STATEMENT];
