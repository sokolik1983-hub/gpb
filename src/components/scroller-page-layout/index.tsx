import React from 'react';
import cn from 'classnames';
import type { ICategoryTabsProps } from '@platform/ui';
import { Box, Separator, CategoryTabs, LoaderOverlay, DATA_TYPE } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента ScrollerPageLayout. */
interface IScrollerPageLayoutProps {
  /** Свойства для категорий. */
  categoryTabsProps?: ICategoryTabsProps;
  /** Навигация (хлебные крошки). */
  navigationLine?: React.ReactNode;
  /** Если true, то вместо страницы будет отображаться лоадер. */
  isLoading?: boolean;
}

/** Лэаут страницы скроллера. */
export const ScrollerPageLayout: React.FC<IScrollerPageLayoutProps> = ({
  navigationLine,
  categoryTabsProps,
  isLoading = false,
  children,
}) => (
  <Box className={cn(css.important, css.scrollerPageWrapper)}>
    {navigationLine}
    <Separator />
    {isLoading ? (
      <LoaderOverlay data-type={DATA_TYPE.LOADER_LOCAL} opened={isLoading} />
    ) : (
      <>
        {categoryTabsProps && (
          <>
            <Box className={css.categoryTabsWrapper}>
              <CategoryTabs {...categoryTabsProps} />
            </Box>
            <Separator />
          </>
        )}
        {children}
      </>
    )}
  </Box>
);

ScrollerPageLayout.displayName = 'ScrollerPageLayout';
