import type { FC } from 'react';
import React from 'react';
import { TurnoverScrollerPlaceholderIcon } from 'components/icons';
import { Gap, Typography, Box } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента ScrollerPlaceholder. */
export interface IScrollerPlaceholderProps {
  /** Лейбл плейсхолдера. */
  label: string;
}

/** Плейсхолдер скроллера. */
export const ScrollerPlaceholder: FC<IScrollerPlaceholderProps> = ({ label }) => (
  <Box className={css.placeholderOverlay}>
    <TurnoverScrollerPlaceholderIcon scale={120} />
    <Gap.XL />
    <Typography.H3>{label}</Typography.H3>
  </Box>
);

ScrollerPlaceholder.displayName = 'ScrollerPlaceholder';
