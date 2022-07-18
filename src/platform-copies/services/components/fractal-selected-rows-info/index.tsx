import React, { useMemo } from 'react';
import type { IButtonAction } from '@platform/ui';
import { Adjust, ActionButtons, Box, FILL, Horizon, SHADOW, SIZE } from '@platform/ui';
import css from './style.scss';

/** Пропсы для FractalSelectedRowsInfo. */
export interface IFractalSelectedRowsInfoProps<T> {
  /** Выбранные строки скроллера. */
  selectedRows: T[];
  /** Геттер действия для выделенных строк. */
  actionsGetter(rows: T[]): IButtonAction[];
  /**
   * Контент панели.
   */
  content: React.FC<{ selectedRows: T[] }>;
}

/**
 * Компонент действий над выбранными документами.
 *
 * @example <FractalSelectedRowsInfo />
 * */
// eslint-disable-next-line react/function-component-definition
export const FractalSelectedRowsInfo = function <T extends Record<string, unknown>>({
  actionsGetter,
  selectedRows,
  content: Content,
}: IFractalSelectedRowsInfoProps<T>) {
  const actions = useMemo(() => actionsGetter(selectedRows), [actionsGetter, selectedRows]);

  return (
    <Box className={css.footerContainer} fill={FILL.BASE} shadow={SHADOW.MD}>
      <Adjust pad={[null, SIZE.XL]} vert={'CENTER'}>
        <Horizon>
          <Content selectedRows={selectedRows} />
          <Horizon.Spacer />
          <ActionButtons actions={actions} collapseAfter={1} />
        </Horizon>
      </Adjust>
    </Box>
  );
};

FractalSelectedRowsInfo.displayName = 'FractalSelectedRowsInfo';
