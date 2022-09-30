import { createStatement, getExecutor } from 'actions/client';
import { DATE_PERIODS } from 'interfaces';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { ACTION, CREATION_TYPE, OPERATIONS, TYPE } from 'interfaces/common/classificators';
import type { ICreateRequestStatementDto } from 'interfaces/dto';

/** Свойства создания выписки из других сервисов. */
interface ExternalCreateStatement {
  /** Идентификаторы счетов. */
  accountsIds: string[];
  /** Тип периода запроса выписки. */
  periodType?: DATE_PERIODS;
  /** URL страницы, с которой был создан запрос. */
  refererPage: string;
}

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

/** Создать выписку с типом "Скрытый запрос просмотра" из другого сервиса. */
export const executeCreateStatementHidden = ({ accountsIds, refererPage }: ExternalCreateStatement): void => {
  const executor = getExecutor();

  const doc: Partial<ICreateRequestStatementDto> = {
    ...baseDoc,
    type: TYPE.HIDDEN_VIEW,
    periodType: DATE_PERIODS.YESTERDAY,
    accountsIds,
    sourcePage: refererPage,
  };

  void executor.execute(createStatement(EXPORT_PARAMS_USE_CASES.SEVENTEEN), [doc]);
};

/** Создать выписку с типом "Разовый запрос" из другого сервиса. */
export const executeCreateStatementOneTime = ({ accountsIds, periodType, refererPage }: ExternalCreateStatement): void => {
  const executor = getExecutor();

  const doc: Partial<ICreateRequestStatementDto> = {
    ...baseDoc,
    type: TYPE.ONETIME,
    accountsIds,
    periodType,
    sourcePage: refererPage,
  };

  void executor.execute(createStatement(EXPORT_PARAMS_USE_CASES.SEVENTEEN), [doc]);
};
