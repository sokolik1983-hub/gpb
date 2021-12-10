import type { FC } from 'react';
import React from 'react';
import { Box } from '@platform/ui';
import css from './styles.scss';

/** Закрывает таблицу скроллера во время выполнения запроса. */
export const ScrollerLoadingOverlay: FC = () => <Box className={css.tableBodyOverlay} />;

ScrollerLoadingOverlay.displayName = 'ScrollerLoadingOverlay';
