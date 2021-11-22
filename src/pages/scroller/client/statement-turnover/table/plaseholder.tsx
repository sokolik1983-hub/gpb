import type { FC } from 'react';
import React from 'react';
import { TurnoverScrollerPlaceholderIcon } from 'components/icons';
import { locale } from 'localization';
import { Adjust, Gap, Typography } from '@platform/ui';

/** Плейсхолдер скроллера. Отображается когда нет записей для отображения. */
export const Placeholder: FC = () => (
  <Adjust hor="CENTER">
    <Gap.X3L />
    <Gap.X3L />
    <Gap.X2L />
    <Gap.SM />
    <TurnoverScrollerPlaceholderIcon scale={120} />
    <Gap.XL />
    <Typography.H3>{locale.turnoverScroller.tablePlaceholder}</Typography.H3>
  </Adjust>
);

Placeholder.displayName = 'Placeholder';
