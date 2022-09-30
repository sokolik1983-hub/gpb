import { OPERATIONS } from 'interfaces/common/classificators/operations';
import { locale } from 'localization';

/** Опции операций для выписки. */
export const operationOptions = [
  { label: locale.common.operations.ALL, value: OPERATIONS.ALL },
  { label: locale.common.operations.INCOME, value: OPERATIONS.INCOME },
  { label: locale.common.operations.OUTCOME, value: OPERATIONS.WRITE_OFF },
];
