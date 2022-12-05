import { useMemo } from 'react';
import { executor } from 'actions/client/executor';
import { locale } from 'localization';
import { HEADER_ACTIONS } from 'pages/scroller/client/statement-turnover/action-configs';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { getActiveActionButtons } from 'utils/common';
import { useRedirect } from '@platform/services';
import { useAuth } from '@platform/services/client';
import type { IButtonAction } from '@platform/ui';

/**
 * Интерфейс шапки страницы скроллера "Заявки на выписку по расписанию".
 */
export interface IScrollerHeader {
  /**
   * Экшены для шапки страницы скроллера "Заявки на выписку по расписанию".
   */
  actions?: IButtonAction[];
  /**
   * Ссылка "Назад" для шапки страницы скроллера "Заявки на выписку по расписанию".
   */
  onHomeClick(): void;
  /**
   * Заголовок.
   */
  header: string;
}

/**
 * Возвращает свойства заголовка скроллеров:
 * "Заявки на выписку по расписанию".
 */
export const useScheduleScrollerHeaderProps = (): IScrollerHeader => {
  const redirectToMainPage = useRedirect(COMMON_STREAM_URL.MAINPAGE);

  const { getAvailableActions } = useAuth();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(HEADER_ACTIONS), executor, [[]]), [getAvailableActions]);

  return {
    onHomeClick: redirectToMainPage,
    header: locale.client.pages.historyTitle,
    actions,
  };
};
