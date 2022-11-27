import type { FC } from 'react';
import React from 'react';
import { FilterFormElement } from 'components/common';
import { DateRange } from 'components/common/form/date-range';
import { locale } from 'localization';
import { Pattern, Fields } from '@platform/ui';
import { AccountNumberFilter } from './account-number-filter';
import { FORM_FIELDS, TRANSACTION_TYPE_OPTIONS } from './constants';
import { OrganizationFilter } from './organization-fliter';

/** Дополнительные фильтры. */
export const AdditionalFilter: FC = () => (
  <>
    <Pattern gap={'XL'}>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.docNumber} labelWidth={162}>
          {/* Номер документа. */}
          <Fields.Number extraSmall name={FORM_FIELDS.DOC_NUMBER} />
        </FilterFormElement>
      </Pattern.Span>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.transactionDate} labelWidth={162}>
          {/* Дата проводки. */}
          <DateRange name={[FORM_FIELDS.PAYMENT_DATE_FROM, FORM_FIELDS.PAYMENT_DATE_TO]} />
        </FilterFormElement>
      </Pattern.Span>
    </Pattern>

    <Pattern gap={'XL'}>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.client} labelWidth={162}>
          {/** Клиент. */}
          <OrganizationFilter name={FORM_FIELDS.CLIENT} placeholder={''} />
        </FilterFormElement>
      </Pattern.Span>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.clientAccountNumber} labelWidth={162}>
          {/** Счёт клиента. */}
          <AccountNumberFilter name={FORM_FIELDS.CLIENT_ACCOUNT} placeholder={''} />
        </FilterFormElement>
      </Pattern.Span>
    </Pattern>

    <Pattern gap={'XL'}>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.counterparty} labelWidth={162}>
          {/** Контрагент. */}
          <OrganizationFilter name={FORM_FIELDS.COUNTERPARTY} placeholder={''} />
        </FilterFormElement>
      </Pattern.Span>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.counterpartyAccountNumber} labelWidth={162}>
          {/** Счёт контрагента. */}
          <AccountNumberFilter name={FORM_FIELDS.COUNTERPARTY_ACCOUNT} placeholder={''} />
        </FilterFormElement>
      </Pattern.Span>
    </Pattern>

    <Pattern gap={'XL'}>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.transactionType} labelWidth={162}>
          {/** Тип операции. */}
          <Fields.Select extraSmall name={FORM_FIELDS.TRANSACTION_TYPE} options={TRANSACTION_TYPE_OPTIONS} />
        </FilterFormElement>
      </Pattern.Span>
    </Pattern>
  </>
);

AdditionalFilter.displayName = 'AdditionalFilter';
