/** Значения для группировки записей в скроллере. Выбираются в селекте фильтра. */
export enum GROUPING_VALUES {
  /** Без группировки. */
  NO_GROUPING = 'NONE',
  /** По организациям и валютам. */
  ORGANIZATIONS_AND_CURRENCIES = 'ORG_AND_CURRENCY',
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
  NO_GROUPING = 'NONE',
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
  groupBy: GROUPING_VALUES;
  /** Параметры сортировки. */
  sort?: {
    /** Имя поля по которому происходит сортировка. */
    field: string;
    /** Порядок сортировки. */
    direction: string;
  };
}

/** Суммарные остатки и обороты по валюте. */
export interface ICurrencyTotalInfo {
  /** Буквенный код валюты. */
  currencyCode: string;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Расход. */
  outcome: number;
  /** Приход. */
  income: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
}

/** Информация о группировке. В талице скроллера отображается как группирующая строка. */
export interface IGroupInfo {
  /** Тип счёта. */
  accountType?: string;
  /** Наименование филиала организации. */
  branchName?: string;
  /** Данные о валюте. */
  /** Наименование валюты. */
  currencyName?: string;
  /** Буквенный код валюты. */
  currencyCode?: string;
  /** Тип группировки (тип группирующей строки в таблице скроллера). */
  groupingType: GROUPING_TYPE;
  /** Приход. */
  income?: number;
  /** Входящий остаток. */
  incomingBalance?: number;
  /** Наименование организации. */
  organizationName?: string;
  /** Расход. */
  outcome?: number;
  /** Исходящий остаток. */
  outgoingBalance?: number;
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
  accountType: string;
  /** Наименование подразделения организации. */
  branchName: string;
  /** Наименование валюты. */
  currencyName?: string;
  /** Буквенный код валюты. */
  currencyCode?: string;
  /** Приход. */
  income: number;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Наименование организации. */
  organizationName: string;
  /** Расход. */
  outcome: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
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
  total: ICurrencyTotalInfo[];
  /** Блоки сгруппированных счетов. */
  accounts: IGroupedAccounts[];
}
