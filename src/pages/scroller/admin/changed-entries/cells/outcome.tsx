import React from 'react';
import { HightlightText } from 'components/common';
import type { BankAccountingChangedEntry } from 'interfaces/admin/dto/bank-accounting-changed-entry';
import { locale } from 'localization';
import type { CellProps } from 'react-table';
import { Typography } from '@platform/ui';
import { useQueryString } from '../hooks';

/** Компонент с ячейкой для отображения суммы списания. */
export const Outcome: React.FC<CellProps<BankAccountingChangedEntry, BankAccountingChangedEntry>> = ({
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

Outcome.displayName = 'Outcome';
