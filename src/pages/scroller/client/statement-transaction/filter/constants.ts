import { TRANSACTION_TYPES } from 'interfaces';
import { locale } from 'localization';
import { EMPTY_VALUE, TRANSACTION_TYPE_LABELS } from 'stream-constants';
import { pathGenerator } from '@platform/core';
import type { IFilterField } from '@platform/services';
import type { IOption } from '@platform/ui';
import type { IFormState } from './interfaces';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<IFormState>();

/** Поля формы фильтра. */
export const FORM_FIELDS = {
  /** Поиск по таблице. */
  TABLE_SEARCH: getPath('tableSearch'),
  /** Сумма. */
  AMOUNT: 'amount',
  /** Сумма от. */
  AMOUNT_FROM: getPath('amountFrom'),
  /** Сумма по. */
  AMOUNT_TO: getPath('amountTo'),
  /** Контрагент. */
  COUNTERPARTY: getPath('counterparty'),
  /** Номер документа. */
  DOC_NUMBER: getPath('docNumber'),
  /** Дата платежа. */
  PAYMENT_DATE: 'paymentDate',
  /** Дата платежа с. */
  PAYMENT_DATE_FROM: getPath('paymentDateFrom'),
  /** Дата платежа по. */
  PAYMENT_DATE_TO: getPath('paymentDateTo'),
  /** Тип операции. */
  TRANSACTION_TYPE: getPath('transactionType'),
};

/** Значения полей и условия фильтрации для useFilter. */
export const fields: Record<string, IFilterField> = {
  // TODO: описать фильтры при подключении реста.
};

/** Лейблы тегов полей фильтра. */
export const tagLabels = {
  // Здесь должны быть только те поля теги для которых нужно отображать на панели тегов.
  [FORM_FIELDS.DOC_NUMBER]: locale.transactionsScroller.tags.docNumber,
  [FORM_FIELDS.PAYMENT_DATE_FROM]: locale.transactionsScroller.tags.dateFrom,
  [FORM_FIELDS.PAYMENT_DATE_TO]: locale.transactionsScroller.tags.dateTo,
  [FORM_FIELDS.TRANSACTION_TYPE]: locale.transactionsScroller.tags.transactionType,
  [FORM_FIELDS.COUNTERPARTY]: locale.transactionsScroller.tags.counterparty,
};

/**
 * Определяет теги для каких полей будут отображаться,
 * порядок следования тегов в массиве определяет порядок следования тэгов в UI.
 */
export const FIELDS_WITH_TAGS = [
  FORM_FIELDS.DOC_NUMBER,
  FORM_FIELDS.PAYMENT_DATE_FROM,
  FORM_FIELDS.PAYMENT_DATE_TO,
  FORM_FIELDS.TRANSACTION_TYPE,
  FORM_FIELDS.COUNTERPARTY,
];

/** Ключ в Session Storage по которому хранится состояние фильтрации. */
export const STORAGE_KEY = 'statement-transactions-filer-scroller';

/** Опции селекта типа платежа. */
export const TRANSACTION_TYPE_OPTIONS: Array<IOption<TRANSACTION_TYPES | typeof EMPTY_VALUE>> = [
  { value: EMPTY_VALUE, label: locale.form.labels.selectAll },
  { value: TRANSACTION_TYPES.INCOME, label: TRANSACTION_TYPE_LABELS[TRANSACTION_TYPES.INCOME] },
  { value: TRANSACTION_TYPES.OUTCOME, label: TRANSACTION_TYPE_LABELS[TRANSACTION_TYPES.OUTCOME] },
];
