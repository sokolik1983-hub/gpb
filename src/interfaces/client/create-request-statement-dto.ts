import type { DATE_PERIODS, IUserDeviceInfo } from 'interfaces';
import type { ACTION } from 'interfaces/client/classificators/action';
import type { CREATION_TYPE } from 'interfaces/client/classificators/creation-type';
import type { FORMAT } from 'interfaces/client/classificators/format';
import type { OPERATIONS } from 'interfaces/client/classificators/operations';
import type { TYPE } from 'interfaces/client/classificators/type';
import type { ICreationParamsDto } from 'interfaces/client/creation-params-dto';

/** ДТО создания сущности "Запрос выписки". */
export interface ICreateRequestStatementDto {
  /** Идентификаторы счетов. */
  accountsIds: string[];
  /** Действие. */
  action: ACTION;
  /** Параметры формирования комплекта документов. */
  creationParams: ICreationParamsDto;
  /** Тип создания документа. */
  creationType: CREATION_TYPE;
  /** Дата начала периода запроса выписки. */
  dateFrom: string;
  /** Дата конца периода запроса выписки. */
  dateTo: string;
  /** Электронная почта, на которую необходимо выслать выписку. */
  email?: string;
  /** Формат файла выписки. */
  format?: FORMAT;
  /** Скрыть нулевые обороты. */
  hideEmptyTurnovers: boolean;
  /** Операции. */
  operations: OPERATIONS;
  /** Тип периода запроса выписки. */
  periodType: DATE_PERIODS;
  /** Признак того, что счета необходимо формировать отдельными файлами. */
  separateAccountsFiles: boolean;
  /** Признак того, необходимо ли подписывать выписку. */
  sign: boolean;
  /** URL страницы, с которой был создан запрос. */
  sourcePage: string;
  /** Тип запроса выписки. */
  type: TYPE;
  /** Данные устройства пользователя. */
  userDeviceInfo?: IUserDeviceInfo;
}
