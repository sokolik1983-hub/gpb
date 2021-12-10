import React from 'react';
import { locale } from 'localization';
import type { TableInstance } from 'react-table';
import { Pattern, Horizon, Gap, Typography, Select, Box } from '@platform/ui';
import { PAGE_SIZES } from './constants';
import { PaginationItems } from './pagination-items';
import css from './styles.scss';

/** Опции селекта выбора размера страницы. */
const COUNT_OPTIONS = [
  { label: '25', value: PAGE_SIZES.PER_25 },
  { label: '50', value: PAGE_SIZES.PER_50 },
  { label: '100', value: PAGE_SIZES.PER_100 },
];

/** Свойства компонента Пагинация. */
interface IPaginationProps {
  /** Экземпляр таблицы. */
  tableInstance: TableInstance<Record<string, any>>;
}

/** Пагинация скроллера. */
export const Pagination: React.FC<IPaginationProps> = ({ tableInstance }) => {
  const {
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageSize, pageIndex },
  } = tableInstance;

  return (
    <Box className={css.paginationWrapper}>
      <Gap />
      <Pattern>
        <Pattern.Span size={4}>
          <Horizon>
            <Horizon>
              <Typography.P line="NOWRAP">{locale.scroller.pagination.displayBy}</Typography.P>
              <Gap.XS />
              <Select extraSmall options={COUNT_OPTIONS} value={pageSize} width="auto" onChange={setPageSize} />
            </Horizon>
          </Horizon>
        </Pattern.Span>
        <Pattern.Span size={4}>
          <Horizon>
            <Horizon.Spacer />
            <PaginationItems currentPageIndex={pageIndex} gotoPage={gotoPage} pageCount={pageCount} />
            <Horizon.Spacer />
          </Horizon>
        </Pattern.Span>
        <Pattern.Span size={4} />
      </Pattern>
      <Gap />
    </Box>
  );
};
