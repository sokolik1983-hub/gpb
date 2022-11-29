import React from 'react';
import { HightlightText } from 'components/common';
import type { BankAccountingEntryTurnoverCard } from 'interfaces/admin/dto/bank-accounting-entry-turnover-card';
import { locale } from 'localization';
import type { CellProps } from 'react-table';
import { Typography } from '@platform/ui';
import { useQueryString } from '../hooks';

/** Компонент с ячейкой для отображения суммы поступления. */
export const Income: React.FC<CellProps<BankAccountingEntryTurnoverCard, BankAccountingEntryTurnoverCard>> = ({
  value: {
    amountByCredit,
    account: {
      currency: { letterCode },
    },
  },
}) => {
  const queryString = useQueryString();

  if (!amountByCredit) {
    return null;
  }

  return (
    <Typography.P align={'RIGHT'} fill={'SUCCESS'}>
      <HightlightText
        searchWords={queryString}
        textToHightlight={locale.moneyString.positive({ amount: String(amountByCredit), currencyCode: letterCode })}
      />
    </Typography.P>
  );
};

Income.displayName = 'Income';
