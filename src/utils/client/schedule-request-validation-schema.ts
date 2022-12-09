import type { DATE_PERIODS, OPERATIONS } from 'interfaces';
import { FORM_FIELD_LABELS, FORM_FIELDS } from 'stream-constants/form';
import type { IScheduleFormState } from 'stream-constants/form/schedule-form-state';
import { getEmptyFieldErrorMessage } from 'utils/common';
import { array, mixed, object } from 'yup';
import type { SchemaOf } from 'yup';

/** Поля которые необходимо валидировать при создании "Запроса выписки по расписанию". */
type FieldsToValidate = Pick<IScheduleFormState, 'accountIds' | 'operations' | 'periodType'>;

/**
 * Схема валидации ДТО создания сущности "Запрос выписки по расписанию".
 */
export const scheduleRequestValidationSchema: SchemaOf<FieldsToValidate> = object({
  periodType: mixed<DATE_PERIODS>().required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.PERIOD_TYPE])),
  accountIds: array().min(1, getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.ACCOUNTS])),
  operations: mixed<OPERATIONS>().required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.OPERATION])),
});
