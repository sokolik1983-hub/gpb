/* eslint-disable @eco/no-missing-localization,sonarjs/no-duplicate-string */
import type { IGroupedAccounts } from 'interfaces/client';
import { GROUPING_TYPE } from 'interfaces/client';
import { COMMON_FIELDS } from 'mocks/turnover/common';
import { ACCOUNT_TYPE } from '@platform/services/client';

/** Заглушка для скроллера ОСВ. */
export const byAccountTypes: IGroupedAccounts[] = [
  {
    groupInfo: {
      groupingType: GROUPING_TYPE.ACCOUNT_TYPE,
      accountType: ACCOUNT_TYPE.GOZ,
      branchName: 'БАНК ГПБ (АО)',
      currencyData: { currencyName: 'Российский рубль', currencyCode: 'RUB' },
      ...COMMON_FIELDS,
    },
    groupedAccounts: [
      {
        organizationName: 'ООО «Ромашка»',
        accountNumber: '40702810500440170961',
        accountId: '9c608be3-630f-4277-bc12-5e76981cbcd1',
        accountName: 'Очень длинное имя счёта которе используется для того чтобы',
        accountType: ACCOUNT_TYPE.CHECKING,
        branchName: 'БАНК ГПБ (АО)',
        currencyData: { currencyName: 'Российский рубль', currencyCode: 'RUB' },
        ...COMMON_FIELDS,
      },
      {
        organizationName: 'ООО «Ромашка»',
        accountId: '9c608be3-630f-4277-bc12-5e76981cbcd1',
        accountName: 'Очень длинное имя счёта которе используется для того чтобы',
        accountNumber: '40702810500440170962',
        accountType: ACCOUNT_TYPE.CHECKING,
        branchName: 'Ф-Л БАНКА ГПБ (АО) В Г. ВЛАДИВОСТОКЕ',
        currencyData: { currencyName: 'Российский рубль', currencyCode: 'RUB' },
        ...COMMON_FIELDS,
      },
      {
        organizationName: 'ООО «Ромашка»',
        accountId: '9c608be3-630f-4277-bc12-5e76981cbcd1',
        accountName: 'Очень длинное имя счёта которе используется для того чтобы',
        accountNumber: '40702810500440170962',
        accountType: ACCOUNT_TYPE.CHECKING,
        branchName: 'Ф-Л БАНКА ГПБ (АО) В Г. ВЛАДИВОСТОКЕ',
        currencyData: { currencyName: 'Российский рубль', currencyCode: 'RUB' },
        ...COMMON_FIELDS,
      },
      {
        organizationName: 'ООО «Ромашка»',
        accountId: '9c608be3-630f-4277-bc12-5e76981cbcd1',
        accountName: 'Очень длинное имя счёта которе используется для того чтобы',
        accountNumber: '40702810500440170962',
        accountType: ACCOUNT_TYPE.CHECKING,
        branchName: 'Ф-Л БАНКА ГПБ (АО) В Г. ВЛАДИВОСТОКЕ',
        currencyData: { currencyName: 'Российский рубль', currencyCode: 'RUB' },
        ...COMMON_FIELDS,
      },
    ],
  },
  {
    groupInfo: {
      groupingType: GROUPING_TYPE.ACCOUNT_TYPE,
      accountType: ACCOUNT_TYPE.PARTICIPANT,
      branchName: 'Ф-Л БАНКА ГПБ (АО) В Г. ВЛАДИВОСТОКЕ',
      currencyData: { currencyName: 'Российский рубль', currencyCode: 'RUB' },
      ...COMMON_FIELDS,
    },
    groupedAccounts: [
      {
        organizationName: 'ООО «Роза»',
        accountNumber: '40702810500440170961',
        accountId: '9c608be3-630f-4277-bc12-5e76981cbcd1',
        accountName: 'Очень длинное имя счёта которе используется для того чтобы',
        accountType: ACCOUNT_TYPE.CHECKING,
        branchName: 'БАНК ГПБ (АО)',
        currencyData: { currencyName: 'Российский рубль', currencyCode: 'RUB' },
        ...COMMON_FIELDS,
      },
      {
        organizationName: 'ООО «Роза»',
        accountId: '9c608be3-630f-4277-bc12-5e76981cbcd1',
        accountName: 'Очень длинное имя счёта которе используется для того чтобы',
        accountNumber: '40702810500440170962',
        accountType: ACCOUNT_TYPE.CHECKING,
        branchName: 'Ф-Л БАНКА ГПБ (АО) В Г. ВЛАДИВОСТОКЕ',
        currencyData: { currencyName: 'Российский рубль', currencyCode: 'RUB' },
        ...COMMON_FIELDS,
      },
      {
        organizationName: 'ООО «Роза»',
        accountId: '9c608be3-630f-4277-bc12-5e76981cbcd1',
        accountName: 'Очень длинное имя счёта которе используется для того чтобы',
        accountNumber: '40702810500440170962',
        accountType: ACCOUNT_TYPE.CHECKING,
        branchName: 'Ф-Л БАНКА ГПБ (АО) В Г. ВЛАДИВОСТОКЕ',
        currencyData: { currencyName: 'Российский рубль', currencyCode: 'RUB' },
        ...COMMON_FIELDS,
      },
      {
        organizationName: 'ООО «Роза»',
        accountId: '9c608be3-630f-4277-bc12-5e76981cbcd1',
        accountName: 'Очень длинное имя счёта которе используется для того чтобы',
        accountNumber: '40702810500440170962',
        accountType: ACCOUNT_TYPE.CHECKING,
        branchName: 'Ф-Л БАНКА ГПБ (АО) В Г. ВЛАДИВОСТОКЕ',
        currencyData: { currencyName: 'Российский рубль', currencyCode: 'RUB' },
        ...COMMON_FIELDS,
      },
    ],
  },
];
