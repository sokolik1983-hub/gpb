import type { ICollectionResponse } from '@platform/services';

/** Ответ от сервера на запрос списка сущностей для страницы скроллера. */
export interface IScrollerResponceDto<T> {
  /** Сущности для отображения в строках скроллера. */
  page: T[];
  /** Общее количество элементов, удовлетворяющих условиям фильтрации. */
  size: number;
}

/** Расширенный, ответ от сервера на запрос списка сущностей для страницы скроллера. */
export interface IExpandedScrollerResponceDto<T> {
  /** Ответ от сервера на запрос списка сущностей для страницы скроллера. */
  page: IScrollerResponceDto<T>;
  /** Общее количество элементов, без учёта фильтрации. */
  totalCount: number;
}

/** Расширенный, преобразованный, ответ от сервера на запрос списка сущностей для страницы скроллера. */
export interface IExpandedCollectionResponse<T> extends ICollectionResponse<T> {
  /** Общее количество элементов, без учёта фильтрации. */
  totalCount: number;
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
