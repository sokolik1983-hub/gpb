import type { DATE_PERIODS } from 'interfaces';
import type { OPERATIONS } from 'interfaces/common';
import { FORM_FIELDS, FORM_FIELD_LABELS } from 'pages/form/admin/views/statement-request/constants';
import { getDateRangeValidationScheme } from 'schemas/admin';
import { getEmptyFieldErrorMessage } from 'utils/common';
import type { AnyObjectSchema } from 'yup';
import { object, string, array, mixed } from 'yup';

/** Поля валидации при создании "Запроса выписки". */
// type ValidationFields = Pick<StatementRequestFormValues, 'accountIds' | 'accountTypeCodes' | 'operations' | 'periodType'>;

/** Схема валидации диапазона дат. */
const dateRangeValidationScheme = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO });

/**
 * Схема валидации создания сущности "Запрос выписки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32247549
 *
 * TODO: Разобраться с типизацией. Нужно использовать SchemaOf<ValidationFields>. Убрать AnyObjectSchema.
 */
export const validationSchema: AnyObjectSchema = object({
  accountIds: array().min(1, getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.ACCOUNTS])),
  accountTypeCodes: array().min(1, getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.ACCOUNT_TYPE_CODES])),
  dateFrom: string().required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.DATE_FROM])),
  dateTo: string().required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.DATE_TO])),
  operations: mixed<OPERATIONS>().required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.OPERATION])),
  periodType: mixed<DATE_PERIODS>().required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.PERIOD_TYPE])),
}).concat(dateRangeValidationScheme);
