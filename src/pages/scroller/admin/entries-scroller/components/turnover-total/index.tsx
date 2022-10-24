import type { FC } from 'react';
import React, { useContext } from 'react';
import { StatementInfoContent } from 'components/common';
import { EntriesScrollerContext } from 'pages/scroller/admin/entries-scroller/context';

/** Высота области с компонентом. */
export const TURNOVER_TOTAL_HEIGHT = 100;

/** Компонент со сводной информацией по выписке. */
export const TurnoverTotal: FC = () => {
  const { totalTurnovers } = useContext(EntriesScrollerContext);

  const turnoverItem = totalTurnovers?.[0];

  if (!turnoverItem) {
    return null;
  }

  return (
    <StatementInfoContent
      isNationalCurrency
      accountNumbers={turnoverItem.accountNumbers}
      currencyCode={turnoverItem.currencyCode}
      income={turnoverItem.turnoverDebit}
      incomeNatCurr={0}
      incomesCount={turnoverItem.incomingCount}
      incomingBalance={turnoverItem.incomingBalance}
      incomingBalanceNatCurr={0}
      organizationNames={turnoverItem.organizationNames}
      outcome={turnoverItem?.turnoverCredit ?? 0}
      outcomeNatCurr={0}
      outcomesCount={turnoverItem.outgoingCount}
      outgoingBalance={turnoverItem.outgoingBalance}
      outgoingBalanceNatCurr={0}
    />
  );
};

TurnoverTotal.displayName = 'TurnoverTotal';
