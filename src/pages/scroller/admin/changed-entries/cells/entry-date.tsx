import React from 'react';
import { HightlightText } from 'components/common';
import type { BankAccountingChangedEntry } from 'interfaces/admin/dto/bank-accounting-changed-entry';
import type { CellProps } from 'react-table';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { Typography, WithInfoTooltip } from '@platform/ui';
import { useQueryString } from '../hooks';

/** Компонент с ячейкой для отображения информации о дате. */
export const EntryDate: React.FC<CellProps<BankAccountingChangedEntry, BankAccountingChangedEntry>> = ({ value: { entryDate } }) => {
  const formattedEntryDate = formatDateTime(entryDate, { keepLocalTime: true, format: DATE_FORMAT });

  const queryString = useQueryString();

  return (
    <WithInfoTooltip text={formattedEntryDate}>
      {ref => (
        <Typography.P data-field={'entryDate'} innerRef={ref} line={'COLLAPSE'}>
          <HightlightText searchWords={queryString} textToHightlight={formattedEntryDate} />
        </Typography.P>
      )}
    </WithInfoTooltip>
  );
};

EntryDate.displayName = 'EntryDate';
