import { locale } from 'localization';
import { useHistory } from 'react-router-dom';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import type { ICategoryTabsProps } from '@platform/ui';

/**
 * Возвращает свойства вкладок навигации (сделаны через вкладки категорий) для скроллеров:
 * "Обороты (ОСВ)", "История запросов", "Шаблоны запросов".
 */
export const useScrollerTabsProps = (): ICategoryTabsProps => {
  const {
    push,
    location: { pathname },
  } = useHistory();

  const onCategoryChange = (newPathname: string) => {
    // Если клик по текущей вкладке, то ничего не происходит
    if (newPathname === pathname) {
      return;
    }

    push(newPathname);
  };

  return {
    category: pathname,
    categories: [
      { label: locale.client.scheduleStatementPage.navTabs.scheduleStatementTitle, value: COMMON_STREAM_URL.STATEMENT_SCHEDULE },
      { label: locale.client.scheduleStatementPage.navTabs.history, value: COMMON_STREAM_URL.STATEMENT_SCHEDULE_REQUEST_HISTORY },
    ],
    onCategoryChange,
    showCounts: false,
    extraSmall: true,
  };
};
