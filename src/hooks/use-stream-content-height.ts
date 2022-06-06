import { useEffect, useState } from 'react';
import { TOP_LINE_HEIGHT } from 'constants/main';

/** Хук получения текущего размера контента стрима. */
export const useStreamContentHeight = (): number => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight - TOP_LINE_HEIGHT);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
};
