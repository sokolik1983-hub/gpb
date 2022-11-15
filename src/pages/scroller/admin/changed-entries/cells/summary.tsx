import React from 'react';
import type { BankAccountingChangedEntry } from 'interfaces/admin/dto/bank-accounting-changed-entry';
import type { CellProps } from 'react-table';
import { Income } from './income';
import { Outcome } from './outcome';

/** Компонент с ячейкой для отображения суммы поступления и списания. */
export const Summary: React.FC<CellProps<BankAccountingChangedEntry, BankAccountingChangedEntry>> = props => (
  <>
    <Income {...props} />
    <Outcome {...props} />
  </>
);

Summary.displayName = 'Summary';
