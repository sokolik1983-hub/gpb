import type { IScrollerResponseDto } from 'interfaces';
import type { ReconciliationTurnoverDto } from 'interfaces/admin';
import { RECORD_SOURCE } from 'interfaces/admin';
import { RECONCILIATION_STATUS } from 'interfaces/admin/reconciliation-status';
import type { IServerDataResp } from '@platform/services/admin';

const reconciliationTurnovers = Array(30).fill({
  accountNumber: '40702810500440170961',
  currencyCode: 'RUB',
  incomingBalance: 100_000_000,
  operationDate: '2021-06-18',
  outgoingBalance: 10_000,
  reconciliationDate: '2021-06-18T10:20:41.027916Z',
  recordSource: RECORD_SOURCE.CLOSING_OF_DAY,
  status: RECONCILIATION_STATUS.NOT_AVAILABLE,
  turnoverCredit: 1500,
  turnoverDebit: 5_000_000,
});

export const mockReconciliationTurnoversData: IServerDataResp<IScrollerResponseDto<ReconciliationTurnoverDto>> = {
  data: {
    page: reconciliationTurnovers,
    size: reconciliationTurnovers.length,
  },
  // TODO: Для проверки ошибки сервера.
  // error: {
  //   code: '540',
  //   message: 'Error Closed Days',
  // },
};
