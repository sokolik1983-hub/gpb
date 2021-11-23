import type { FC } from 'react';
import React from 'react';
import { TurnoverScrollerPlaceholderIcon } from 'components/icons';
import { locale } from 'localization';
import { Gap, Typography, Box } from '@platform/ui';
import css from './styles.scss';

/** Плейсхолдер скроллера. Отображается когда нет записей для отображения. */
export const Placeholder: FC = () => (
  <Box className={css.placeholderOverlay}>
    <TurnoverScrollerPlaceholderIcon scale={120} />
    <Gap.XL />
    <Typography.H3>{locale.turnoverScroller.tablePlaceholder}</Typography.H3>
  </Box>
);

Placeholder.displayName = 'Placeholder';
