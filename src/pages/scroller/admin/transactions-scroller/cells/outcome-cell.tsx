import React from 'react';
import { HightlightText } from 'components/common';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import type { CellProps } from 'react-table';
import { Typography } from '@platform/ui';
import { useQueryString } from '../hooks';

/** Компонент с ячейкой для отображения суммы списания. */
export const OutcomeCell: React.FC<CellProps<BankAccountingEntryCard, BankAccountingEntryCard>> = ({
  value: { amountByDebit, currencyNumericCodeByDebit },
}) => {
  const queryString = useQueryString();

  if (!amountByDebit) {
    return null;
  }

  return (
    <Typography.P align={'RIGHT'} fill={'CRITIC'}>
      <HightlightText
        searchWords={queryString}
        textToHightlight={locale.moneyString.negative({ amount: String(amountByDebit), currencyCode: currencyNumericCodeByDebit })}
      />
    </Typography.P>
  );
};

OutcomeCell.displayName = 'OutcomeCell';
