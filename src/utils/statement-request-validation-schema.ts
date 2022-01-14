import type { DATE_PERIODS } from 'interfaces';
import type { ICreateRequestStatementDto, FORMAT, OPERATIONS } from 'interfaces/client';
import { TYPE, ACTIONS } from 'interfaces/client';
import { locale } from 'localization';
import { FORM_FIELD_LABELS, FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import type { SchemaOf } from 'yup';
import { object, string, array, mixed } from 'yup';
import { pathGenerator } from '@platform/core';
import { getEmptyFieldErrorMessage, isLessThanTomorrow } from './validation';

/** Возвращает путь до поля в объекте. Используется для улучшения типизации. */
export const getPath = pathGenerator<ICreateRequestStatementDto>();

/** Поля которые необходимо валидировать при создании "Запроса выписки". */
type FieldsToValidate = Pick<
  ICreateRequestStatementDto,
  'accountsIds' | 'dateFrom' | 'dateTo' | 'email' | 'format' | 'operations' | 'periodType'
>;

/**
 * Схема валидации ДТО создания сущности "Запрос выписки".
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=32247549}
 */
export const statementRequestValidationSchema: SchemaOf<FieldsToValidate> = object({
  email: string()
    .email(locale.errors.emailFormat)
    .max(100, locale.errors.emailLengthExceeded)
    .when(getPath('action'), { is: action => action === ACTIONS.SEND_TO_EMAIL, then: string().required(locale.errors.emailRequired) }),
  periodType: mixed<DATE_PERIODS>().required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.PERIOD_TYPE])),
  dateFrom: string()
    .required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.DATE_TO]))
    .test('lessThanTomorrow', locale.errors.periodStart.tomorrowRestriction, isLessThanTomorrow),
  dateTo: string()
    .required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.DATE_TO]))
    .test('lessThanTomorrow', locale.errors.periodEnd.tomorrowRestriction, isLessThanTomorrow),
  accountsIds: array().min(1, getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.ACCOUNTS])),
  format: mixed<FORMAT>().when(getPath('type'), {
    is: creationType => creationType !== TYPE.HIDDEN_VIEW,
    then: string().required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.FILE_FORMAT])),
  }),
  operations: mixed<OPERATIONS>().required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.OPERATION])),
});
