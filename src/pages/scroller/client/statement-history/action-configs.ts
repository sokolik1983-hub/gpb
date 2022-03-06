import { getExportStatementAttachment, repeatStatement } from 'actions/client';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { locale } from 'localization';
import type { IActionWithAuth } from '@platform/services';
import { Icons, ServiceIcons } from '@platform/ui';

/** Функция экспорта файла выписки или документа. */
const EXPORT_STATEMENT: IActionWithAuth = {
  icon: Icons.Download,
  label: locale.historyScroller.action.exportStatement,
  action: getExportStatementAttachment(EXPORT_PARAMS_USE_CASES.FOURTEEN),
  name: 'EXPORT_STATEMENT',
  authorities: [
    /* TODO: добавить когда будет готова ролевая. */
  ],
};

/** Повторный запрос выписки. */
const REPEAT_STATEMENT: IActionWithAuth = {
  icon: ServiceIcons.Refresh,
  label: locale.historyScroller.action.repeatStatement,
  action: repeatStatement,
  name: 'REPEAT_STATEMENT',
  authorities: [
    /* TODO: добавить когда будет готова ролевая. */
  ],
};

/** Действия строки скроллера. */
export const ROW_ACTIONS = [EXPORT_STATEMENT, REPEAT_STATEMENT];
