import { GROUPING_VALUES } from 'interfaces/dto';
import { ViewByNoGroup } from './view-by-no-group';
import { ViewByOrgAndCurrency } from './view-by-org-and-currency';
import { ViewWithTwoLevels } from './view-with-two-levels';

/**
 * Компоненты просмотра таблицы, исходя из группировки.
 */
export const ScrollerViews = {
  [GROUPING_VALUES.NO_GROUPING]: ViewByNoGroup,
  [GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES]: ViewByOrgAndCurrency,
  [GROUPING_VALUES.ORGANIZATIONS]: ViewWithTwoLevels,
  [GROUPING_VALUES.CURRENCIES]: ViewWithTwoLevels,
  [GROUPING_VALUES.BRANCHES]: ViewWithTwoLevels,
  [GROUPING_VALUES.ACCOUNT_TYPE]: ViewWithTwoLevels,
};
