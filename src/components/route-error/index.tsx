import React from 'react';
import { locale } from 'localization';
import { MainLayout } from '@platform/services/client';
import { Adjust, Gap, Horizon, Pattern, Typography, SpecialIcons } from '@platform/ui';

/** Упрощенный вариант платформенной функции RouteError. */
export const RouteError: React.FC = () => (
  <MainLayout>
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
  </MainLayout>
);

RouteError.displayName = 'RouteError';
