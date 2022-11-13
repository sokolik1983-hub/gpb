import type { FC } from 'react';
import React, { useContext } from 'react';
import { CounterpartyField, FilterFormElement } from 'components/common';
import { DateRange } from 'components/common/form/date-range';
import { locale } from 'localization';
import { Pattern, Fields } from '@platform/ui';
import type { ITransactionScrollerContext } from '../transaction-scroller-context';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import { FORM_FIELDS, TRANSACTION_TYPE_OPTIONS } from './constants';
import css from './styles.scss';

/** Дополнительные фильтры. */
export const AdditionalFilter: FC = () => {
  const { counterparties } = useContext<ITransactionScrollerContext>(TransactionScrollerContext);

  return (
    <Pattern gap={'XL'}>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.docNumber}>
          {/* Номер документа. */}
          <Fields.Number extraSmall name={FORM_FIELDS.DOC_NUMBER} />
        </FilterFormElement>
      </Pattern.Span>

      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.paymentDate} labelWidth={150}>
          <DateRange name={[FORM_FIELDS.PAYMENT_DATE_FROM, FORM_FIELDS.PAYMENT_DATE_TO]} />
        </FilterFormElement>
      </Pattern.Span>

      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.transactionType}>
          {/** Тип операции. */}
          <Fields.Select extraSmall name={FORM_FIELDS.TRANSACTION_TYPE} options={TRANSACTION_TYPE_OPTIONS} />
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
    </Pattern>
  );
};

AdditionalFilter.displayName = 'AdditionalFilter';
