import type { ICollectionResponse } from '@platform/services';

/** Ответ от сервера на запрос списка сущностей для страницы скроллера. */
export interface IScrollerResponseDto<T> {
  /** Сущности для отображения в строках скроллера. */
  page: T[];
  /** Общее количество элементов, удовлетворяющих условиям фильтрации. */
  size: number;
}

/** Расширенный, ответ от сервера на запрос списка сущностей для страницы скроллера. */
export interface IExpandedScrollerResponceDto<T> {
  /** Ответ от сервера на запрос списка сущностей для страницы скроллера. */
  page: IScrollerResponseDto<T>;
  /** Общее количество элементов, без учёта фильтрации. */
  totalCount: number;
}

/** Расширенный, преобразованный, ответ от сервера на запрос списка сущностей для страницы скроллера. */
export interface IExpandedCollectionResponse<T> extends ICollectionResponse<T> {
  /** Общее количество элементов, без учёта фильтрации. */
  totalCount: number;
  /** HTTP-статус ответа. */
  status: number;
}

/** ДТО ответа от метода печати / экспорта выписки или ее документов. */
export interface ICreateAttachmentResponse {
  /** MIME-тип. */
  mimeType: string;
  /** Контент в base64. */
  content: string;
  /** Имя формируемого файла. */
  fileName: string;
  /** Информация об ошибке. */
  error?: string;
}

/** ДТО ответа от скроллера. */
export interface ScrollerResponseDto<T> {
  /** Список элементов типа T. */
  page: T[];
  /** СУммарное кол-во элементов. */
  size: number;
}

/** Ответ сервера с данными. */
export interface ServerResponseData<T> {
  /** Данные ответа. */
  data: T;
}

/** Ответ сервера со страницей. */
export interface ServerResponsePage<T> {
  /** Данные страницы. */
  page: T;
}

/** Ответ сервера со списком. */
export interface ServerResponseList<T> {
  /** Список данных. */
  list: T[];
  /** Общее количество записей. */
  total: number;
}
