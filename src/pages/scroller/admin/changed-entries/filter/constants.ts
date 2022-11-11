import { TRANSACTION_TYPES } from 'interfaces';
import { CHANGED_ENTRY_STATUSES } from 'interfaces/changed-entry-statuses';
import { locale } from 'localization';
import type { ENTRY_SOURCE_VIEW } from 'stream-constants';
import { ECO_STATEMENT, EMPTY_VALUE, TRANSACTION_TYPE_LABELS } from 'stream-constants';
import { CHANGED_ENTRIES_STATUS_LABEL } from 'stream-constants/admin';
import { pathGenerator } from '@platform/core';
import type { IFilterField } from '@platform/services';
import { filterFields } from '@platform/services';
import type { IOption } from '@platform/ui';
import type { IFormState } from './interfaces';
import { bankClientFieldFormatter } from './utils';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<IFormState>();

/** Поля формы фильтра. */
export const FORM_FIELDS = {
  /** Поиск по таблице. */
  TABLE_SEARCH: getPath('textSearch'),
  /** Сумма. */
  AMOUNT: 'amount',
  /** Сумма от. */
  AMOUNT_FROM: getPath('amountFrom'),
  /** Сумма по. */
  AMOUNT_TO: getPath('amountTo'),
  /** Контрагент. */
  COUNTERPARTY: getPath('counterparty'),
  /** Счёт контрагента. */
  COUNTERPARTY_ACCOUNT: getPath('counterpartyAccountNumber'),
  /** Клиент. */
  CLIENT: getPath('client'),
  /** Счёт клиента. */
  CLIENT_ACCOUNT: getPath('clientAccountNumber'),
  /** Номер документа. */
  DOC_NUMBER: getPath('documentNumber'),
  /** Дата платежа. */
  PAYMENT_DATE: 'entryDate',
  /** Дата платежа с. */
  PAYMENT_DATE_FROM: getPath('paymentDateFrom'),
  /** Дата платежа по. */
  PAYMENT_DATE_TO: getPath('paymentDateTo'),
  /** Тип операции. */
  TRANSACTION_TYPE: getPath('transactionType'),
  /** Статус операции. */
  STATUS: getPath('status'),
  /** Источник вызова скроллера проводок. */
  SOURCE: getPath('source'),
};

/** Список дополнительных полей формы фильтра. */
export const ADDITIONAL_FORM_FIELDS = [
  FORM_FIELDS.COUNTERPARTY,
  FORM_FIELDS.COUNTERPARTY_ACCOUNT,
  FORM_FIELDS.CLIENT,
  FORM_FIELDS.CLIENT_ACCOUNT,
  FORM_FIELDS.DOC_NUMBER,
  FORM_FIELDS.PAYMENT_DATE_FROM,
  FORM_FIELDS.PAYMENT_DATE_TO,
  FORM_FIELDS.TRANSACTION_TYPE,
  FORM_FIELDS.STATUS,
];

/**
 * Метод получения значения полей и условий фильтрации для useFilter.
 *
 * @param entrySourceView - Значение для поля `Источник`.
 */
export const getFields = (entrySourceView?: typeof ENTRY_SOURCE_VIEW): Record<string, IFilterField> => {
  const fields = {
    [FORM_FIELDS.TABLE_SEARCH]: filterFields.contains(EMPTY_VALUE, FORM_FIELDS.TABLE_SEARCH),
    [FORM_FIELDS.AMOUNT_FROM]: filterFields.ge(EMPTY_VALUE, FORM_FIELDS.AMOUNT, (value): number => Number(value)),
    [FORM_FIELDS.AMOUNT_TO]: filterFields.le(EMPTY_VALUE, FORM_FIELDS.AMOUNT, (value): number => Number(value)),
    [FORM_FIELDS.PAYMENT_DATE_FROM]: filterFields.ge(EMPTY_VALUE, FORM_FIELDS.PAYMENT_DATE),
    [FORM_FIELDS.PAYMENT_DATE_TO]: filterFields.le(EMPTY_VALUE, FORM_FIELDS.PAYMENT_DATE),
    [FORM_FIELDS.DOC_NUMBER]: filterFields.eq(EMPTY_VALUE, FORM_FIELDS.DOC_NUMBER),
    [FORM_FIELDS.TRANSACTION_TYPE]: filterFields.eq(EMPTY_VALUE, FORM_FIELDS.TRANSACTION_TYPE),
    [FORM_FIELDS.STATUS]: filterFields.eq(EMPTY_VALUE, FORM_FIELDS.TRANSACTION_TYPE),
    [FORM_FIELDS.COUNTERPARTY]: filterFields.in([], FORM_FIELDS.COUNTERPARTY, bankClientFieldFormatter),
    [FORM_FIELDS.CLIENT]: filterFields.in([], FORM_FIELDS.CLIENT, bankClientFieldFormatter),
    [FORM_FIELDS.COUNTERPARTY_ACCOUNT]: filterFields.in([], FORM_FIELDS.COUNTERPARTY_ACCOUNT),
    [FORM_FIELDS.CLIENT_ACCOUNT]: filterFields.in([], FORM_FIELDS.CLIENT_ACCOUNT),
  };

  if (entrySourceView) {
    fields[FORM_FIELDS.SOURCE] = filterFields.eq(entrySourceView, FORM_FIELDS.SOURCE);
  }

  return fields;
};

/** Лейблы тегов полей фильтра. */
export const tagLabels = {
  // Здесь должны быть только те поля теги для которых нужно отображать на панели тегов.
  [FORM_FIELDS.DOC_NUMBER]: locale.admin.changedEntriesScroller.tags.docNumber,
  [FORM_FIELDS.PAYMENT_DATE_FROM]: locale.admin.changedEntriesScroller.tags.dateFrom,
  [FORM_FIELDS.PAYMENT_DATE_TO]: locale.admin.changedEntriesScroller.tags.dateTo,
  [FORM_FIELDS.TRANSACTION_TYPE]: locale.admin.changedEntriesScroller.tags.transactionType,
  [FORM_FIELDS.STATUS]: locale.admin.changedEntriesScroller.tags.status,
  [FORM_FIELDS.COUNTERPARTY]: locale.admin.changedEntriesScroller.tags.counterparty,
  [FORM_FIELDS.COUNTERPARTY_ACCOUNT]: locale.admin.changedEntriesScroller.tags.counterpartyAccountNumber,
  [FORM_FIELDS.CLIENT]: locale.admin.changedEntriesScroller.tags.client,
  [FORM_FIELDS.COUNTERPARTY_ACCOUNT]: locale.admin.changedEntriesScroller.tags.clientAccountNumber,
};

/**
 * Определяет теги для каких полей будут отображаться,
 * порядок следования тегов в массиве определяет порядок следования тэгов в UI.
 */
export const FIELDS_WITH_TAGS = [
  FORM_FIELDS.DOC_NUMBER,
  FORM_FIELDS.PAYMENT_DATE_FROM,
  FORM_FIELDS.PAYMENT_DATE_TO,
  FORM_FIELDS.COUNTERPARTY,
  FORM_FIELDS.COUNTERPARTY_ACCOUNT,
  FORM_FIELDS.CLIENT,
  FORM_FIELDS.CLIENT_ACCOUNT,
  FORM_FIELDS.TRANSACTION_TYPE,
  FORM_FIELDS.STATUS,
];

/** Ключ в Session Storage по которому хранится состояние фильтрации. */
export const STORAGE_KEY = 'bank:changed-entries-scroller:filter';

/** Опции селекта типа платежа. */
export const TRANSACTION_TYPE_OPTIONS: Array<IOption<TRANSACTION_TYPES | typeof EMPTY_VALUE>> = [
  { value: EMPTY_VALUE, label: locale.form.labels.selectAll },
  { value: TRANSACTION_TYPES.INCOME, label: TRANSACTION_TYPE_LABELS[TRANSACTION_TYPES.INCOME] },
  { value: TRANSACTION_TYPES.OUTCOME, label: TRANSACTION_TYPE_LABELS[TRANSACTION_TYPES.OUTCOME] },
];

/** Опции селекта типа платежа. */
export const STATUS_OPTIONS: Array<IOption<CHANGED_ENTRY_STATUSES | typeof EMPTY_VALUE>> = [
  { value: EMPTY_VALUE, label: locale.form.labels.selectAll },
  { value: CHANGED_ENTRY_STATUSES.ADDED, label: CHANGED_ENTRIES_STATUS_LABEL[CHANGED_ENTRY_STATUSES.ADDED] },
  { value: CHANGED_ENTRY_STATUSES.REMOVED, label: CHANGED_ENTRIES_STATUS_LABEL[CHANGED_ENTRY_STATUSES.REMOVED] },
];

export const TRANSACTIONS_REQUEST_STATUS = `${ECO_STATEMENT}/transactionsRequestStatus`;
