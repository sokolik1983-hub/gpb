import type { Column, UsePaginationState } from 'react-table';
import type { IExecuter, TransfomedAction } from '@platform/core';
import type { IActionWebInfo, IActionWithAuth, ISortSettings } from '@platform/services';
import type { IButtonAction } from '@platform/ui';

/** Свойства функции запроса данных с сервера. */
export interface IFetchDataParams {
  /** Текущая страница. */
  page: number;
  /** Сортировка. */
  multiSort?: ISortSettings;
  /** Количество строк на странице. */
  pageSize: number;
}

/** Ответ  функции запроса данных с сервера. */
export interface IFetchDataResponse<T> {
  /** Строки. */
  rows: T[];
  /** Количество страниц. */
  pageCount: number;
}

/** Свойства коспонента раскрытой строки. */
export interface IExpandedRowComponentProps<T> extends React.AllHTMLAttributes<HTMLDivElement> {
  /** Строка. */
  row: T;
  /** Действия. */
  actions: IButtonAction[];
}

/** Свойства таблицы. */
export interface IDataTableProps<T extends { id: string }> {
  /** Параметры колонок. */
  columns: Array<Column<T> & { isVisible: boolean; optionLabel?: string }>;
  /** Функция запроса данных с сервера. */
  fetchData(params: IFetchDataParams): Promise<IFetchDataResponse<T>>;
  /** Компонент раскрытой строки. */
  expandedRowComponent?: React.FC<IExpandedRowComponentProps<T>>;
  /** Обработчик изменения выбранных строк. */
  onSelectedRowsChange?(rows: T[]): void;
  /** Выбранные строки. */
  selectedRows?: T[];
  /** Обработчик двойного клика по строке. */
  onRowDoubleClick?(row: T): void;
  /** Геттер кнопок раскрытой строки. */
  expandedRowActionsGetter?(row: T): IActionWithAuth[];
  /** Геттер кнопок футера. */
  footerActionsGetter?(executor: IExecuter<unknown>): (row: T[]) => Array<TransfomedAction<IActionWebInfo<any, any>>>;
  /** Геттер быстрых кнопок строки. */
  fastActions?: IActionWithAuth[];
  /** Экшнэкзекьютер. */
  executor: IExecuter<unknown>;
  /** Сортировка по умолчанию. */
  defaultSort?: ISortSettings;
  /**
   * Контент панели действий над документов.
   */
  footerContent?: React.FC<{ selectedRows: T[] }>;
  /** Состояние пейджинации для управление в controlled режиме. */
  paginationState?: UsePaginationState<T>;
  /** Состояние пейджинации по-умолчанию для uncontrolled режима. */
  defaultPaginationState?: UsePaginationState<T>;
  /** Обработчик изменения состояния пейджинации. */
  onPaginationChange?(paginationState: UsePaginationState<T>): void;
  /** Заголовок для плэйсхолдера. */
  placeholderTitle?: string;
  /** Подзаголовок для плэйсхолдера. */
  placeholderMessage?: string;
  /** Флаг отображения кнопки настроек колонок скроллера. */
  showSettingsButton?: boolean;
  /** Ключ для сохранения в sessionStorage. */
  storageKey?: string;
}
