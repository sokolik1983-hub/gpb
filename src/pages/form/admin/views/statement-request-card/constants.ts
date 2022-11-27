import type { StatementRequestCardFormState } from 'interfaces/admin/form/form-state';
import { FORM_FIELDS as FORM_FIELDS_COMMON, defaultFormState as defaultFormStateCommon } from 'stream-constants/form';
import { pathGenerator } from '@platform/core';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPath = pathGenerator<StatementRequestCardFormState>();

/** Поля формы карточки запроса выписки. */
export const FORM_FIELDS = {
  ...FORM_FIELDS_COMMON,
  ORGANIZATION_IDS: getPath('organizationIds'),
};

/** Начальное значение состояния формы. */
export const defaultFormState: StatementRequestCardFormState = {
  ...defaultFormStateCommon,
  organizationIds: [],
};
