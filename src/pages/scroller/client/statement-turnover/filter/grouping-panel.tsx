import React, { useMemo, useContext } from 'react';
import cn from 'classnames';
import type { IGroupedAccounts } from 'interfaces/dto';
import { GROUPING_VALUES, GROUPING_TYPE } from 'interfaces/dto';
import { Typography, Gap, Box, Fields } from '@platform/ui';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { FORM_FIELDS, GROUPING_OPTIONS } from './constants';
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
    groupByForRender,
  } = useContext(TurnoverScrollerContext);

  const groupingReport = useMemo(() => computeGroupingReport(accounts, groupByForRender), [accounts, groupByForRender]);

  return accounts.length > 0 ? (
    <Box className={css.groupingPanelWrapper}>
      <Box className={cn(css.important, css.groupingLeftColumn)}>
        {/* Результаты группировки. */}
        <Typography.TextBold>{getGroupingInfoLabel(groupByForRender)}</Typography.TextBold>
        <Gap.SM />
        <Typography.Text>{groupingReport}</Typography.Text>
      </Box>
      <Box className={cn(css.important, css.groupingRightColumn)}>
        <Gap.XL />
        <Box>
          {/* Выбор группировки. */}
          {/* TODO: Переделать по макету. Там не обычный селект. */}
          <Box className={css.groupingFieldWrapper}>
            <Fields.Select extraSmall className={css.groupingField} name={FORM_FIELDS.GROUP_BY} options={GROUPING_OPTIONS} />
          </Box>
        </Box>
      </Box>
    </Box>
  ) : null;
};

GroupingPanel.displayName = 'GroupingPanel';
