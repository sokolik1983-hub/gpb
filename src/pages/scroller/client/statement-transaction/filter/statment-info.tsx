import type { FC } from 'react';
import React, { useContext } from 'react';
import { locale } from 'localization';
import { formatAccountCode } from '@platform/tools/localization';
import { Box, Pattern, Typography, Gap } from '@platform/ui';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import css from './styles.scss';

/** Общая информация по выписке. */
export const StatementInfo: FC = () => {
  const { statement } = useContext(TransactionScrollerContext);

  if (!statement) {
    return null;
  }

  const {
    accountNumber,
    organizationName,
    incomingBalance,
    outcome,
    outcomeTransactions,
    incomeTransactions,
    outgoingBalance,
    currencyCode,
  } = statement;

  return (
    <Box className={css.statementInfoWrapper}>
      <Gap />
      <Pattern gap={'X2L'}>
        <Pattern.Span size={3}>
          <Typography.Text fill={'FAINT'}>{locale.transactionsScroller.labels.accountNumber}</Typography.Text>
          <Typography.Text>{formatAccountCode(accountNumber)}</Typography.Text>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text fill={'FAINT'}>{locale.transactionsScroller.labels.organizationName}</Typography.Text>
          <Typography.Text>{organizationName}</Typography.Text>
        </Pattern.Span>
      </Pattern>
      <Gap />
      <Pattern gap={'X2L'}>
        <Pattern.Span size={3}>
          <Typography.Text fill={'FAINT'}>{locale.transactionsScroller.labels.incomingBalance}</Typography.Text>
          <Typography.Text>{locale.moneyString.unsigned({ amount: String(incomingBalance), currencyCode })}</Typography.Text>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text fill={'FAINT'}>
            {locale.transactionsScroller.labels.outcomeTransactions({ amount: outcomeTransactions })}
          </Typography.Text>
          <Typography.Text fill={'CRITIC'}>{locale.moneyString.negative({ amount: String(outcome), currencyCode })}</Typography.Text>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text fill={'FAINT'}>
            {locale.transactionsScroller.labels.incomeTransactions({ amount: incomeTransactions })}
          </Typography.Text>
          <Typography.Text fill={'SUCCESS'}>{locale.moneyString.positive({ amount: String(outcome), currencyCode })}</Typography.Text>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text fill={'FAINT'}>{locale.transactionsScroller.labels.outgoingBalance}</Typography.Text>
          <Typography.Text>{locale.moneyString.unsigned({ amount: String(outgoingBalance), currencyCode })}</Typography.Text>
        </Pattern.Span>
      </Pattern>
      <Gap.XL />
    </Box>
  );
};

StatementInfo.displayName = 'StatementInfo';
