import { useMemo } from 'react';
import { executor } from 'actions/client';
import type { IScrollerHeaderProps } from 'components';
import { locale } from 'localization';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { getActionButtons } from '@platform/core';
import { useRedirect, DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { HEADER_ACTIONS } from '../action-configs';
/** Возвращает свойства для заголовка скроллера.
 *
 * @param statement - Выписка проводки которой отображаются в скроллере.
 * @param statement.dateFrom - Дата начала периода запроса выписки.
 * @param statement.dateTo - Дата окончания периода запроса выписки.
 */
export const useScrollerHeaderProps = (statement: { dateFrom: string; dateTo: string }): IScrollerHeaderProps => {
  const { dateFrom, dateTo } = statement;

  const redirectToMainPage = useRedirect(COMMON_STREAM_URL.MAINPAGE);
  const redirectToTurnovers = useRedirect(COMMON_STREAM_URL.STATEMENT_TURNOVER);

  const actions = useMemo(() => getActionButtons(HEADER_ACTIONS, executor, [{}]), []);

  return {
    onHomeClick: redirectToMainPage,
    header: locale.transactionsScroller.title({
      dateFrom: formatDateTime(dateFrom, { keepLocalTime: true, format: DATE_FORMAT }),
      dateTo: formatDateTime(dateTo, { keepLocalTime: true, format: DATE_FORMAT }),
    }),
    actions,
    items: [
      {
        onClick: redirectToTurnovers,
        label: locale.client.scroller.title,
      },
    ],
  };
};
