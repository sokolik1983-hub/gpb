import { GROUPING_VALUES, DATE_PERIODS } from 'interfaces/client';
import { locale } from 'localization';
import { getYesterday } from 'utils';
import type { IOption } from '@platform/ui';
import { TAGS_ORDER } from './constants';
import type { FormState } from './interfaces';

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

/**
 * Фильтрует теги формы фильтрации.
 *
 * @param tags - Тэги для фильтрации.
 */
export const filerTags = (tags: Array<IOption<string>>): Array<IOption<string>> => tags.filter(tag => tag.label);

/**
 * Упорядочивает тети формы фильтрации (в частности чтобы тэг "дата по" не располагался перед тегом "дата от").
 *
 * @param tags - Тэги которые надо упорядочить.
 */
export const orderTags = (tags: Array<IOption<string>>): Array<IOption<string>> => {
  const tagsByTagValue = tags.reduce<Record<string, IOption<string>>>((acc, tag) => {
    acc[tag.value] = tag;

    return acc;
  }, {});

  const orderedTags: Array<IOption<string>> = [];

  TAGS_ORDER.forEach(tagValue => {
    if (tagsByTagValue[tagValue]) {
      orderedTags.push(tagsByTagValue[tagValue]);
    }
  });

  return orderedTags;
};

/** Возвращает начальный стейт формы. */
export const getInitialFilterValues = (): FormState => {
  const yesterday = getYesterday().format();

  return {
    grouping: GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES,
    onlyActiveAccounts: true,
    datePeriod: DATE_PERIODS.YESTERDAY,
    dateTo: yesterday,
    dateFrom: yesterday,
    organizations: [],
    accounts: [],
  };
};
