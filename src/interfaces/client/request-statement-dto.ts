import type { DATE_PERIODS } from 'interfaces';
import type { ACTIONS } from 'interfaces/client/classificators/actions';
import type { CREATION_TYPE } from 'interfaces/client/classificators/creation-type';
import type { FORMAT } from 'interfaces/client/classificators/format';
import type { OPERATIONS } from 'interfaces/client/classificators/operations';
import type { TYPE } from 'interfaces/client/classificators/type';
import type { ICreationParamsDto } from 'interfaces/client/creation-params-dto';

/** Создание запроса выписки. */
export interface IRequestStatementDto {
  accountsIds: string[];
  action: ACTIONS;
  creationParams: ICreationParamsDto;
  creationType: CREATION_TYPE;
  createdAt: string;
  dateFrom: string;
  dateTo: string;
  email: string;
  format: FORMAT;
  hideEmptyTurnovers: boolean;
  operations: OPERATIONS;
  periodType: DATE_PERIODS;
  separateAccountsFiles: boolean;
  sign: boolean;
  sourcePage: string;
  type: TYPE;
}
