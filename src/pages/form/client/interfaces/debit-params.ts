import { locale } from 'localization';

export interface IDebitParams {
  /** Документы выписки. */
  includeStatements: boolean;
  /** Документы основания. */
  includeOrders: boolean;
}

export const defaultDebitParamsValue: IDebitParams = {
  includeStatements: false,
  includeOrders: false,
};

export const debitParamsOptions = Object.keys(defaultDebitParamsValue).map(x => ({
  label: locale.common.debitParams[x],
  value: x,
}));
