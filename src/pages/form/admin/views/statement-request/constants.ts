import type { Account, StatementRequestFormValues } from 'interfaces/admin/form/form-state';
import { locale } from 'localization';
import {
  FORM_FIELDS as FORM_FIELDS_COMMON,
  FORM_FIELD_LABELS as FORM_FIELD_LABELS_COMMON,
  defaultFormState as defaultFormStateCommon,
} from 'stream-constants/form';
import { pathGenerator } from '@platform/core';

/** Возвращает имя поля формы. Улучшает типизацию. */
export const getPathFormField = pathGenerator<StatementRequestFormValues>();

/** Поля формы запроса выписки. */
export const FORM_FIELDS = {
  ...FORM_FIELDS_COMMON,
  ACCOUNT_TYPE_CODES: getPathFormField('accountTypeCodes'),
  ORGANIZATION_IDS: getPathFormField('organizationIds'),
  SERVICE_BRANCH_IDS: getPathFormField('serviceBranchIds'),
};

/** Метки полей формы запроса выписки. */
export const FORM_FIELD_LABELS = {
  ...FORM_FIELD_LABELS_COMMON,
  [FORM_FIELDS.ACCOUNT_TYPE_CODES]: locale.admin.statementRequestForm.label.accountType,
  [FORM_FIELDS.ORGANIZATION_IDS]: locale.admin.statementRequestForm.label.organization,
  [FORM_FIELDS.SERVICE_BRANCH_IDS]: locale.admin.statementRequestForm.label.serviceBranch,
};

/** Начальное значение состояния формы запроса выписки. */
export const defaultFormState: StatementRequestFormValues = {
  ...defaultFormStateCommon,
  accountIds: [],
  accountTypeCodes: [],
  organizationIds: [],
  serviceBranchIds: [],
};

/** Возвращает имя поля счета. Улучшает типизацию. */
export const getPathAccountField = pathGenerator<Account>();

/** Поля счета. */
export const ACCOUNT_FIELD = {
  ACCOUNT_TYPE_CODE: getPathAccountField('accountTypeCode'),
  BANK_CLIENT_ID: getPathAccountField('bankClientId'),
  BRANCH_ID: getPathAccountField('branchId'),
};
