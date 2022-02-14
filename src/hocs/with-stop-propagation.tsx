import type { FC } from 'react';
import React, { useCallback } from 'react';

import { Box } from '@platform/ui';

/**
 * HOC для предотвращения всплытия событий.
 * Используется в основном для обертки интерактивных компонентов строки таблицы.
 */
export const withStopPropagation = <T,>(Component: FC<T>): FC<T> => {
  const WithStopPropagation: FC<T> = props => {
    const handleClick = useCallback((event: React.SyntheticEvent) => event.stopPropagation(), []);

    return (
      <Box onClick={handleClick}>
        <Component {...props} />
      </Box>
    );
  };

  WithStopPropagation.displayName = `WithStopPropagation(${Component.displayName || Component.name})`;

  return WithStopPropagation;
};
