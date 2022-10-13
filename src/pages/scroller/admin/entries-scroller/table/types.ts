import type React from 'react';
import type {
  ICaptionRowComponentProps,
  IExpandedRowComponentProps,
  IFetchDataParams,
  IFetchDataResponse,
  RecordCell,
  SettingsFormProps,
  TableColumn,
} from 'platform-copies/services';
import type { TableInstance, UsePaginationState, TableBodyProps as TableBodyPropsPure, Row } from 'react-table';
import type { IExecuter, TransfomedAction } from '@platform/core';
import type { IActionWebInfo, IActionWithAuth, IBaseEntity, ISortSettings } from '@platform/services';

/** Свойства компонента для отображения таблицы. */
export interface TableProps<T extends IBaseEntity, R extends IBaseEntity> {
  /** Параметры колонок. */
  columns: TableColumn<R>;
  /** Состояние пагинации по-умолчанию для uncontrolled режима. */
  defaultPaginationState?: UsePaginationState<T>;
  /** Сортировка по умолчанию. */
  defaultSort?: ISortSettings;
  /** Компонент раскрытой строки. */
  expandedRowComponent?: React.FC<IExpandedRowComponentProps<R>>;
  /** Исполнитель экшенов. */
  executor: IExecuter<unknown>;
  /** Геттер кнопок раскрытой строки. */
  expandedRowActionsGetter?(row: R): IActionWithAuth[];
  /** Геттер быстрых кнопок строки. */
  fastActions?: IActionWithAuth[] | ((row: R) => IActionWithAuth[]);
  /** Функция запроса данных с сервера. */
  fetchData(params: IFetchDataParams): Promise<IFetchDataResponse<T>>;
  /** Контент панели действий над данными. */
  footerContent?: React.FC<{ selectedRows: R[] }>;
  /** Геттер кнопок футера. */
  footerActionsGetter?(executor: IExecuter<unknown>): (row: R[]) => Array<TransfomedAction<IActionWebInfo<any, any>>>;
  /** Обработчик изменения состояния пагинации. */
  onPaginationChange?(paginationState: UsePaginationState<T>): void;
  /** Обработчик одинарного клика по строке. */
  onRowClick?(row: R): void;
  /** Обработчик двойного клика по строке. */
  onRowDoubleClick?(row: R): void;
  /** Обработчик изменения выбранных строк. */
  onSelectedRowsChange?(rows: R[]): void;
  /** Состояние пагинации для управления в controlled режиме. */
  paginationState?: UsePaginationState<T>;
  /** Заголовок для плэйсхолдера. */
  placeholderTitle?: string;
  /** Подзаголовок для плэйсхолдера. */
  placeholderMessage?: string;
  /** Контент подписи к строке (располагается внизу строки). */
  rowCaptionComponent?: React.FC<ICaptionRowComponentProps<R>>;
  /** Выбранные строки. */
  selectedRows?: R[];
  /** Флаг отображения кнопки настроек колонок таблицы. */
  showSettingsButton?: boolean;
  /** Ключ для сохранения в sessionStorage. */
  storageKey?: string;
  /** Признак отображения только выбранных строк. */
  visibleOnlySelectedRows?: boolean;
  /** Кастомный компонент настроек таблицы. */
  customSettingsForm?: React.FC<SettingsFormProps>;
  /** Геттер получения подстроки.  */
  getSubRows?(originalRow: R, relativeIndex: number): R[];
  /** Признак наличия группировки. */
  withGrouping?: boolean;
}

/** Свойства компонента для отображения тела таблицы. */
export interface TableBodyPropsWithGrouping<R extends IBaseEntity> extends TableBodyPropsPure {
  /** Исполнитель экшенов. */
  executor: IExecuter<unknown>;
  /** Геттер кнопок раскрытой строки. */
  expandedRowActionsGetter?(row: R): IActionWithAuth[];
  /** Компонент раскрытой строки. */
  expandedRowComponent?: React.FC<IExpandedRowComponentProps<R>>;
  /** Геттер быстрых кнопок строки. */
  fastActions?: IActionWithAuth[] | ((row: R) => IActionWithAuth[]);
  /** Обработчик одинарного клика по строке. */
  onRowClick?(row: R): void;
  /** Обработчик двойного клика по строке. */
  onRowDoubleClick?(row: R): void;
  /** Функция запроса данных с сервера. */
  refetch(): void;
  /** Компонент для футера строки. */
  rowCaptionComponent?: React.FC<ICaptionRowComponentProps<R>>;
  /** Экземпляр таблицы. */
  tableInstance: TableInstance<RecordCell>;
  /** Признак отображения только выбранных строк. */
  visibleOnlySelectedRows?: boolean;
  /** Обработчик изменения выбранных строк. */
  onSelectedRowsChange?(rows: R[]): void;
  /** Признак наличия группировки. */
  withGrouping?: boolean;
}

/** Свойства компонента для отображения подгруппы тела таблицы. */
export interface TableBodySubRowsProps<R extends IBaseEntity> extends TableBodyPropsWithGrouping<R> {
  /** Строки для вывода в таблице. */
  subRows: Array<Row<RecordCell>>;
}
