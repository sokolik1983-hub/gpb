import { locale } from 'localization';
import { useHistory } from 'react-router-dom';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import type { ICategoryTabsProps } from '@platform/ui';

/**
 * Возвращает свойства вкладок навигации (сделаны через вкладки категорий) для скроллеров:
 * "Обороты (ОСВ)", "История запросов", "Шаблоны запросов".
 */
export const useTurnoverScrollerTabNavigationProps = (): ICategoryTabsProps => {
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
      { label: locale.scroller.navTabs.labels.turnover, value: COMMON_STREAM_URL.STATEMENT_TURNOVER },
      { label: locale.scroller.navTabs.labels.history, value: COMMON_STREAM_URL.STATEMENT_HISTORY },
    ],
    onCategoryChange,
    showCounts: false,
    extraSmall: true,
  };
};
