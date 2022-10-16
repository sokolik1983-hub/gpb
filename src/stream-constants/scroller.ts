import { PAGE_SIZES } from 'components/common/pagination';
import type { IPagination } from 'interfaces';

/** Состояние пагинации по умолчанию. */
export const DEFAULT_PAGINATION: IPagination = {
  pageSize: PAGE_SIZES.PER_25,
  pageIndex: 0,
};
