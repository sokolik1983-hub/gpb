import type { FC } from 'react';
import React from 'react';
import { ScrollerSpinnerIcon } from 'components/icons';
import type { ICON_SCALE } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента Spinner. */
export interface ISpinnerProps {
  /** Размер иконки. */
  scale?: number | keyof typeof ICON_SCALE;
}

/** Лоадер скроллера. */
export const Spinner: FC<ISpinnerProps> = ({ scale = 36 }) => <ScrollerSpinnerIcon className={css.spinner} scale={scale} />;

Spinner.displayName = 'Spinner';
