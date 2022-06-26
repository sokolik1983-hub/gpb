import type { FC } from 'react';
import React, { useContext } from 'react';
import { locale } from 'localization';
import { formatAccountCode } from '@platform/tools/localization';
import { Box, Pattern, Typography, Gap, WithInfoTooltip } from '@platform/ui';
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
    outcomesCount,
    incomesCount,
    outgoingBalance,
    currencyCode,
  } = statementSummaryInfo;

  return (
    <Box className={css.statementInfoWrapper}>
      <Gap.SM />
      <Pattern gap={'X2L'}>
        <Pattern.Span size={4}>
          <Typography.Text className={css.titleStatementInfoItem}>{locale.transactionsScroller.labels.accountNumber}</Typography.Text>
          <Typography.P>{formatAccountCode(accountNumber)}</Typography.P>
        </Pattern.Span>
        <Pattern.Span size={2}>
          <Typography.Text align={'RIGHT'} className={css.titleStatementInfoItem}>
            {locale.transactionsScroller.labels.incomingBalance}
          </Typography.Text>
          <Typography.P align={'RIGHT'} data-field={'statementSummaryInfo.incomingBalance'}>
            {locale.moneyString.unsigned({ amount: String(incomingBalance), currencyCode })}
          </Typography.P>
        </Pattern.Span>
        <Pattern.Span size={2}>
          <Typography.Text align={'RIGHT'} className={css.titleStatementInfoItem} data-field={'statementSummaryInfo.outcomesCount'}>
            {locale.transactionsScroller.labels.outcomeTransactions({ amount: outcomesCount })}
          </Typography.Text>
          <Typography.P align={'RIGHT'} data-field={'statementSummaryInfo.outcome'} fill={'CRITIC'}>
            {locale.moneyString.negative({ amount: String(outcome), currencyCode })}
          </Typography.P>
        </Pattern.Span>
        <Pattern.Span size={2}>
          <Typography.Text align={'RIGHT'} className={css.titleStatementInfoItem} data-field={'statementSummaryInfo.incomesCount'}>
            {locale.transactionsScroller.labels.incomeTransactions({ amount: incomesCount })}
          </Typography.Text>
          <Typography.P align={'RIGHT'} data-field={'statementSummaryInfo.income'} fill={'SUCCESS'}>
            {locale.moneyString.positive({ amount: String(income), currencyCode })}
          </Typography.P>
        </Pattern.Span>
        <Pattern.Span size={2}>
          <Typography.Text align={'RIGHT'} className={css.titleStatementInfoItem}>
            {locale.transactionsScroller.labels.outgoingBalance}
          </Typography.Text>
          <Typography.P align={'RIGHT'} data-field={'statementSummaryInfo.outgoingBalance'}>
            {locale.moneyString.unsigned({ amount: String(outgoingBalance), currencyCode })}
          </Typography.P>
        </Pattern.Span>
      </Pattern>
      <Gap.XS />
      <Pattern gap={'X2L'}>
        <Pattern.Span size={3}>
          <Typography.Text className={css.titleStatementInfoItem}>{locale.transactionsScroller.labels.organizationName}</Typography.Text>
          <WithInfoTooltip text={organizationName}>
            {ref => (
              <Typography.P innerRef={ref} line={'COLLAPSE'}>
                {organizationName}
              </Typography.P>
            )}
          </WithInfoTooltip>
        </Pattern.Span>
      </Pattern>
      <Gap.SM />
    </Box>
  );
};

StatementInfo.displayName = 'StatementInfo';
