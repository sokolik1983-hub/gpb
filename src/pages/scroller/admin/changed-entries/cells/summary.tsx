import React from 'react';
import type { BankAccountingEntryTurnoverCard } from 'interfaces/admin/dto/bank-accounting-entry-turnover-card';
import type { CellProps } from 'react-table';
import { Income } from './income';
import { Outcome } from './outcome';

/** Компонент с ячейкой для отображения суммы поступления и списания. */
export const Summary: React.FC<CellProps<BankAccountingEntryTurnoverCard, BankAccountingEntryTurnoverCard>> = props => (
  <>
    <Income {...props} />
    <Outcome {...props} />
  </>
);

Summary.displayName = 'Summary';
