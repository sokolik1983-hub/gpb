import type { FC } from 'react';
import React from 'react';
import { Box, DATA_TYPE } from '@platform/ui';
import css from './styles.scss';

/** Закрывает таблицу скроллера во время выполнения запроса. */
export const ScrollerLoadingOverlay: FC = () => <Box className={css.tableBodyOverlay} data-type={DATA_TYPE.LOADER_LOCAL} />;

ScrollerLoadingOverlay.displayName = 'ScrollerLoadingOverlay';
