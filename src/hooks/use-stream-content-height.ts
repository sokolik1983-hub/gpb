import { useEffect, useState } from 'react';
import { TOPLINE_HEIGHT } from 'stream-constants';

/** Хук получения текущего размера контента стрима. */
export const useStreamContentHeight = (): number => {
  const [height, setHeight] = useState<number>(window.innerHeight - TOPLINE_HEIGHT);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - TOPLINE_HEIGHT);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
};
