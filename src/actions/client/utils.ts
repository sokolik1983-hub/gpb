import { showOutdatedStatementDialog } from 'components/export-params-dialog/dialog';
import { STATEMENT_RELEVANCE_STATUS } from 'interfaces';
import type { OUTDATED_STATEMENT_MODE } from 'interfaces/client';
import { to } from '@platform/core';

/**
 * Проверяет статус выписки на актуальность, и открывает диалог, если неактуальна.
 *
 * @param status - Статус выписки.
 * @param mode - Режим для вызова диалога выписки.
 */
export const isContinueActionWithStatement = async (
  status: STATEMENT_RELEVANCE_STATUS,
  mode: OUTDATED_STATEMENT_MODE
): Promise<boolean> => {
  if (status === STATEMENT_RELEVANCE_STATUS.OUTDATED) {
    const [_, cancel] = await to(showOutdatedStatementDialog(mode));

    if (cancel) {
      return false;
    }
  }

  return true;
};
