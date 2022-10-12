import { createStatement, getExecutor } from 'actions/client';
import { DATE_PERIODS } from 'interfaces';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { ACTION, CREATION_TYPE, OPERATIONS, TYPE } from 'interfaces/common/classificators';
import type { ICreateRequestStatementDto } from 'interfaces/dto';
import { statementService } from 'services/client';
import { showCommonErrorMessage } from 'utils/common/common';
import { to } from '@platform/core';

/** Свойства создания выписки из других сервисов. */
interface ExternalCreateStatement {
  /** Идентификаторы счетов. */
  accountIds: string[];
  /** Тип периода запроса выписки. */
  periodType?: DATE_PERIODS;
  /** URL страницы, с которой был создан запрос. */
  refererPage: string;
}

/** Эксекутер. */
const executor = getExecutor();

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
export const executeCreateStatementHidden = async ({ accountIds, refererPage }: ExternalCreateStatement) => {
  const periodType = DATE_PERIODS.YESTERDAY;

  const [datePeriod, error] = await to(statementService.getDatePeriod({ periodType }));

  if (error || !datePeriod) {
    showCommonErrorMessage();

    return;
  }

  const doc: Partial<ICreateRequestStatementDto> = {
    ...baseDoc,
    accountsIds: accountIds,
    periodType,
    sourcePage: refererPage,
    type: TYPE.HIDDEN_VIEW,
    ...datePeriod,
  };

  void executor.execute(createStatement(EXPORT_PARAMS_USE_CASES.SEVENTEEN), [doc]);
};
