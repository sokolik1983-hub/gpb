import { locale } from 'localization';

export enum DEBIT_PARAMS {
  /** Дебетовые документы выписки. */
  INCLUDE_STATEMENTS = 'includeStatements',
  /** Дебетовые документы основания. */
  INCLUDE_ORDERS = 'includeOrders',
}

export const defaultDebitParamsValue = {
  [DEBIT_PARAMS.INCLUDE_STATEMENTS]: false,
  [DEBIT_PARAMS.INCLUDE_ORDERS]: false,
};

export const defaultDebitParamsOptions = Object.keys(defaultDebitParamsValue).map(x => ({
  label: locale.common.debitParams[x],
  value: x,
}));
