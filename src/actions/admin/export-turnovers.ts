import { showExportByFormatDialog } from 'components/admin/export-by-format-dialog';
import type { ITurnoverMockDto } from 'interfaces/admin/dto/turnover-mock-dto';
import { fatalHandler } from 'utils/common';
import { to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import { showFile } from '@platform/services/admin';
import type { context } from './executor';

/**
 * Банк: Функция формирования ПФ "Журнал остатков/оборотов".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=77694063
 * */
export const exportTurnovers: IActionConfig<typeof context, unknown> = {
  action: ({ done, fatal }, { hideLoader, service, showLoader }) => async (docs: ITurnoverMockDto[], dateFrom: string, dateTo: string) => {
    const [format, cancel] = await to(showExportByFormatDialog());

    if (cancel) {
      done();

      return;
    }

    showLoader();

    const [file, error] = await to(
      service.generateTurnoversReport({
        dateFrom,
        dateTo,
        format: format!,
        statementIds: docs.map(x => x.id),
      })
    );

    if (error || !file || file.content.length === 0) {
      hideLoader();

      fatal('ERROR');

      return;
    }

    hideLoader();

    showFile(file.content, file.fileName, file.mimeType);

    done();
  },
  fatalHandler,
  guardians: [],
};
