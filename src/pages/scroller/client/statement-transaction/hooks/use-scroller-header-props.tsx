import { useMemo } from 'react';
import { executor } from 'actions/client';
import type { IScrollerHeaderProps } from 'components';
import type { IUrlParams } from 'interfaces';
import type { IStatementSummaryInfoResponseDto } from 'interfaces/client';
import { locale } from 'localization';
import { useParams } from 'react-router-dom';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { getActiveActionButtons } from 'utils';
import { useRedirect, DATE_FORMAT } from '@platform/services';
import { useAuth } from '@platform/services/client';
import { formatDateTime } from '@platform/tools/date-time';
import { HEADER_ACTIONS } from '../action-configs';

/** Возвращает свойства для заголовка скроллера.
 *
 * @param info - Информация о выписке, проводки которой отображаются в скроллере.
 */
export const useScrollerHeaderProps = (info?: IStatementSummaryInfoResponseDto): IScrollerHeaderProps => {
  const { id } = useParams<IUrlParams>();

  const redirectToMainPage = useRedirect(COMMON_STREAM_URL.MAINPAGE);
  const redirectToTurnovers = useRedirect(COMMON_STREAM_URL.STATEMENT_TURNOVER);

  const { getAvailableActions } = useAuth();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(HEADER_ACTIONS), executor, [[], id]), [getAvailableActions, id]);

  return {
    onHomeClick: redirectToMainPage,
    header: locale.transactionsScroller.title({
      dateFrom: formatDateTime(info?.dateFrom, { keepLocalTime: true, format: DATE_FORMAT }),
      dateTo: formatDateTime(info?.dateTo, { keepLocalTime: true, format: DATE_FORMAT }),
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
