import React from 'react';
import type { ClientTransfomedAction } from 'interfaces/client';
import type { IBreadcrumbsProps } from '@platform/ui';
import { Breadcrumbs, PrimaryButton, Horizon } from '@platform/ui';

/** Свойства компонента ScrollerHeader. */
export interface IScrollerHeaderProps extends IBreadcrumbsProps {
  /** Конфиги для кнопок действий. */
  actions: ClientTransfomedAction[];
}

/** Заголовок скроллера (хлебные крошки). */
export const ScrollerHeader: React.FC<IScrollerHeaderProps> = ({ actions, ...breadcrumbsProps }) => (
  <Breadcrumbs {...breadcrumbsProps}>
    <Horizon>
      {actions.map(({ label, onClick, name, disabled }) => (
        <PrimaryButton key={name} extraSmall dimension="SM" disabled={disabled} onClick={onClick}>
          {label}
        </PrimaryButton>
      ))}
    </Horizon>
  </Breadcrumbs>
);

ScrollerHeader.displayName = 'ScrollerHeader';
