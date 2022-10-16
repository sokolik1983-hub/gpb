import type { FC } from 'react';
import React, { useContext } from 'react';
import { FilterFormElement, MultiselectWithOptionAllField } from 'components/common';
import { locale } from 'localization';
import { StatementHistoryScrollerContext } from 'pages/scroller/admin/statement-history/context';
import { DATE_PERIOD_OPTIONS } from 'stream-constants';
import { Pattern, Fields } from '@platform/ui';
import { FORM_FIELDS, REQUEST_STATUS_OPTIONS, STATEMENT_STATUS_OPTIONS, STATEMENT_TYPE_OPTIONS } from './constants';

/** Дополнительный фильтр, который виден при раскрытии формы. */
export const AdditionalFilter: FC = () => {
  const { organizations, serviceBranch, users } = useContext(StatementHistoryScrollerContext);

  return (
    <>
      <Pattern gap={'XL'}>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.organization}>
            <Fields.MultiSelect extraSmall withSearch name={FORM_FIELDS.ORGANIZATION_IDS} options={organizations} />
          </FilterFormElement>
        </Pattern.Span>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.period}>
            <Fields.MultiSelect extraSmall name={FORM_FIELDS.PERIOD} options={DATE_PERIOD_OPTIONS} />
          </FilterFormElement>
        </Pattern.Span>
      </Pattern>

      <Pattern gap={'XL'}>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.requestStatus}>
            <MultiselectWithOptionAllField name={FORM_FIELDS.REQUEST_STATUS} options={REQUEST_STATUS_OPTIONS} />
          </FilterFormElement>
        </Pattern.Span>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.signaturePresence}>
            <Fields.Checkbox name={FORM_FIELDS.SIGNED} />
          </FilterFormElement>
        </Pattern.Span>
      </Pattern>

      <Pattern gap={'XL'}>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.statementStatus}>
            <MultiselectWithOptionAllField name={FORM_FIELDS.STATEMENT_STATUS} options={STATEMENT_STATUS_OPTIONS} />
          </FilterFormElement>
        </Pattern.Span>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.statementType}>
            <Fields.Select extraSmall name={FORM_FIELDS.STATEMENT} options={STATEMENT_TYPE_OPTIONS} />
          </FilterFormElement>
        </Pattern.Span>
      </Pattern>

      <Pattern gap={'XL'}>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.user}>
            <Fields.MultiSelect extraSmall name={FORM_FIELDS.USER_IDS} options={users} />
          </FilterFormElement>
        </Pattern.Span>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.admin.historyScroller.filter.labels.serviceBranch}>
            <Fields.MultiSelect extraSmall name={FORM_FIELDS.SERVICE_BRANCH_IDS} options={serviceBranch} />
          </FilterFormElement>
        </Pattern.Span>
      </Pattern>
    </>
  );
};

AdditionalFilter.displayName = 'AdditionalFilter';
