import { locale } from 'localization';

export enum CREDIT_PARAMS {
  /** Кредитовые документы выписки. */
  INCLUDE_STATEMENTS = 'includeStatements',
  /** Кредитовые документы основания. */
  INCLUDE_ORDERS = 'includeOrders',
}
export const defaultCreditParamsValue = {
  [CREDIT_PARAMS.INCLUDE_STATEMENTS]: false,
  [CREDIT_PARAMS.INCLUDE_ORDERS]: false,
};

export const defaultCreditParamsOptions = Object.keys(defaultCreditParamsValue).map(x => ({
  label: locale.common.creditParams[x],
  value: x,
}));
