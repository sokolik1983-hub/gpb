import type { FC } from 'react';
import React from 'react';
import { ScrollerSpinnerIcon } from 'components/icons';
import css from './styles.scss';

/** Свойства компонента Spinner. */
export interface ISpinnerProps {
  /** Размер иконки. */
  scale?: number;
}

/** Лоадер скроллера. */
export const Spinner: FC<ISpinnerProps> = ({ scale = 36 }) => <ScrollerSpinnerIcon className={css.spinner} scale={scale} />;

Spinner.displayName = 'Spinner';
