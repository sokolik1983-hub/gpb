// TODO: Привести в порядок когда будут готовы ресты, пока тут тулько занлушки

import type { IGetDatePeriodResponseDto, IGetDatePeriodRequestDto, IGetAccountsResponseDto } from 'interfaces/client';
import { DATE_PERIODS } from 'interfaces/client';
import { mockAccounts } from 'mocks/mock-accounts';

export const statementService = {
  /** Получение временного периода. */
  getDatePeriod: async (data: IGetDatePeriodRequestDto): Promise<IGetDatePeriodResponseDto> =>
    // TODO: заглушка чтобы потестить UI, переписать когда будет рест.
    new Promise<IGetDatePeriodResponseDto>((resolve, reject) => {
      setTimeout(() => {
        switch (data.period) {
          case DATE_PERIODS.LAST_3_DAYS:
            resolve({ dateFrom: '2021-11-09', dateTo: '2021-12-09' });

            return;
          case DATE_PERIODS.CUR_MONTH:
          case DATE_PERIODS.LAST_MONTH:
            resolve({ dateFrom: '2021-10-01', dateTo: '2021-12-31' });

            return;
          case DATE_PERIODS.PREV_QUARTER:
          default:
            reject('err');

            return;
        }
      }, 500);
    }),
  // TODO: заглушка чтобы потестить UI, переписать когда будет рест.
  getAccounts: async (): Promise<IGetAccountsResponseDto[]> =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(mockAccounts);
      }, 500);
    }),
};
