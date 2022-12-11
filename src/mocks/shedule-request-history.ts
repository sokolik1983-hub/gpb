import { locale } from 'localization';

export const scheduleRequestHistory = {
  data: [
    {
      accountNumbers: ['60123275300798099183'],
      accountsIds: ['6919e131-8d44-4936-b247-a272c0dabdfa'],
      createdAt: '2022-11-23T08:48:00.016875Z',
      action: 'VIEW',
      emails: ['example1@mail.ru'],
      id: '92591a56-f6fa-4580-86de-24e1ed5eac01',
      organizationNames: [locale.common.testData.organization],
      periodEnd: '2022-10-01',
      periodStart: '2022-10-01',
      periodType: 'YESTERDAY',
      scheduleMethod: 'SAVE',
      scheduleTime: '09:00',
    },
    {
      accountNumbers: ['60123275300798099183'],
      accountsIds: ['6919e132-8d44-4936-b247-a272c0dabdfa'],
      createdAt: '2022-11-23T08:48:00.026875Z',
      action: 'VIEW',
      emails: ['example2@mail.ru'],
      id: '92591a56-f6fa-4580-86de-24e1ed5eac02',
      organizationNames: [locale.common.testData.organization],
      periodEnd: '2022-10-02',
      periodStart: '2022-10-02',
      periodType: 'TODAY',
      scheduleMethod: 'EMAIL',
      scheduleTime: '09:00',
    },
  ],
};
