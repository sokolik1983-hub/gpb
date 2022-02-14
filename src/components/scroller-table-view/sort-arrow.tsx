import type { FC } from 'react';
import React from 'react';
import cn from 'classnames';
import { HEADER_ALIGN } from 'interfaces';
import { locale } from 'localization';
import type { HeaderGroup } from 'react-table';
import { Box, ServiceIcons, Typography, WithInfoTooltip } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента SortArrow. */
export interface ISortArrowProps {
  /** Колонка таблиццы. */
  column: HeaderGroup<Record<string, any>>;
  /** Если true - то мультисортировка отключена. */
  disableMultiSort: boolean;
}

/** Стрелка указывающая направление сортировки. */
export const SortArrow: FC<ISortArrowProps> = ({ column, disableMultiSort }) => {
  const { sortedIndex, isSortedDesc, isSorted, headerAlign = HEADER_ALIGN.LEFT } = column;

  const SortIcon = isSortedDesc ? ServiceIcons.ArrowDown : ServiceIcons.ArrowUp;

  // Индексы сортировки (sortedIndex) начинаются с нуля, если сортировка не задана то индекс равен -1
  const sortIndex = sortedIndex + 1;

  const wrapperClassNames = cn(
    css.sortIconWrapper,
    // Если выравнивание заголовка по левому краю, то стрелка расположена справа.
    headerAlign === HEADER_ALIGN.LEFT ? css.sortIconWrapperRight : css.sortIconWrapperLeft
  );

  return (
    <WithInfoTooltip extraSmall text={locale.table.header.sortInfo}>
      {tooltipRef => (
        // textOverflow: "ellipsis" добавляется чтобы убрать тултип.
        <Box ref={tooltipRef} className={wrapperClassNames} style={{ textOverflow: disableMultiSort ? 'ellipsis' : undefined }}>
          <SortIcon fill={isSorted ? 'ACCENT' : 'FAINT'} scale="SM" />
          {!disableMultiSort && Boolean(sortIndex) && (
            <Typography.SmallText inline className={css.sortIndex} fill={'ACCENT'}>
              {sortIndex}
            </Typography.SmallText>
          )}
        </Box>
      )}
    </WithInfoTooltip>
  );
};

SortArrow.displayName = 'SortArrow';
