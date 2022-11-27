import React from 'react';
import { ScrollerHeader } from 'components/admin/scroller-header';
import type { ScrollerHeaderProps } from 'components/admin/scroller-header';
import { ContentLoader } from 'components/common/content-loader';
import type { ICategoryTabsProps } from '@platform/ui';
import { Box, Separator, CategoryTabs, LoaderOverlay, DATA_TYPE } from '@platform/ui';
import css from './styles.scss';

/** Свойства лэаута страницы скроллера. */
export interface ScrollerPageLayoutProps {
  /** Свойства категорий. */
  categoryTabs?: ICategoryTabsProps;
  /** Свойства заголовка скроллера. */
  headerProps: ScrollerHeaderProps & { loading?: boolean };
  /** Признак загрузки скроллера. */
  loading?: boolean;
}

/** Высота хедера лэаута страницы скроллера. */
export const SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT = {
  BASE: 88,
  WITH_BACK_BUTTON: 96,
};

/** Лэаут страницы скроллера. */
export const ScrollerPageLayout: React.FC<ScrollerPageLayoutProps> = ({ categoryTabs, children, headerProps, loading }) => (
  <>
    {loading && <LoaderOverlay data-type={DATA_TYPE.LOADER_LOCAL} opened={loading} />}
    <Box className={css['scroller-page-layout']} style={{ height: `calc(100vh - 64px)` }}>
      <ContentLoader
        height={
          headerProps.backButtonTitle && headerProps.onBack
            ? SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT.WITH_BACK_BUTTON
            : SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT.BASE
        }
        loading={loading}
      >
        <ScrollerHeader {...headerProps} />
      </ContentLoader>
      {categoryTabs && (
        <>
          <Box>
            <CategoryTabs {...categoryTabs} />
          </Box>
          <Separator />
        </>
      )}
      {children}
    </Box>
  </>
);

ScrollerPageLayout.displayName = 'ScrollerPageLayout';
