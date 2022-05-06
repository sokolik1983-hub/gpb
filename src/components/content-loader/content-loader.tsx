import React from 'react';
import { Box } from '@platform/ui';

/** Свойства компонента обертка для отображения заглушки или данных. */
interface ContentLoaderProps {
  /** Данные для отображения. */
  children: React.ReactNode;
  /** Высота заглушки. */
  height?: number;
  /** Признак загрузки данных и отображения заглушки. */
  loading?: boolean;
}

/** Компонент обертка для отображения заглушки или данных.  */
export const ContentLoader: React.FC<ContentLoaderProps> = ({ children, height, loading }) =>
  loading ? <Box style={{ height }} /> : (children as React.ReactElement);

ContentLoader.displayName = 'ContentLoader';
