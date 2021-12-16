import { locale } from 'localization';

export interface ICreditParams {
  /** Документы выписки. */
  includeStatements: boolean;
  /** Документы основания. */
  includeOrders: boolean;
}

export const defaultCreditParamsValue: ICreditParams = {
  includeStatements: false,
  includeOrders: false,
};

export const creditParamsOptions = Object.keys(defaultCreditParamsValue).map(x => ({
  label: locale.common.creditParams[x],
  value: x,
}));
