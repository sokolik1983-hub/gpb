import React from 'react';
import { ContentLoader } from 'components/common/content-loader';
import type { ICategoryTabsProps, IScrollerHeader } from '@platform/ui';
import { Box, Separator, CategoryTabs, LoaderOverlay, DATA_TYPE, ScrollerHeader } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента ScrollerPageLayout. */
interface IScrollerPageLayoutProps {
  /** Свойства для категорий. */
  categoryTabs?: ICategoryTabsProps;
  /** Навигация (хлебные крошки). */
  headerProps: IScrollerHeader & { loading?: boolean };
  /** Признак присутствия уведомления в топлайне. */
  importantNotification?: boolean;
  /** Если true, то вместо страницы будет отображаться лоадер. */
  loading?: boolean;
}

/** Высота хедера лэаута страницы скроллера. */
export const SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT = 72;

/** Лэаут страницы скроллера. */
export const ScrollerPageLayout: React.FC<IScrollerPageLayoutProps> = ({
  categoryTabs,
  children,
  headerProps,
  importantNotification,
  loading,
}) => {
  const topLineHeight = importantNotification ? 120 : 64;

  return (
    <>
      {loading && <LoaderOverlay data-type={DATA_TYPE.LOADER_LOCAL} opened={loading} />}
      <Box className={css.scrollerLayoutContent} style={{ height: `calc(100vh - ${topLineHeight}px)` }}>
        <ContentLoader height={SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT} loading={loading}>
          <ScrollerHeader {...headerProps} />
        </ContentLoader>
        <Separator />
        {categoryTabs && (
          <>
            <Box className={css.categoryTabs}>
              <CategoryTabs {...categoryTabs} />
            </Box>
            <Separator />
          </>
        )}
        {children}
      </Box>
    </>
  );
};

ScrollerPageLayout.displayName = 'ScrollerPageLayout';
