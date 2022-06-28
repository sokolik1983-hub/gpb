import React, { useMemo } from 'react';
import type { PadSize } from '@platform/ui';
import { Adjust, Box, Gap } from '@platform/ui';
import styles from './styles.scss';

interface ISkeletonProps {
  /** Ширина рядов в скелетоне, задаётся числом пикселей или строкой для CSS свойства `width`. */
  width?: number | string;
  /** Высота анимированной полоски в пикселях. */
  rowHeight?: number;
  /** Количество рядов, по-умолчанию 1. */
  rows?: number;
  /** Компонент для отступ между рядами, по-умолчанию `Gap.MD`. */
  gap?: React.ReactNode;
  /** Проп для задания отступов, по-умолчанию не установлены. */
  padding?: PadSize;
}

/** Компонент для отображения процесса загрузки контента, по-умолчанию отображает один анимированный ряд. */
export const Skeleton: React.FC<ISkeletonProps> = ({
  width,
  rowHeight = 16,
  rows = 1,
  gap = <Gap />,
  padding = [undefined, undefined],
}) => {
  // вспомогатетельный массив для рендера списка компонентов, содержит в себе числа от 1 до `rows` включительно
  const iterationDummy = useMemo(() => Array.from(Array(rows).keys()).map((i: number) => i + 1), [rows]);

  return (
    <Box className={Adjust.getPadClass(padding)}>
      {iterationDummy.map(value => (
        <>
          <Box key={value} className={styles.base} data-testid="skeleton-row" style={{ width, height: rowHeight }} />
          {rows > 1 && value !== rows && gap}
        </>
      ))}
    </Box>
  );
};
