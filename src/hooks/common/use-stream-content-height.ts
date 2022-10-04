import { useCallback, useState } from 'react';
import { TOPLINE_HEIGHT } from 'stream-constants';
import { useEventListener } from '@platform/ui';

/** Хук получения текущего размера контента стрима. */
export const useStreamContentHeight = (): number => {
  const [height, setHeight] = useState<number>(window.innerHeight - TOPLINE_HEIGHT);

  const handleResize = useCallback(() => setHeight(window.innerHeight - TOPLINE_HEIGHT), []);

  useEventListener('resize', handleResize);

  return height;
};
