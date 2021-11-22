import type { SORT_DIRECTION } from '@platform/services';
import type { ACCOUNT_TYPE as ACCOUNT_TYPES } from '@platform/services/client';

/** Значения для группировки записей в скроллере. Выбираются в селекте фильтра. */
export enum GROUPING_VALUES {
  /** Без группировки. */
  NO_GROUPING = 'NO_GROUPING',
  /** По организациям и валютам. */
  ORGANIZATIONS_AND_CURRENCIES = 'ORG_CURRENCY',
  /** По организациям. */
  ORGANIZATIONS = 'ORG',
  /** По валютам. */
  CURRENCIES = 'CURRENCY',
  /** По подразделениям. */
  BRANCHES = 'BRANCH',
  /** По типу счета. */
  ACCOUNT_TYPE = 'ACCOUNT_TYPE',
}

/** Типы группирующих записей. */
export enum GROUPING_TYPE {
  /** Без группировки. */
  NO_GROUPING = 'NO_GROUPING',
  /** По организации. */
  ORGANIZATIONS = 'ORG',
  /** По валюте. */
  CURRENCIES = 'CURRENCY',
  /** По филиалу ГПБ. */
  BRANCHES = 'BRANCH',
  /** По типу счёта. */
  ACCOUNT_TYPE = 'ACCOUNT_TYPE',
}

/** ДТО запроса оборотов. */
export interface IGetTurnoversRequestDto {
  /** Фильтры. */
  filter: {
    /** Начало периода.  */
    dateFrom?: string;
    /** Конец периода. */
    dateTo?: string;
    /** Идентификатор выбранных счетов клиента. */
    accountsIds: string[];
    /** Только активные счета. */
    onlyActiveAccounts: boolean;
  };
  /** Группировка записей. */
  grouping: GROUPING_VALUES;
  /** Параметры сортировки. */
  sort: {
    /** Имя поля по которому происходит сортировка. */
    field: string;
    /** Порядок сортировки. */
    direction: SORT_DIRECTION;
  };
}

/** Суммарные остатки и обороты по валюте. */
export interface ICurrencyTotalInfo {
  /** Буквенный код валюты. */
  currencyCode: string;
  /** Входящий остаток. */
  incomingBalance: string;
  /** Расход. */
  outcome: string;
  /** Приход. */
  income: string;
  /** Исходящий остаток. */
  outgoingBalance: string;
}

/** Информация о группировке. В талице скроллера отображается как группирующая строка. */
export interface IGroupInfo {
  /** Тип счёта. */
  accountType?: ACCOUNT_TYPES;
  /** Наименование филиала организации. */
  branchName?: string;
  /** Данные о валюте. */
  currencyData?: {
    /** Наименование валюты. */
    currencyName?: string;
    /** Буквенный код валюты. */
    currencyCode?: string;
  };
  /** Тип группировки (тип группирующей строки в таблице скроллера). */
  groupingType: GROUPING_TYPE;
  /** Приход. */
  income?: string;
  /** Входящий остаток. */
  incomingBalance?: string;
  /** Наименование организации. */
  organizationName?: string;
  /** Расход. */
  outcome?: string;
  /** Исходящий остаток. */
  outgoingBalance?: string;
}

/** Информация об оборотах по счёту. В таблице скролера отображается как строка с данными (subRow). */
export interface IAccountTurnoversInfo {
  /** Идентификатор счёта. */
  accountId: string;
  /** Номер счёта. */
  accountNumber: string;
  /** Имя счёта. */
  accountName: string;
  /** Тип аккаунта. */
  accountType: ACCOUNT_TYPES;
  /** Наименование подразделения организации. */
  branchName: string;
  /** Данные о валюте. */
  currencyData: {
    /** Наименование валюты. */
    currencyName?: string;
    /** Буквенный код валюты. */
    currencyCode?: string;
  };
  /** Приход. */
  income: string;
  /** Входящий остаток. */
  incomingBalance: string;
  /** Наименование организации. */
  organizationName: string;
  /** Расход. */
  outcome: string;
  /** Исходящий остаток. */
  outgoingBalance: string;
}

/**
 * Блок со сгруппированными счетами.
 *
 * В таблице скроллера отображается как группирующая строка и строки данных под ней.
 *
 * Если нет accounts, то в скроллере оборотов для этого блока будет рендерится
 * только группирующая строка. Происходит в при группировке "По организациям и валютам".
 */
export interface IGroupedAccounts {
  /** Информация о группировке. */
  groupInfo: IGroupInfo;
  /** Информация об оборотах по счётам. */
  groupedAccounts?: IAccountTurnoversInfo[];
}

/** ДТО ответа на запрос оборотов. */
export interface IGetTurnoversResponseDto {
  /** Суммарные остатки и обороты по валютам. */
  totals: ICurrencyTotalInfo[];
  /** Блоки сгруппированных счетов. */
  accounts: IGroupedAccounts[];
}
