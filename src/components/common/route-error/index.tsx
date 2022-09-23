import React from 'react';
import { locale } from 'localization';
import { MainLayout } from '@platform/services/client';
import { Adjust, Gap, Horizon, Pattern, Typography, SpecialIcons } from '@platform/ui';

/**
 * Компонент "Уведомление об недостаточности прав".
 */
export const ForbiddenContent: React.FC = () => (
  <Adjust pad={'X3L'}>
    <Pattern>
      <Pattern.Span size={6}>
        <Horizon align="TOP">
          <SpecialIcons.Warning />
          <Gap />
          <Typography.PLong>{locale.common.checkAuthority.error}</Typography.PLong>
        </Horizon>
        <Gap.XL />
      </Pattern.Span>
    </Pattern>
  </Adjust>
);

/** Упрощенный вариант платформенной функции RouteError. */
export const RouteError: React.FC = () => (
  <MainLayout>
    <ForbiddenContent />
  </MainLayout>
);

RouteError.displayName = 'RouteError';
