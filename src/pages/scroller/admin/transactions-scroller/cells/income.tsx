import React from 'react';
import { HightlightText } from 'components/common';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import type { CellProps } from 'react-table';
import { Typography } from '@platform/ui';
import { useQueryString } from '../hooks';

/** Компонент с ячейкой для отображения суммы поступления. */
export const Income: React.FC<CellProps<BankAccountingEntryCard, BankAccountingEntryCard>> = ({
  value: { amountByCredit, currencyNumericCodeByCredit },
}) => {
  const queryString = useQueryString();

  if (!amountByCredit) {
    return null;
  }

  return (
    <Typography.P align={'RIGHT'} fill={'SUCCESS'}>
      <HightlightText
        searchWords={queryString}
        textToHightlight={locale.moneyString.positive({ amount: String(amountByCredit), currencyCode: currencyNumericCodeByCredit })}
      />
    </Typography.P>
  );
};

Income.displayName = 'Income';
