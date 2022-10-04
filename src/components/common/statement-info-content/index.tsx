import React from 'react';
import { NationalCurrencyText } from 'components/common/statement-info-content/national-currency-text';
import { NationalCurrencyTransactionSummary } from 'components/common/statement-info-content/national-currency-transaction-summary';
import { locale } from 'localization';
import { formatAccountCode } from '@platform/tools/localization';
import { Box, Gap, Pattern, Typography, WithInfoTooltip } from '@platform/ui';
import css from './styles.scss';

interface StatmentInfoContentProps {
  accountNumber: string;
  organizationName: string;
  isNationalCurrency: boolean;
  incomingBalance: number;
  currencyCode: string;
  incomingBalanceNatCurr: number;
  outcomesCount: number;
  outcome: number;
  outcomeNatCurr: number;
  incomesCount: number;
  income: number;
  incomeNatCurr: number;
  outgoingBalance: number;
  outgoingBalanceNatCurr: number;
}

export const StatementInfoContent = ({
  accountNumber,
  organizationName,
  incomingBalance,
  outcome,
  income,
  outcomesCount,
  incomesCount,
  outgoingBalance,
  incomingBalanceNatCurr,
  incomeNatCurr,
  outcomeNatCurr,
  outgoingBalanceNatCurr,
  isNationalCurrency,
  currencyCode,
}: StatmentInfoContentProps) => (
  <Box className={css.statementInfoWrapper}>
    <Gap.SM />
    <Pattern gap={'X2L'}>
      <Pattern.Span size={4}>
        <Typography.Text className={css.titleStatementInfoItem}>{locale.transactionsScroller.labels.accountNumber}</Typography.Text>
        <Typography.P>{formatAccountCode(accountNumber)}</Typography.P>
        <Gap.XS />
        <Typography.Text className={css.titleStatementInfoItem}>{locale.transactionsScroller.labels.organizationName}</Typography.Text>
        <WithInfoTooltip text={organizationName}>
          {ref => (
            <Typography.P innerRef={ref} line={'COLLAPSE'}>
              {organizationName}
            </Typography.P>
          )}
        </WithInfoTooltip>
      </Pattern.Span>
      <Pattern.Span size={2}>
        <Typography.Text align={'RIGHT'} className={css.titleStatementInfoItem}>
          {locale.transactionsScroller.labels.incomingBalance}
        </Typography.Text>
        {isNationalCurrency && <NationalCurrencyText />}
        <Typography.P align={'RIGHT'} data-field={'statementSummaryInfo.incomingBalance'}>
          {locale.moneyString.unsigned({ amount: String(incomingBalance), currencyCode })}
        </Typography.P>
        {isNationalCurrency && <NationalCurrencyTransactionSummary amount={incomingBalanceNatCurr} type="unsigned" />}
      </Pattern.Span>
      <Pattern.Span size={2}>
        <Typography.Text align={'RIGHT'} className={css.titleStatementInfoItem} data-field={'statementSummaryInfo.outcomesCount'}>
          {locale.transactionsScroller.labels.outcomeTransactions({ amount: outcomesCount })}
          {isNationalCurrency && <NationalCurrencyText />}
        </Typography.Text>
        <Typography.P align={'RIGHT'} data-field={'statementSummaryInfo.outcome'} fill={'CRITIC'}>
          {locale.moneyString.negative({ amount: String(outcome), currencyCode })}
          {isNationalCurrency && <NationalCurrencyTransactionSummary amount={outcomeNatCurr} type="negative" />}
        </Typography.P>
      </Pattern.Span>
      <Pattern.Span size={2}>
        <Typography.Text align={'RIGHT'} className={css.titleStatementInfoItem} data-field={'statementSummaryInfo.incomesCount'}>
          {locale.transactionsScroller.labels.incomeTransactions({ amount: incomesCount })}
          {isNationalCurrency && <NationalCurrencyText />}
        </Typography.Text>
        <Typography.P align={'RIGHT'} data-field={'statementSummaryInfo.income'} fill={'SUCCESS'}>
          {locale.moneyString.positive({ amount: String(income), currencyCode })}
          {isNationalCurrency && <NationalCurrencyTransactionSummary amount={incomeNatCurr} type="positive" />}
        </Typography.P>
      </Pattern.Span>
      <Pattern.Span size={2}>
        <Typography.Text align={'RIGHT'} className={css.titleStatementInfoItem}>
          {locale.transactionsScroller.labels.outgoingBalance}
          {isNationalCurrency && <NationalCurrencyText />}
        </Typography.Text>
        <Typography.P align={'RIGHT'} data-field={'statementSummaryInfo.outgoingBalance'}>
          {locale.moneyString.unsigned({ amount: String(outgoingBalance), currencyCode })}
          {isNationalCurrency && <NationalCurrencyTransactionSummary amount={outgoingBalanceNatCurr} type="unsigned" />}
        </Typography.P>
      </Pattern.Span>
    </Pattern>
    <Gap.XS />
  </Box>
);

StatementInfoContent.displayName = 'StatementInfoContent';
