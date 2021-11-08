import { useMemo } from 'react';
import { clientActionExecutor } from 'actions/client';
import type { IScrollerHeaderProps } from 'components';
import { locale } from 'localization';
import { HEADER_ACTIONS } from 'pages/scroller/client/statement-turnover/action-configs';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { getActionButtons } from '@platform/core';
import { useRedirect } from '@platform/services';
import { useAuth } from '@platform/services/client';

/**
 * Возвращает свойства заголовка скроллеров:
 * "Обороты (ОСВ)", "История запросов", "Шаблоны запросов".
 */
export const useTurnoverScrollerHeaderProps = (selectedAccounts: string[]): IScrollerHeaderProps => {
  const redirectToMainPage = useRedirect(COMMON_STREAM_URL.MAINPAGE);

  const { getAvailableActions } = useAuth();

  const actions = useMemo(() => getActionButtons(getAvailableActions(HEADER_ACTIONS), clientActionExecutor, [{ selectedAccounts }]), [
    getAvailableActions,
    selectedAccounts,
  ]);

  return {
    onHomeClick: redirectToMainPage,
    header: locale.client.scroller.title,
    actions,
  };
};
