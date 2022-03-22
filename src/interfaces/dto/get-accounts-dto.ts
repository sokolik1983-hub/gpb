import type { IAccountV2 } from '@platform/services/client';

/** ДТО ответа запроса счетов. */
export interface IGetAccountsResponseDto extends IAccountV2 {
  /** Наименование счёта. */
  accountName: string;
}
