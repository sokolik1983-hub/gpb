import type { DATE_PERIODS } from 'interfaces';
import type { ICreateRequestStatementDto, OPERATIONS } from 'interfaces/client';
import { ACTIONS } from 'interfaces/client';
import { FORM_FIELD_LABELS, FORM_FIELDS } from 'interfaces/form/form-state';
import { locale } from 'localization';
import type { SchemaOf } from 'yup';
import { object, string, array, mixed } from 'yup';
import { pathGenerator } from '@platform/core';
import { getEmptyFieldErrorMessage, isLessThanTomorrow, isValidDateRange } from './validation';

/** Возвращает путь до поля в объекте. Используется для улучшения типизации. */
export const getPath = pathGenerator<ICreateRequestStatementDto>();

/** Поля которые необходимо валидировать при создании "Запроса выписки". */
type FieldsToValidate = Pick<ICreateRequestStatementDto, 'accountsIds' | 'dateFrom' | 'dateTo' | 'email' | 'operations' | 'periodType'>;

/**
 * Схема валидации ДТО создания сущности "Запрос выписки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32247549
 */
export const statementRequestValidationSchema: SchemaOf<FieldsToValidate> = object({
  email: string()
    .email(locale.errors.emailFormat)
    .max(100, locale.errors.emailLengthExceeded)
    .when(getPath('action'), { is: action => action === ACTIONS.SEND_TO_EMAIL, then: string().required(locale.errors.emailRequired) }),
  periodType: mixed<DATE_PERIODS>().required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.PERIOD_TYPE])),
  dateFrom: string()
    .required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.DATE_FROM]))
    .test('lessThanTomorrow', locale.errors.periodStart.tomorrowRestriction, isLessThanTomorrow)
    .test('moreThanPeriodEnd', locale.errors.periodStart.dateMoreRestriction, isValidDateRange),
  dateTo: string()
    .required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.DATE_TO]))
    .test('lessThanTomorrow', locale.errors.periodEnd.tomorrowRestriction, isLessThanTomorrow)
    .test('lessThanPeriodStart', locale.errors.periodEnd.dateLessRestriction, isValidDateRange),
  accountsIds: array().min(1, getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.ACCOUNTS])),
  operations: mixed<OPERATIONS>().required(getEmptyFieldErrorMessage(FORM_FIELD_LABELS[FORM_FIELDS.OPERATION])),
});
