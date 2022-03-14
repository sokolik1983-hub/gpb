import { useState, useEffect } from 'react';
import type { IPagination } from 'interfaces';
import type { IFilterField } from '@platform/services/client';
import { useFilter } from '@platform/services/client';

/**
 * Параметры хука useScrollerPagination.
 */
interface IUseScrollerPagination {
  /**
   * Поля фильтра с условиями фильтрации.
   */
  fields: Record<string, IFilterField>;
  /**
   * Наименования полей фильтра.
   */
  labels: Record<string, string>;
  /**
   * Дополнительные стили для фильтра.
   */
  className?: string;
  /**
   * Ключ, по которому будем доставать данные из хранилища. Если не передан, то
   * вместо хранилища (localstorage) будет использован обычный React.state.
   */
  storageKey?: string;
  /** Игнорировать содержимое хранилища при инициализации и форсировать инициализацию из дефолтных значений конфига. */
  forceFromDefault?: boolean;
  /**
   * Пагинация по-умолчанию.
   */
  defaultPagination: IPagination;
}

/**
 * Хук управления пагинацией.
 */
export const useScrollerPagination = (args: IUseScrollerPagination) => {
  const { defaultPagination, ...filterProps } = args;

  const { filterPanel, ...filterArgs } = useFilter({ ...filterProps });

  const [pagination, setPagination] = useState<IPagination>(defaultPagination);

  useEffect(() => {
    setPagination(prevPagination => ({ ...prevPagination, pageIndex: 0 }));
  }, [filterPanel.values]);

  return { pagination, setPagination, filterPanel, ...filterArgs };
};
