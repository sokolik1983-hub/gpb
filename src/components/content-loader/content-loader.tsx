import React, { useMemo } from 'react';
import { Box, Gap, Skeleton } from '@platform/ui';

/** Свойства компонента обертка для отображения заглушки или данных. */
interface ContentLoaderProps {
  /** Данные для отображения. */
  children: React.ReactNode;
  /** Высота заглушки. */
  height: number;
  /** Признак загрузки данных и отображения заглушки. */
  loading?: boolean;
}

/** Высота строки в Skeleton. */
const ROW_HEIGHT = 16;

/** Вертикальные padding-и Skeleton - MD. */
const ROW_TOP_PADDING = 16;
const ROW_BOTTOM_PADDING = 16;

/** Высота gap Skeleton - MD. */
const GAP_HEIGHT = 16;

/** Компонент обертка для отображения заглушки или данных.  */
export const ContentLoader: React.FC<ContentLoaderProps> = ({ children, height, loading }) => {
  const rows = useMemo(() => {
    const pureHeight = height - (ROW_TOP_PADDING + ROW_BOTTOM_PADDING);
    const rowWithGapHeight = ROW_HEIGHT + GAP_HEIGHT;

    return pureHeight < rowWithGapHeight ? 1 : Math.round(pureHeight / rowWithGapHeight);
  }, [height]);

  return loading ? (
    <Box style={{ height }}>
      <Skeleton gap={<Gap />} padding={['MD', 'XL', 'MD', 'XL']} rows={rows} />
    </Box>
  ) : (
    (children as React.ReactElement)
  );
};

ContentLoader.displayName = 'ContentLoader';
