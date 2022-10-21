import type { FC } from 'react';
import React, { useContext } from 'react';
import { StatementInfoContent } from 'components/common';
import type { ITransactionScrollerContext } from '../transaction-scroller-context';
import { TransactionScrollerContext } from '../transaction-scroller-context';

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
    <StatementInfoContent
      accountNumbers={[accountNumber]}
      currencyCode={currencyCode}
      income={income}
      incomeNatCurr={incomeNatCurr}
      incomesCount={incomesCount}
      incomingBalance={incomingBalance}
      incomingBalanceNatCurr={incomingBalanceNatCurr}
      isNationalCurrency={isNationalCurrency}
      organizationNames={[organizationName]}
      outcome={outcome}
      outcomeNatCurr={outcomeNatCurr}
      outcomesCount={outcomesCount}
      outgoingBalance={outgoingBalance}
      outgoingBalanceNatCurr={outgoingBalanceNatCurr}
    />
  );
};

StatementInfo.displayName = 'StatementInfo';
