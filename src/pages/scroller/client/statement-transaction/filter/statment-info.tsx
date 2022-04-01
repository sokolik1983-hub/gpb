import type { FC } from 'react';
import React, { useContext } from 'react';
import { locale } from 'localization';
import { formatAccountCode } from '@platform/tools/localization';
import { Box, Pattern, Typography, Gap } from '@platform/ui';
import type { ITransactionScrollerContext } from '../transaction-scroller-context';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import css from './styles.scss';

/** Общая информация по выписке. */
export const StatementInfo: FC = () => {
  const { statementSummaryInfo } = useContext<ITransactionScrollerContext>(TransactionScrollerContext);

  if (!statementSummaryInfo) {
    return null;
  }

  const {
    accountNumber,
    organizationName,
    incomingBalance,
    outcome,
    income,
    outcomeAccountEntryCount,
    incomeAccountEntryCount,
    outgoingBalance,
    currencyCode,
  } = statementSummaryInfo;

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
          <Typography.Text data-field={'statementSummaryInfo.incomingBalance'}>
            {locale.moneyString.unsigned({ amount: String(incomingBalance), currencyCode })}
          </Typography.Text>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text data-field={'statementSummaryInfo.outcomeAccountEntryCount'} fill={'FAINT'}>
            {locale.transactionsScroller.labels.outcomeTransactions({ amount: outcomeAccountEntryCount })}
          </Typography.Text>
          <Typography.Text data-field={'statementSummaryInfo.outcome'} fill={'CRITIC'}>
            {locale.moneyString.negative({ amount: String(outcome), currencyCode })}
          </Typography.Text>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text data-field={'statementSummaryInfo.incomeAccountEntryCount'} fill={'FAINT'}>
            {locale.transactionsScroller.labels.incomeTransactions({ amount: incomeAccountEntryCount })}
          </Typography.Text>
          <Typography.Text data-field={'statementSummaryInfo.income'} fill={'SUCCESS'}>
            {locale.moneyString.positive({ amount: String(income), currencyCode })}
          </Typography.Text>
        </Pattern.Span>
        <Pattern.Span size={3}>
          <Typography.Text fill={'FAINT'}>{locale.transactionsScroller.labels.outgoingBalance}</Typography.Text>
          <Typography.Text data-field={'statementSummaryInfo.outgoingBalance'}>
            {locale.moneyString.unsigned({ amount: String(outgoingBalance), currencyCode })}
          </Typography.Text>
        </Pattern.Span>
      </Pattern>
      <Gap.XL />
    </Box>
  );
};

StatementInfo.displayName = 'StatementInfo';
