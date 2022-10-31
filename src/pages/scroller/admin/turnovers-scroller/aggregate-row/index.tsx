import React from 'react';
import type { ITurnoverMockDto } from 'interfaces/admin/dto/turnover-mock-dto';
import { locale } from 'localization';
import type { IExpandedRowComponentProps } from 'platform-copies/services';
import { Box, Pattern, Typography } from '@platform/ui';
import css from './styles.scss';

/** Строка с агррегирующей информацей по записи остатков и оборотов. */
export const AggregateRow: React.FC<IExpandedRowComponentProps<ITurnoverMockDto>> = ({
  row: {
    account: {
      currency: { letterCode },
    },
    incomingBalance,
    outgoingBalance,
    turnoverDebit,
    turnoverCredit,
  },
}) => (
  <Box className={css.container} fill="FAINT">
    <Pattern>
      <Pattern.Span size={3}>
        <Typography.Text className={css.item}>{locale.admin.turnoverScroller.aggregateRow.incomingBalance}</Typography.Text>
        <Typography.P>{locale.moneyString.unsigned({ amount: String(incomingBalance), currencyCode: letterCode })}</Typography.P>
      </Pattern.Span>
      <Pattern.Span size={3}>
        <Typography.Text className={css.item}>{locale.admin.turnoverScroller.aggregateRow.turnoverDebit}</Typography.Text>
        <Typography.P fill="CRITIC">
          {locale.moneyString.negative({ amount: String(turnoverDebit), currencyCode: letterCode })}
        </Typography.P>
      </Pattern.Span>
      <Pattern.Span size={3}>
        <Typography.Text className={css.item}>{locale.admin.turnoverScroller.aggregateRow.turnoverCredit}</Typography.Text>
        <Typography.P fill="SUCCESS">
          {locale.moneyString.positive({ amount: String(turnoverCredit), currencyCode: letterCode })}
        </Typography.P>
      </Pattern.Span>
      <Pattern.Span size={3}>
        <Typography.Text className={css.item}>{locale.admin.turnoverScroller.aggregateRow.outgoingBalance}</Typography.Text>
        <Typography.P>{locale.moneyString.unsigned({ amount: String(outgoingBalance), currencyCode: letterCode })}</Typography.P>
      </Pattern.Span>
    </Pattern>
  </Box>
);

AggregateRow.displayName = 'AggregateRow';
