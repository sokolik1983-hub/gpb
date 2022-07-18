import React from 'react';
import { ContentLoader } from 'components/content-loader';
import { FocusNode } from 'components/focus-tree';
import { COMMON_SCROLLER_BREADCRUMBS_NODE, COMMON_SCROLLER_TABS_NODE, COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import type { ICategoryTabsProps, IScrollerHeader } from '@platform/ui';
import { Box, Separator, CategoryTabs, LoaderOverlay, DATA_TYPE, ScrollerHeader } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента ScrollerPageLayout. */
interface IScrollerPageLayoutProps {
  /** Навигация (хлебные крошки). */
  headerProps: IScrollerHeader & { loading?: boolean };
  /** Свойства для категорий. */
  categoryTabs?: ICategoryTabsProps;
  /** Если true, то вместо страницы будет отображаться лоадер. */
  loading?: boolean;
}

/** Высота хедера лэаута страницы скроллера. */
export const SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT = 72;

/** Лэаут страницы скроллера. */
export const ScrollerPageLayout: React.FC<IScrollerPageLayoutProps> = ({ categoryTabs, children, headerProps, loading }) => (
  <>
    {loading && <LoaderOverlay data-type={DATA_TYPE.LOADER_LOCAL} opened={loading} />}
    <Box className={css.scrollerLayoutContent}>
      <ContentLoader height={SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT} loading={headerProps.loading}>
        <FocusNode nodeId={COMMON_SCROLLER_BREADCRUMBS_NODE} parentId={COMMON_SCROLLER_NODE}>
          <ScrollerHeader {...headerProps} />
        </FocusNode>
      </ContentLoader>
      <Separator />
      {categoryTabs && (
        <FocusNode nodeId={COMMON_SCROLLER_TABS_NODE} parentId={COMMON_SCROLLER_NODE}>
          <Box className={css.categoryTabs}>
            <CategoryTabs {...categoryTabs} />
          </Box>
          <Separator />
        </FocusNode>
      )}
      {children}
    </Box>
  </>
);

ScrollerPageLayout.displayName = 'ScrollerPageLayout';
