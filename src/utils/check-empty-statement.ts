import type { ILatestStatementDto } from 'interfaces/dto';
import { locale } from 'localization';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { dialog } from '@platform/ui';

/** Функция для проверки является ли выписка пустой при формировании с включенным флагом "Скрыть нулевые обороты". */
export const checkEmptyStatement = (doc: ILatestStatementDto, content?: ArrayBuffer | string, isExport = false) => {
  const { periodStart, periodEnd, hideEmptyTurnovers } = doc;

  const dateFrom = formatDateTime(periodStart, { keepLocalTime: true, format: DATE_FORMAT });
  const dateTo = formatDateTime(periodEnd, { keepLocalTime: true, format: DATE_FORMAT });

  const isEmptyContent = isExport ? (content as ArrayBuffer).byteLength === 0 : !content;

  if (isEmptyContent && hideEmptyTurnovers) {
    dialog.showAlert(locale.form.notFoundStatement.warning({ dateFrom, dateTo }));

    return true;
  }

  return false;
};
