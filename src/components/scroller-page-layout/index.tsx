import React from 'react';
import { ContentLoader } from 'components/content-loader';
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

/** Лэаут страницы скроллера. */
export const ScrollerPageLayout: React.FC<IScrollerPageLayoutProps> = ({ categoryTabs, children, headerProps, loading }) => (
  <>
    {loading && <LoaderOverlay data-type={DATA_TYPE.LOADER_LOCAL} opened={loading} />}
    <Box className={css.scrollerLayoutContent}>
      <ContentLoader height={72} loading={headerProps.loading}>
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

ScrollerPageLayout.displayName = 'ScrollerPageLayout';
