import { createStatement, getExecutor, showStatementForm } from 'actions/client';
import { DATE_PERIODS } from 'interfaces';
import { ACTION, CREATION_TYPE, OPERATIONS, TYPE } from 'interfaces/client/classificators';
import type { ICreateRequestStatementDto } from 'interfaces/dto';

/** Данные для запроса на выписку. */
const baseDoc: Partial<ICreateRequestStatementDto> = {
  action: ACTION.VIEW,
  creationType: CREATION_TYPE.NEW,
  dateFrom: '2022-06-08',
  dateTo: '2022-06-08',
  periodType: DATE_PERIODS.SELECT_PERIOD,
  operations: OPERATIONS.ALL,
  creationParams: {
    includeCreditOrders: false,
    includeCreditStatements: false,
    includeDebitOrders: false,
    includeDebitStatements: false,
    separateDocumentsFiles: false,
  },
  hideEmptyTurnovers: false,
  separateAccountsFiles: false,
  sign: false,
};

export const executeCreateStatementHidden = ({ accountsIds, refererPage }: { accountsIds: string[]; refererPage: string }) => {
  const executor = getExecutor();

  const doc: Partial<ICreateRequestStatementDto> = {
    ...baseDoc,
    type: TYPE.HIDDEN_VIEW,
    accountsIds,
    sourcePage: refererPage,
  };

  void executor.execute(createStatement, [doc]);
};

export const executeCreateStatementOneTime = ({ accountsIds, refererPage }: { accountsIds: string[]; refererPage: string }) => {
  const executor = getExecutor();

  const doc: Partial<ICreateRequestStatementDto> = {
    ...baseDoc,
    type: TYPE.ONETIME,
    accountsIds,
    sourcePage: refererPage,
  };

  void executor.execute(createStatement, [doc]);
};

export const executeCreateStatementOrg = () => {
  const executor = getExecutor();

  void executor.execute(showStatementForm);
};
