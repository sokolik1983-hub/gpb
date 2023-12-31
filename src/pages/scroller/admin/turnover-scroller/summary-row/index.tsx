import React from 'react';
import type { TurnoverCard } from 'interfaces/admin/dto/turnover';
import { locale } from 'localization';
import type { IExpandedRowComponentProps } from 'platform-copies/services';
import { RUB_CURRENCY } from 'stream-constants';
import { Box, Pattern, Typography } from '@platform/ui';
import css from './styles.scss';

/** Строка с агррегирующей информацей по записи остатков и оборотов. */
export const SummaryRow: React.FC<IExpandedRowComponentProps<TurnoverCard>> = ({
  row: {
    incomingBalance,
    outgoingBalance,
    turnoverByCredit,
    turnoverByDebit,
    incomingBalanceInNationalCurrency,
    outgoingBalanceInNationalCurrency,
    turnoverByCreditInNationalCurrency,
    turnoverByDebitInNationalCurrency,
    account: {
      currency: { letterCode: currencyCode },
    },
  },
}) => (
  <Box className={css.container} fill="FAINT">
    <Pattern>
      <Pattern.Span size={2}>
        <Typography.Text className={css.item}>{locale.admin.turnoverScroller.aggregateRow.incomingBalance}</Typography.Text>
        <Typography.P>
          {locale.moneyString.unsigned({
            amount: String(incomingBalance),
            currencyCode,
          })}
        </Typography.P>
        {currencyCode !== RUB_CURRENCY && (
          <Typography.P className={css.unsigned}>
            {locale.moneyString.unsigned({ amount: String(incomingBalanceInNationalCurrency), currencyCode: RUB_CURRENCY })}
          </Typography.P>
        )}
      </Pattern.Span>
      <Pattern.Span size={2}>
        <Typography.Text className={css.item}>{locale.admin.turnoverScroller.aggregateRow.turnoverDebit}</Typography.Text>
        <Typography.P fill="CRITIC">{locale.moneyString.negative({ amount: String(turnoverByDebit), currencyCode })}</Typography.P>
        {currencyCode !== RUB_CURRENCY && (
          <Typography.P className={css.negative} fill="CRITIC">
            {locale.moneyString.negative({
              amount: String(turnoverByDebitInNationalCurrency),
              currencyCode: RUB_CURRENCY,
            })}
          </Typography.P>
        )}
      </Pattern.Span>
      <Pattern.Span size={2}>
        <Typography.Text className={css.item}>{locale.admin.turnoverScroller.aggregateRow.turnoverCredit}</Typography.Text>
        <Typography.P fill="SUCCESS">{locale.moneyString.positive({ amount: String(turnoverByCredit), currencyCode })}</Typography.P>
        {currencyCode !== RUB_CURRENCY && (
          <Typography.P className={css.positive} fill="SUCCESS">
            {locale.moneyString.positive({ amount: String(turnoverByCreditInNationalCurrency), currencyCode: RUB_CURRENCY })}
          </Typography.P>
        )}
      </Pattern.Span>
      <Pattern.Span size={2}>
        <Typography.Text className={css.item}>{locale.admin.turnoverScroller.aggregateRow.outgoingBalance}</Typography.Text>
        <Typography.P>
          {locale.moneyString.unsigned({
            amount: String(outgoingBalance),
            currencyCode,
          })}
        </Typography.P>
        {currencyCode !== RUB_CURRENCY && (
          <Typography.P className={css.unsigned}>
            {locale.moneyString.unsigned({ amount: String(outgoingBalanceInNationalCurrency), currencyCode: RUB_CURRENCY })}
          </Typography.P>
        )}
      </Pattern.Span>
    </Pattern>
  </Box>
);

SummaryRow.displayName = 'SummaryRow';
