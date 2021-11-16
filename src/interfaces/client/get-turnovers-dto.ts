/** Значения для группировки записей в скроллере.  */
export enum GROUPING_VALUES {
  // TODO: уточнить значения после готовности рестов
  /** Без группировки. */
  NO_GROUPING = 'NO_GROUPING',
  /** По организациям и валютам. */
  ORGANIZATIONS_AND_CURRENCIES = 'ORGANIZATIONS_AND_CURRENCIES',
  /** По организациям. */
  ORGANIZATION = 'ORGANIZATION',
  /** По валютам. */
  CURRENCIES = 'CURRENCIES',
  /** По подразделениям. */
  BRANCHES = 'BRANCHES',
  /** По типу счета. */
  ACCOUNT_TYPE = 'ACCOUNT_TYPE',
}

/** ДТО запроса оборотов. */
export interface IGetTurnoversRequestDto {
  // TODO: Уточнить после готовности реста.
  /** Начало периода.  */
  dateFrom?: string; // TODO: После готовности реста уточнить формат даты
  /** Конец периода. */
  dateTo?: string; // TODO: После готовности реста уточнить формат даты
  /** Выбранные счета клиента. */
  accounts?: string[];
  /** Группировка записей. */
  grouping: GROUPING_VALUES;
  /** Только активные счета. */
  onlyActiveAccounts: boolean;
  /** Параметры сортировки. */
  multiSort?: Array<{
    field: string;
    direction: string;
  }>;
}

/** ДТО ответа на запрос оборотов. */
export interface IGetTurnoversResponseDto {
  // TODO: Уточнить после готовности реста.
  rows: Record<string, unknown>;
}
