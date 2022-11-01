import type { IScrollerResponseDto } from 'interfaces';
import type { ClosedDay } from 'interfaces/admin';
import type { IServerDataResp } from '@platform/services/admin';

const closedDayList = Array(30).fill({
  operationDate: '2021-06-18',
  branch: {
    code: '480',
    // eslint-disable-next-line @eco/no-missing-localization
    filialName: 'Ф-Л БАНКА ГПБ (АО) В Г. СУРГУТЕ',
    id: '2d1103ae-8685-4e66-bb3c-8eebaf294011',
  },
  secondPhase: {
    date: '2022-08-16T22:10:41.027916Z',
    messageId: '7c5f87d0-3fe8-11ed-b878-0242ac120002',
  },
  thirdPhase: {
    date: '2022-08-16T22:10:41.027916Z',
    messageId: '7c5f87d0-3fe8-11ed-b878-0242ac120002',
  },
});

export const mockClosedDaysData: IServerDataResp<IScrollerResponseDto<ClosedDay>> = {
  data: {
    page: closedDayList,
    size: closedDayList.length,
  },
  // TODO: Для проверки ошибки сервера.
  // error: {
  //   code: '540',
  //   message: 'Error Closed Days',
  // },
};
