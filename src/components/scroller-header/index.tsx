import React from 'react';
import type { ExtendedTransfomedAction } from 'interfaces';
import type { IBreadcrumbsProps } from '@platform/ui';
import { Box, Gap, Breadcrumbs, PrimaryButton, Horizon } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента ScrollerHeader. */
export interface IScrollerHeaderProps extends IBreadcrumbsProps {
  /** Конфиги для кнопок действий. */
  actions: ExtendedTransfomedAction[];
}

/** Заголовок скроллера (хлебные крошки). */
export const ScrollerHeader: React.FC<IScrollerHeaderProps> = ({ actions, ...breadcrumbsProps }) => (
  <Box className={css.wrapper}>
    <Breadcrumbs {...breadcrumbsProps}>
      <Horizon>
        {actions.map(({ label, onClick, name, disabled, buttonType }) => {
          const Button = buttonType ?? PrimaryButton;

          return (
            <React.Fragment key={name}>
              <Gap />
              <Button extraSmall dimension="SM" disabled={disabled} onClick={onClick}>
                {label}
              </Button>
            </React.Fragment>
          );
        })}
      </Horizon>
    </Breadcrumbs>
  </Box>
);

ScrollerHeader.displayName = 'ScrollerHeader';
