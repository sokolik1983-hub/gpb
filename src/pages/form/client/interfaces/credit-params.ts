import { locale } from 'localization';

/** Кредитные параметры создания выписки. */
export enum CREDIT_PARAMS {
  /** Кредитовые документы выписки. */
  INCLUDE_STATEMENTS = 'includeStatements',
  /** Кредитовые документы основания. */
  INCLUDE_ORDERS = 'includeOrders',
}

/** Начальные значения кредитных параметров создания выписки. */
export const defaultCreditParamsValue = {
  [CREDIT_PARAMS.INCLUDE_STATEMENTS]: false,
  [CREDIT_PARAMS.INCLUDE_ORDERS]: false,
};

/** Начальные значения кредитных опций создания выписки. */
export const defaultCreditParamsOptions = Object.keys(defaultCreditParamsValue).map(x => ({
  label: locale.common.creditParams[x],
  value: x,
}));
