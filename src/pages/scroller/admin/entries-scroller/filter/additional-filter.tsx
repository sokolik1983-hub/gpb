import type { FC } from 'react';
import React, { useContext } from 'react';
import { FilterFormElement, InputWithHistory } from 'components/common';
import { DateRange } from 'components/common/form/date-range';
import { locale } from 'localization';
import { Pattern, Fields } from '@platform/ui';
import { FORM_FIELDS, TRANSACTION_TYPE_OPTIONS } from './constants';
import { CounterpartyField } from './counterparty-field';
import type { IFilterContext } from './filter-context';
import { FilterContext } from './filter-context';
import css from './styles.scss';

/** Дополнительные фильтры. */
export const AdditionalFilter: FC = () => {
  const { counterparties, counterpartiesAccounts, clients, clientsAccounts } = useContext<IFilterContext>(FilterContext);

  return (
    <Pattern gap={'XL'}>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.docNumber}>
          {/* Номер документа. */}
          <Fields.Number extraSmall name={FORM_FIELDS.DOC_NUMBER} />
        </FilterFormElement>
      </Pattern.Span>

      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.transactionDate} labelWidth={150}>
          <DateRange name={[FORM_FIELDS.PAYMENT_DATE_FROM, FORM_FIELDS.PAYMENT_DATE_TO]} />
        </FilterFormElement>
      </Pattern.Span>

      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.client} labelWidth={150}>
          {/** Клиент. */}
          <div className={css.counterpartyField}>
            <CounterpartyField counterparties={clients} name={FORM_FIELDS.CLIENT} />
          </div>
        </FilterFormElement>
      </Pattern.Span>

      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.client} labelWidth={150}>
          {/** Счёт клиента. */}
          <div className={css.counterpartyField}>
            <InputWithHistory
              name={FORM_FIELDS.CLIENT_ACCOUNT}
              options={clientsAccounts.map(account => ({ label: account, value: account }))}
            />
          </div>
        </FilterFormElement>
      </Pattern.Span>

      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.counterpartyAccountNumber} labelWidth={150}>
          {/** Счёт контрагента. */}
          <div className={css.counterpartyField}>
            <InputWithHistory
              name={FORM_FIELDS.COUNTERPARTY_ACCOUNT}
              options={counterpartiesAccounts.map(account => ({ label: account, value: account }))}
            />
          </div>
        </FilterFormElement>
      </Pattern.Span>

      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.counterparty} labelWidth={150}>
          {/** Контрагент. */}
          <div className={css.counterpartyField}>
            <CounterpartyField counterparties={counterparties} name={FORM_FIELDS.COUNTERPARTY} />
          </div>
        </FilterFormElement>
      </Pattern.Span>

      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.transactionType}>
          {/** Тип операции. */}
          <Fields.Select extraSmall name={FORM_FIELDS.TRANSACTION_TYPE} options={TRANSACTION_TYPE_OPTIONS} />
        </FilterFormElement>
      </Pattern.Span>
    </Pattern>
  );
};

AdditionalFilter.displayName = 'AdditionalFilter';
