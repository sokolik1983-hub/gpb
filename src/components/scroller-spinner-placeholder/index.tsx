import type { FC } from 'react';
import React from 'react';
import { Spinner, Box } from '@platform/ui';
import css from './styles.scss';

/** Лоадер скроллера, отображается вместо содержимого таблицы, во время выполнения запроса. */
export const ScrollerSpinnerPlaceholder: FC = () => (
  <Box className={css.overlay}>
    <Spinner small={false} />
  </Box>
);

ScrollerSpinnerPlaceholder.displayName = 'ScrollerSpinnerPlaceholder';
