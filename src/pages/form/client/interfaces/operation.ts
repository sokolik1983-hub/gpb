import { locale } from 'localization';

export enum OPERATION {
  ALL = 'ALL',
  INCOME = 'INCOME',
  OUTCOME = 'OUTCOME',
}

export const operationOptions = [
  { label: locale.common.operations.ALL, value: OPERATION.ALL },
  { label: locale.common.operations.INCOME, value: OPERATION.INCOME },
  { label: locale.common.operations.OUTCOME, value: OPERATION.OUTCOME },
];
