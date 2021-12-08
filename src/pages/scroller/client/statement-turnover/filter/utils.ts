import { DATE_PERIODS } from 'interfaces';
import { GROUPING_VALUES } from 'interfaces/client';
import { locale } from 'localization';
import { DATE_ISO_FORMAT } from 'stream-constants';
import { getYesterday } from 'utils';
import type { IFormState } from './interfaces';

/**
 * Возвращает локаль для, отображения информации по результатам группировки.
 *
 * @param grouping - Значения группировки выбранное в скроллере.
 */
export const getGroupingInfoLabel = (grouping: GROUPING_VALUES): string => {
  switch (grouping) {
    case GROUPING_VALUES.ORGANIZATIONS:
    case GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES:
      return locale.turnoverScroller.groupInfo.organizations;
    case GROUPING_VALUES.CURRENCIES:
      return locale.turnoverScroller.groupInfo.currencies;
    case GROUPING_VALUES.BRANCHES:
      return locale.turnoverScroller.groupInfo.branches;
    case GROUPING_VALUES.ACCOUNT_TYPE:
      return locale.turnoverScroller.groupInfo.accountType;
    case GROUPING_VALUES.NO_GROUPING:
    default:
      return locale.turnoverScroller.groupInfo.noGrouping;
  }
};

/** Возвращает начальный стейт формы. */
export const getInitialFilterValues = (): IFormState => {
  const yesterday = getYesterday().format(DATE_ISO_FORMAT);

  return {
    groupBy: GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES,
    onlyActiveAccounts: true,
    datePeriod: DATE_PERIODS.YESTERDAY,
    dateTo: yesterday,
    dateFrom: yesterday,
    accounts: [],
  };
};
