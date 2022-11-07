import React from 'react';
import { HightlightText } from 'components/common';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import type { CellProps } from 'react-table';
import { Typography } from '@platform/ui';
import { useQueryString } from '../hooks';

/** Компонент с ячейкой для отображения суммы поступления. */
export const IncomeCell: React.FC<CellProps<BankAccountingEntryCard>> = ({
  value: {
    amountCredit,
    account: { currencyLetterCode },
  },
}) => {
  const queryString = useQueryString();

  if (!amountCredit) {
    return null;
  }

  return (
    <Typography.P align={'RIGHT'} fill={'SUCCESS'}>
      <HightlightText
        searchWords={queryString}
        textToHightlight={locale.moneyString.positive({ amount: String(amountCredit), currencyCode: currencyLetterCode })}
      />
    </Typography.P>
  );
};

IncomeCell.displayName = 'IncomeCell';
