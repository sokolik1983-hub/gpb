import type { FC } from 'react';
import React, { useContext } from 'react';
import { FilterFormElement } from 'components/common';
import { DateRange } from 'components/common/form/date-range';
import { locale } from 'localization';
import { Pattern, Fields } from '@platform/ui';
import { FORM_FIELDS, TRANSACTION_TYPE_OPTIONS } from './constants';
import { CounterpartyField } from './counterparty-field';
import type { IFilterContext } from './filter-context';
import { FilterContext } from './filter-context';

/** Дополнительные фильтры. */
export const AdditionalFilter: FC = () => {
  const { counterparties, counterpartiesAccounts, clients, clientsAccounts } = useContext<IFilterContext>(FilterContext);

  return (
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
            <CounterpartyField counterparties={clients} name={FORM_FIELDS.CLIENT} />
          </FilterFormElement>
        </Pattern.Span>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.transactionsScroller.labels.clientAccountNumber} labelWidth={162}>
            {/** Счёт клиента. */}
            <Fields.MultiSelect
              extraSmall
              withSearch
              name={FORM_FIELDS.CLIENT_ACCOUNT}
              options={clientsAccounts.map(account => ({ label: account, value: account }))}
            />
          </FilterFormElement>
        </Pattern.Span>
      </Pattern>

      <Pattern gap={'XL'}>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.transactionsScroller.labels.counterparty} labelWidth={162}>
            {/** Контрагент. */}
            <CounterpartyField counterparties={counterparties} name={FORM_FIELDS.COUNTERPARTY} />
          </FilterFormElement>
        </Pattern.Span>
        <Pattern.Span size={6}>
          <FilterFormElement label={locale.transactionsScroller.labels.counterpartyAccountNumber} labelWidth={162}>
            {/** Счёт контрагента. */}
            <Fields.MultiSelect
              extraSmall
              withSearch
              name={FORM_FIELDS.COUNTERPARTY_ACCOUNT}
              options={counterpartiesAccounts.map(account => ({ label: account, value: account }))}
            />
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
};

AdditionalFilter.displayName = 'AdditionalFilter';
