import type { FC } from 'react';
import React from 'react';
import { ContentLoader, StatementInfoContent } from 'components/common';
import { useGetTurnoverTotalByAccounts } from 'pages/scroller/admin/entries-scroller/hooks';

/** Высота области с копонентом. */
export const TURNOVER_TOTAL_HEIGHT = 95;

/** Компонент со сводной информацией по выписке. */
export const TurnoverTotal: FC = () => {
  const { data, isFetching } = useGetTurnoverTotalByAccounts();
  const total = data?.[0];

  return (
    <ContentLoader height={TURNOVER_TOTAL_HEIGHT} loading={isFetching}>
      <StatementInfoContent
        isNationalCurrency
        accountNumber={total?.account?.number ?? ''}
        currencyCode={total?.account?.currencyLetterCode ?? ''}
        income={total?.turnoverDebit ?? 0}
        incomeNatCurr={total?.turnoverDebitInNationalCurrency ?? 0}
        incomesCount={0}
        incomingBalance={total?.incomingBalance ?? 0}
        incomingBalanceNatCurr={total?.incomingBalanceInNationalCurrency ?? 0}
        organizationName={total?.account?.organizationName ?? ''}
        outcome={total?.turnoverCredit ?? 0}
        outcomeNatCurr={total?.turnoverCreditInNationalCurrency ?? 0}
        outcomesCount={0}
        outgoingBalance={total?.outgoingBalance ?? 0}
        outgoingBalanceNatCurr={total?.outgoingBalanceInNationalCurrency ?? 0}
      />
    </ContentLoader>
  );
};

TurnoverTotal.displayName = 'TurnoverTotal';
