import React from 'react';
import type { BankAccountingEntryGroup } from 'interfaces/admin/dto/bank-accounting-entry-group';
import { locale } from 'localization';
import type { RecordCell } from 'platform-copies/services';
import type { Row } from 'react-table';
import { Box, Pattern, Typography } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента с аггрегирующими данными. */
interface AggregateByAccountDataProps {
  /** Строка с гррупой проводок. */
  row: Row<RecordCell>;
}

/** Комопонент с аггрегирующими данным для группы проводок. */
export const AggregateByAccountData: React.FC<AggregateByAccountDataProps> = ({ row: { original } }) => {
  const { aggregate } = original as BankAccountingEntryGroup;
  const { amountCredit, amountDebit, incomingCount, outgoingCount, account } = aggregate;
  const currencyCode = account?.currency?.letterCode ?? '';

  return (
    <Box className={css.container} fill="FAINT">
      <Pattern>
        <Pattern.Span size={3}>
          <Typography.Text className={css.item}>{locale.admin.entryScroller.aggregate.incomingBalance}</Typography.Text>
          <Typography.P>{locale.moneyString.unsigned({ amount: String(account.balance.incoming), currencyCode })}</Typography.P>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text className={css.item}>{locale.admin.entryScroller.aggregate.outcome({ count: outgoingCount })}</Typography.Text>
          <Typography.P fill="CRITIC">{locale.moneyString.negative({ amount: String(amountDebit), currencyCode })}</Typography.P>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text className={css.item}>{locale.admin.entryScroller.aggregate.income({ count: incomingCount })}</Typography.Text>
          <Typography.P fill="SUCCESS">{locale.moneyString.positive({ amount: String(amountCredit), currencyCode })}</Typography.P>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text className={css.item}>{locale.admin.entryScroller.aggregate.outgoingBalance}</Typography.Text>
          <Typography.P>{locale.moneyString.unsigned({ amount: String(account.balance.outgoing), currencyCode })}</Typography.P>
        </Pattern.Span>
      </Pattern>
    </Box>
  );
};

AggregateByAccountData.displayName = 'AggregateByAccountData';
