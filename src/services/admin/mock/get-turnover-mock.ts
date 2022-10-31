import type { ITurnoverMockDto } from 'interfaces/admin/dto/turnover-mock-dto';
import type { IServerResp } from '@platform/services';

/** Заглушка с информацией об остатках и оборотах. */
export const getTurnoversMock = (): Promise<IServerResp<ITurnoverMockDto[]>> =>
  Promise.resolve({
    data: Array(9).fill([
      {
        id: '465f91be-1814-4e89-9a59-2394f11636d2',
        account: {
          id: '0a40198d-14f0-4d83-bc2b-5c1db766f60d',
          number: '40702810100210201421',
          currency: { letterCode: 'RUB' },
          bankClient: {
            id: '3506d05b-684f-452b-b87e-4609462e3a9c',
            // eslint-disable-next-line @eco/no-missing-localization
            name: 'ООО «Банк Софт Системс»',
            inn: '044525593',
          },
        },
        operationDate: '2021-18-06',
        accountBranch: {
          id: '416448a4-96f2-4188-a256-56f5044603ef',
          // eslint-disable-next-line @eco/no-missing-localization
          filialName: 'Ф-Л БАНКА ГПБ (АО) В Г. СУРГУТЕ',
          absCode: 480,
        },
        serviceBranch: {
          id: '416448a4-96f2-4188-a256-56f5044603ef',
          // eslint-disable-next-line @eco/no-missing-localization
          filialName: 'Ф-Л БАНКА ГПБ (АО) В Г. СУРГУТЕ',
          absCode: 480,
        },
        incomingBalance: 10_000,
        outgoingBalance: 100_000_000,
        turnoverCredit: 5_000_000,
        turnoverDebit: 1500,
      },
    ]),
  });
