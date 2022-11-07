import type { IBaseEntity } from '@platform/services';

/** Счет в информации об остатках и оборотах. */
export interface TurnoverBranchMockDto extends IBaseEntity {
  /** Код филиала Банка. */
  absCode: number;
  /** Название филиала Банка. */
  filialName: string;
}
