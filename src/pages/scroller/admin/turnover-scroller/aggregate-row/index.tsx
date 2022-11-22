import React from 'react';
import type { TurnoverCard } from 'interfaces/admin/dto/turnover';
import { locale } from 'localization';
import type { IExpandedRowComponentProps } from 'platform-copies/services';
import { RUB_CURRENCY } from 'stream-constants';
import { Box, Pattern, Typography } from '@platform/ui';
import css from './styles.scss';

/** Строка с агррегирующей информацей по записи остатков и оборотов. */
export const AggregateRow: React.FC<IExpandedRowComponentProps<TurnoverCard>> = ({
  row: {
    incomingBalance,
    outgoingBalance,
    turnoverByCredit,
    turnoverByDebit,
    incomingBalanceInNationalCurrency,
    outgoingBalanceInNationalCurrency,
    turnoverByCreditInNationalCurrency,
    turnoverByDebitInNationalCurrency,
    account,
  },
}) => {
  const currencyCode = account?.currency?.letterCode ?? RUB_CURRENCY;

  return (
    <Box className={css.container} fill="FAINT">
      <Pattern>
        <Pattern.Span size={3}>
          <Typography.Text className={css.item}>{locale.admin.turnoverScroller.aggregateRow.incomingBalance}</Typography.Text>
          <Typography.P>
            {locale.moneyString.unsigned({
              amount: String(incomingBalance),
              currencyCode,
            })}
          </Typography.P>
          <Typography.P className={css.unsigned}>
            {locale.moneyString.unsigned({ amount: String(incomingBalanceInNationalCurrency), currencyCode: RUB_CURRENCY })}
          </Typography.P>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text className={css.item}>{locale.admin.turnoverScroller.aggregateRow.turnoverDebit}</Typography.Text>
          <Typography.P fill="CRITIC">{locale.moneyString.negative({ amount: String(turnoverByCredit), currencyCode })}</Typography.P>
          <Typography.P className={css.negative} fill="CRITIC">
            {locale.moneyString.negative({
              amount: String(turnoverByCreditInNationalCurrency),
              currencyCode: RUB_CURRENCY,
            })}
          </Typography.P>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text className={css.item}>{locale.admin.turnoverScroller.aggregateRow.turnoverCredit}</Typography.Text>
          <Typography.P fill="SUCCESS">{locale.moneyString.positive({ amount: String(turnoverByDebit), currencyCode })}</Typography.P>
          <Typography.P className={css.positive} fill="SUCCESS">
            {locale.moneyString.positive({ amount: String(turnoverByDebitInNationalCurrency), currencyCode: RUB_CURRENCY })}
          </Typography.P>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text className={css.item}>{locale.admin.turnoverScroller.aggregateRow.outgoingBalance}</Typography.Text>
          <Typography.P>
            {locale.moneyString.unsigned({
              amount: String(outgoingBalance),
              currencyCode,
            })}
          </Typography.P>
          <Typography.P className={css.unsigned}>
            {locale.moneyString.unsigned({ amount: String(outgoingBalanceInNationalCurrency), currencyCode: RUB_CURRENCY })}
          </Typography.P>
        </Pattern.Span>
      </Pattern>
    </Box>
  );
};

AggregateRow.displayName = 'AggregateRow';
