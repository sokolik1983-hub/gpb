import type { FC } from 'react';
import React, { useContext } from 'react';
import { locale } from 'localization';
import { RUB_CURRENCY } from 'stream-constants';
import { formatAccountCode } from '@platform/tools/localization';
import { Box, Pattern, Typography, Gap, WithInfoTooltip } from '@platform/ui';
import type { ITransactionScrollerContext } from '../transaction-scroller-context';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import css from './styles.scss';

/** Текст указывающий на признак национального эквивалента. */
const NationalCurrencyText: FC = () => (
  <Typography.Text align="RIGHT" className={css.natCurrencyText}>
    {locale.transactionsScroller.labels.nationalCurrency}
  </Typography.Text>
);

/** Информация о сумме транзакций в национальном эквиваленте. */
const NationalCurrencyTransactionSummary: FC<{ amount: number; type: keyof typeof locale.moneyString }> = ({ amount, type }) => {
  const fill = { positive: 'SUCCESS', negative: 'CRITIC', unsigned: 'BASE' } as const;

  return (
    <Typography.Text align="RIGHT" className={css[type]} fill={fill[type]}>
      {locale.moneyString[type]({ amount: String(amount), currencyCode: RUB_CURRENCY })}
    </Typography.Text>
  );
};

/** Общая информация по выписке. */
export const StatementInfo: FC = () => {
  const { statementSummaryInfo, isNationalCurrency } = useContext<ITransactionScrollerContext>(TransactionScrollerContext);

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
    incomingBalanceNatCurr,
    incomeNatCurr,
    outcomeNatCurr,
    outgoingBalanceNatCurr,
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
