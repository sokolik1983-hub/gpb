import { locale } from 'localization';

/** Дебетовые параметры создания выписки. */
export enum DEBIT_PARAMS {
  /** Дебетовые документы выписки. */
  INCLUDE_STATEMENTS = 'includeStatements',
  /** Дебетовые документы основания. */
  INCLUDE_ORDERS = 'includeOrders',
}

/** Начальные значения дебетовых параметров создания выписки. */
export const defaultDebitParamsValue = {
  [DEBIT_PARAMS.INCLUDE_STATEMENTS]: false,
  [DEBIT_PARAMS.INCLUDE_ORDERS]: false,
};

/** Начальные значения дебетовых опций создания выписки. */
export const defaultDebitParamsOptions = Object.keys(defaultDebitParamsValue).map(x => ({
  label: locale.common.debitParams[x],
  value: x,
}));
