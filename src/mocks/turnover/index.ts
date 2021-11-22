/* eslint-disable sonarjs/no-all-duplicated-branches,default-case */
import { GROUPING_VALUES } from 'interfaces/client';
import { byAccountTypes } from 'mocks/turnover/by-account-types';
import { byBranches } from './by-branches';
import { byCurrencies } from './by-currensies';
import { byOrgs } from './by-orgs';
import { byOrgsAndCurrencies } from './by-orgs-and-currensies';
import { noGruping } from './no-gruping';

// Заглушка
export const getMockedDataByGrouping = (grouping: GROUPING_VALUES) => {
  switch (grouping) {
    case GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES:
      return byOrgsAndCurrencies;
    case GROUPING_VALUES.CURRENCIES:
      return byCurrencies;
    case GROUPING_VALUES.ORGANIZATIONS:
      return byOrgs;
    case GROUPING_VALUES.NO_GROUPING:
      return noGruping;
    case GROUPING_VALUES.BRANCHES:
      return byBranches;
    case GROUPING_VALUES.ACCOUNT_TYPE:
      return byAccountTypes;
    default:
      return byAccountTypes;
  }
};
