import type { IFormState } from 'stream-constants/form';

/** Счет. */
export interface Account {
  /** Номер счёта. */
  accountNumber: string;
  /** Код типа счета. */
  accountTypeCode: number;
  /** Идентификатор организации. */
  bankClientId: string;
  /** Наименование организации. */
  bankClientName: string;
  /** Идентификатор подразделения обслуживания. */
  branchId: string;
  /** Идентификатор счета. */
  id: string;
}

/** Свойства полей формы запроса выписки. */
export interface StatementRequestFormValues extends Omit<IFormState, 'accountIds'> {
  /** Счета. */
  accountIds: Account[];
  /** Коды типы счетов. */
  accountTypeCodes: string[];
  /** Идентификаторы организаций. */
  organizationIds: string[];
  /** Идентификаторы подразделений обслуживания. */
  serviceBranchIds: string[];
}

/** Свойства полей формы карточки запроса выписки. */
export interface StatementRequestCardFormState extends IFormState {
  /** Идентификаторы организаций. */
  organizationIds: string[];
}
