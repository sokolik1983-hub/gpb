import type React from 'react';
import type { Column, UsePaginationState } from 'react-table';
import type { IExecuter, TransfomedAction } from '@platform/core';
import type { IActionWebInfo, IActionWithAuth, IBaseEntity, ISortSettings } from '@platform/services';
import type { IButtonAction } from '@platform/ui';

/** Свойства запроса данных с сервера. */
export interface FetchDataParams {
  /** Сортировка. */
  multiSort?: ISortSettings;
  /** Текущая страница. */
  page: number;
  /** Количество строк на странице. */
  pageSize: number;
}

/** Свойства ответа данных с сервера. */
export interface FetchDataResponse<T> {
  /** Строки. */
  rows: T[];
  /** Количество страниц. */
  pageCount?: number;
  /** Общее количество записей. */
  total?: number;
}

/** Свойства компонента раскрытой строки. */
export interface IExpandedRowComponentProps<T> extends React.AllHTMLAttributes<HTMLDivElement> {
  /** Строка. */
  row: T;
  /** Действия. */
  actions: IButtonAction[];
}

/** Свойства компонента подписи к строке. */
export interface ICaptionRowComponentProps<T> extends React.AllHTMLAttributes<HTMLDivElement> {
  /** Строка. */
  row: T;
}

/** Тип колонок таблицы. */
export type TableColumn<T extends IBaseEntity> = Array<Column<T> & { isVisible: boolean; optionLabel?: string }>;

/** Свойства таблицы. */
export interface DataTableProps<T extends IBaseEntity> {
  /** Параметры колонок. */
  columns: TableColumn<T>;
  /** Состояние пагинации по-умолчанию для uncontrolled режима. */
  defaultPaginationState?: UsePaginationState<T>;
  /** Сортировка по умолчанию. */
  defaultSort?: ISortSettings;
  /** Компонент раскрытой строки. */
  expandedRowComponent?: React.FC<IExpandedRowComponentProps<T>>;
  /** Исполнитель экшенов. */
  executor: IExecuter<unknown>;
  /** Геттер кнопок раскрытой строки. */
  expandedRowActionsGetter?(row: T): IActionWithAuth[];
  /** Геттер быстрых кнопок строки. */
  fastActions?: IActionWithAuth[] | ((row: T) => IActionWithAuth[]);
  /** Функция запроса данных с сервера. */
  fetchData(params: FetchDataParams): Promise<FetchDataResponse<T>>;
  /** Контент панели действий над данными. */
  footerContent?: React.FC<{ selectedRows: T[] }>;
  /** Геттер кнопок футера. */
  footerActionsGetter?(executor: IExecuter<unknown>): (row: T[]) => Array<TransfomedAction<IActionWebInfo<any, any>>>;
  /** Обработчик изменения состояния пагинации. */
  onPaginationChange?(paginationState: UsePaginationState<T>): void;
  /** Обработчик одинарного клика по строке. */
  onRowClick?(row: T): void;
  /** Обработчик двойного клика по строке. */
  onRowDoubleClick?(row: T): void;
  /** Обработчик изменения выбранных строк. */
  onSelectedRowsChange?(rows: T[]): void;
  /** Состояние пагинации для управления в controlled режиме. */
  paginationState?: UsePaginationState<T>;
  /** Заголовок для плэйсхолдера. */
  placeholderTitle?: string;
  /** Подзаголовок для плэйсхолдера. */
  placeholderMessage?: string;
  /** Контент подписи к строке (располагается внизу строки). */
  rowCaptionComponent?: React.FC<ICaptionRowComponentProps<T>>;
  /** Выбранные строки. */
  selectedRows?: T[];
  /** Флаг отображения кнопки настроек колонок таблицы. */
  showSettingsButton?: boolean;
  /** Ключ для сохранения в sessionStorage. */
  storageKey?: string;
  /** Признак отображения только выбранных строк. */
  visibleOnlySelectedRows?: boolean;
}

/** Свойства таблицы с бесконечным скроллингом. */
export type InfiniteScrollDataTableProps<T extends IBaseEntity> = DataTableProps<T>;

/** Запись ячейки. */
export type RecordCell = Record<string, any>;

/** Выравнивание в заголовке колонки таблицы. */
export enum HEADER_ALIGN {
  /** Слева. */
  LEFT = 'LEFT',
  /** Справа. */
  RIGHT = 'RIGHT',
}
