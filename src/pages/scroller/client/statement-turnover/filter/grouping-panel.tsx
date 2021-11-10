import React from 'react';
import cn from 'classnames';
import { locale } from 'localization';
import { useFormState } from 'react-final-form';
import { Typography, Gap, Box, Fields } from '@platform/ui';
import { FORM_FIELDS, GROUPING_OPTIONS } from './constants';
import type { FormState } from './interfaces';
import css from './styles.scss';
import { getGroupingInfoLabel } from './utils';

/** Панель выбора и отображения значения группировки записей в таблице скроллера. */
export const GroupingPanel = () => {
  const {
    values: { grouping },
  } = useFormState<FormState>();

  return (
    <Box className={css.groupingPanelWrapper}>
      <Box className={cn(css.important, css.groupingLeftColumn)}>
        {/* Результаты группировки. */}
        <Typography.TextBold>{getGroupingInfoLabel(grouping)}</Typography.TextBold>
        <Gap.SM />
        <Typography.Text>{/* TODO: реализовать вычисление значения когда будет делаться таблица скроллера. */}</Typography.Text>
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
