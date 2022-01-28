import { useMemo } from 'react';
import { executor } from 'actions/client/executor';
import type { IScrollerHeaderProps } from 'components';
import { locale } from 'localization';
import { HEADER_ACTIONS } from 'pages/scroller/client/statement-turnover/action-configs';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { getActiveActionButtons } from 'utils';
import { useRedirect } from '@platform/services';
import { useAuth } from '@platform/services/client';

/**
 * Возвращает свойства заголовка скроллеров:
 * "Обороты (ОСВ)", "История запросов", "Шаблоны запросов".
 */
export const useTurnoverScrollerHeaderProps = (): IScrollerHeaderProps => {
  const redirectToMainPage = useRedirect(COMMON_STREAM_URL.MAINPAGE);

  const { getAvailableActions } = useAuth();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(HEADER_ACTIONS), executor, [[]]), [getAvailableActions]);

  return {
    onHomeClick: redirectToMainPage,
    header: locale.client.scroller.title,
    actions,
  };
};
