import type { FC } from 'react';
import React, { useContext } from 'react';
import { FilterFormElement } from 'components';
import { useDateRangeRestriction } from 'hooks';
import { locale } from 'localization';
import { useFormState } from 'react-final-form';
import { Pattern, Fields, Horizon, Box, Typography, Gap } from '@platform/ui';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import { FORM_FIELDS, TRANSACTION_TYPE_OPTIONS } from './constants';
import { CounterpartyField } from './counterparty-field';
import type { IFormState } from './interfaces';
import css from './styles.scss';

/** Дополнительные фильтры. */
export const AdditionalFilter: FC = () => {
  const { values } = useFormState<IFormState>();

  const { paymentDateFrom, paymentDateTo } = values;

  const { counterparties } = useContext(TransactionScrollerContext);

  useDateRangeRestriction({
    dateFromName: FORM_FIELDS.PAYMENT_DATE_FROM,
    dateToName: FORM_FIELDS.PAYMENT_DATE_TO,
    dateFrom: paymentDateFrom,
    dateTo: paymentDateTo,
  });

  return (
    <Pattern gap={'XL'}>
      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.docNumber}>
          {/* Выбор периода. */}
          <Fields.Text extraSmall name={FORM_FIELDS.DOC_NUMBER} />
        </FilterFormElement>
      </Pattern.Span>

      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.paymentDate}>
          <Horizon>
            <Box className={css.fieldWrapper}>
              {/* Дата платежа с. */}
              <Fields.Date extraSmall name={FORM_FIELDS.PAYMENT_DATE_FROM} placeholder={locale.form.placeholder.date} />
            </Box>
            <Gap.X2S />
            <Typography.Text>–</Typography.Text>
            <Gap.X2S />
            <Box className={css.fieldWrapper}>
              {/* Дата платежа по. */}
              <Fields.Date extraSmall name={FORM_FIELDS.PAYMENT_DATE_TO} placeholder={locale.form.placeholder.date} />
            </Box>
          </Horizon>
        </FilterFormElement>
      </Pattern.Span>

      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.transactionType}>
          {/** Тип операции. */}
          <Fields.Select extraSmall name={FORM_FIELDS.TRANSACTION_TYPE} options={TRANSACTION_TYPE_OPTIONS} />
        </FilterFormElement>
      </Pattern.Span>

      <Pattern.Span size={6}>
        <FilterFormElement label={locale.transactionsScroller.labels.counterparty}>
          {/** Контрагент. */}
          <CounterpartyField counterparties={counterparties} name={FORM_FIELDS.COUNTERPARTY} />
        </FilterFormElement>
      </Pattern.Span>
    </Pattern>
  );
};

AdditionalFilter.displayName = 'AdditionalFilter';
