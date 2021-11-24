import React, { useMemo, useContext } from 'react';
import cn from 'classnames';
import type { IGroupedAccounts } from 'interfaces/client';
import { GROUPING_VALUES, GROUPING_TYPE } from 'interfaces/client';
import { locale } from 'localization';
import { useFormState } from 'react-final-form';
import { Typography, Gap, Box, Fields } from '@platform/ui';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { FORM_FIELDS, GROUPING_OPTIONS } from './constants';
import type { FormState } from './interfaces';
import css from './styles.scss';
import { getGroupingInfoLabel } from './utils';

/** Вычисляет сводную информацию о группировке. */
export const computeGroupingReport = (data: IGroupedAccounts[], grouping: GROUPING_VALUES): number => {
  if (data.length === 0) {
    return 0;
  }

  switch (grouping) {
    case GROUPING_VALUES.NO_GROUPING:
      return data[0]?.groupedAccounts?.length ?? 0;
    case GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES:
      return data.reduce((acc, item) => {
        if (item.groupInfo?.groupingType === GROUPING_TYPE.ORGANIZATIONS) {
          return acc + 1;
        }

        return acc;
      }, 0);
    default:
      return data.length;
  }
};

/** Панель выбора и отображения значения группировки записей в таблице скроллера. */
export const GroupingPanel = () => {
  const {
    turnovers: { accounts },
    isLoading,
  } = useContext(TurnoverScrollerContext);

  const {
    values: { groupBy },
  } = useFormState<FormState>();

  const groupingReport = useMemo(() => (isLoading ? '' : computeGroupingReport(accounts, groupBy)), [accounts, groupBy, isLoading]);

  return (
    <Box className={css.groupingPanelWrapper}>
      <Box className={cn(css.important, css.groupingLeftColumn)}>
        {/* Результаты группировки. */}
        <Typography.TextBold>{getGroupingInfoLabel(groupBy)}</Typography.TextBold>
        <Gap.SM />
        <Typography.Text>{groupingReport}</Typography.Text>
      </Box>
      <Box className={cn(css.important, css.groupingRightColumn)}>
        {/* Выбор фильтрации по типу активности счёта. */}
        <Fields.Checkbox
          extraSmall
          label={locale.turnoverScroller.filter.labels.onlyActiveAccounts}
          name={FORM_FIELDS.ONLY_ACTIVE_ACCOUNTS}
        />
        <Gap.XL />
        <Box>
          {/* Выбор группировки. */}
          {/* TODO: Переделать по макету. Там не обычный селект. */}
          <Fields.Select extraSmall name={FORM_FIELDS.GROUP_BY} options={GROUPING_OPTIONS} />
        </Box>
      </Box>
    </Box>
  );
};

GroupingPanel.displayName = 'GroupingPanel';
