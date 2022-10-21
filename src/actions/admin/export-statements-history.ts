import { showExportStatementsHistoryDialog } from 'components/admin';
import type { FORMAT } from 'interfaces';
import type { StatementHistoryRow } from 'interfaces/admin';
import { fatalHandler } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import { showFile } from '@platform/services/admin';
import type { context } from './executor';

/**
 * Функция формирования ПФ "Список запросов".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69875084
 * */
export const exportStatementsHistory: IActionConfig<typeof context, unknown> = {
  action: ({ done, fatal }, { hideLoader, service, showLoader }) => async ({
    dateFrom,
    dateTo,
    statements,
  }: {
    dateFrom: string;
    dateTo: string;
    statements: StatementHistoryRow[];
  }) => {
    const [fileFormat, dialogClose] = await to(showExportStatementsHistoryDialog(statements.length));

    if (dialogClose) {
      done();

      return;
    }

    showLoader();

    const statementRequestIds = statements.map(statement => statement.statementId);

    const [file, generateError] = await to(
      service.generateStatementsReport({ dateFrom, dateTo, format: fileFormat as FORMAT.EXCEL | FORMAT.PDF, statementRequestIds })
    );

    if (generateError || !file || file.content.length === 0) {
      hideLoader();

      fatal('error');

      return;
    }

    hideLoader();

    showFile(file.content, file.fileName, file.mimeType);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
