import type { FORMAT } from 'interfaces';
import type { StatementHistoryRow } from 'interfaces/admin';
import { fatalHandler } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import { downloadFile } from './download-file';
import type { context } from './executor';
import { executor } from './executor';

/**
 * Функция формирования ПФ "Список запросов.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69875084
 * */
export const exportStatementHistory: IActionConfig<typeof context, unknown> = {
  action: ({ done, fatal }, { showLoader, hideLoader, service }) => async (
    statements: StatementHistoryRow[],
    fileFormat: FORMAT.EXCEL | FORMAT.PDF,
    dateFrom: Date,
    dateTo: Date
  ) => {
    showLoader();

    const statementIds = statements.map(statement => statement.statementId);

    const [res, err] = await to(service.generateReport({ statementIds, dateFrom, dateTo, format: fileFormat }));

    hideLoader();

    fatal(err);

    if (res?.content && ((res?.content as unknown) as ArrayBuffer).byteLength === 0) {
      done();

      return;
    }

    await executor.execute(downloadFile, res);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
