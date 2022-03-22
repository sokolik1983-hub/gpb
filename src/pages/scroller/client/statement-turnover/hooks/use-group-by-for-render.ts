import { usePrevious } from 'hooks';
import type { GROUPING_VALUES } from 'interfaces/dto';

/**
 * Возвращает значение группировки, которое будет использована для рендера таблицы скроллера.
 *
 * @param currentGroupBy - Значение группировки выбранное в форме.
 * @param fetching - Если true - то происходит запрос остатков и оборотов, для отображения в скроллере.
 */
export const useGroupByForRender = (currentGroupBy: GROUPING_VALUES, fetching: boolean): GROUPING_VALUES => {
  const cachedGroupBy = usePrevious(
    currentGroupBy,
    // Если скроллер находится в процессе загрузки данных, то не надо обновлять значение группировки.
    // Надо рендерить со старым значением.
    fetching
  );

  // Если идёт процесс загрузки, то скроллер рендерится со старым значением группировки
  return fetching && cachedGroupBy ? cachedGroupBy : currentGroupBy;
};
