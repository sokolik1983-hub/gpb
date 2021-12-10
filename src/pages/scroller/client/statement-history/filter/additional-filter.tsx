import type { FC } from 'react';
import React from 'react';
import { FilterFormElement } from 'components';
import { locale } from 'localization';
import { Pattern, Fields } from '@platform/ui';
import { DATE_PERIOD_OPTIONS, FORM_FIELDS, STATUS_OPTIONS } from './constants';

/** Дополнительные фильтры. */
export const AdditionalFilter: FC = () => (
  <>
    <Pattern gap={'XL'}>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.historyScroller.filter.labels.datePeriod}>
          {/* Выбор периода. */}
          <Fields.Select extraSmall name={FORM_FIELDS.PERIOD_TYPE} options={DATE_PERIOD_OPTIONS} />
        </FilterFormElement>
      </Pattern.Span>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.historyScroller.filter.labels.signaturePresence}>
          {/* Выбор статуса. */}
          <Fields.Checkbox extraSmall name={FORM_FIELDS.SIGNED} />
        </FilterFormElement>
      </Pattern.Span>
    </Pattern>

    <Pattern gap={'XL'}>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.historyScroller.filter.labels.status}>
          {/* Выбор статуса. */}
          <Fields.Select extraSmall name={FORM_FIELDS.STATUS} options={STATUS_OPTIONS} />
        </FilterFormElement>
      </Pattern.Span>
    </Pattern>
  </>
);

AdditionalFilter.displayName = 'AdditionalFilter';
