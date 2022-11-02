import React from 'react';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import type { CellProps } from 'react-table';
import { IncomeCell } from './income-cell';
import { OutcomeCell } from './outcome-cell';

/** Компонент с ячейкой для отображения суммы поступления и списания. */
export const SummaryCell: React.FC<CellProps<BankAccountingEntryCard>> = props => (
  <>
    <IncomeCell {...props} />
    <OutcomeCell {...props} />
  </>
);

SummaryCell.displayName = 'SummaryCell';
