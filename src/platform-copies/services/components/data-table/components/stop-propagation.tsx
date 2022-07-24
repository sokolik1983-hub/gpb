import React, { useCallback } from 'react';

import { Box } from '@platform/ui';

/**
 * Компонент-обертка для предотвращения всплытия событий.
 * Используется в основном для обертки интерактивных компонентов строки таблицы.
 */
export const StopPropagation: React.FC = ({ children }) => {
  const handleClick = useCallback((event: React.SyntheticEvent) => event.stopPropagation(), []);

  return <Box onClick={handleClick}>{children}</Box>;
};
