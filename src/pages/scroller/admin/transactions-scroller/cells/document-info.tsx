import React from 'react';
import { HightlightText } from 'components/common';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import type { CellProps } from 'react-table';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { Typography, WithInfoTooltip } from '@platform/ui';
import { useQueryString } from '../hooks';

/** Компонент с ячейкой для отображения информации о документе.  */
export const DocumentInfo: React.FC<CellProps<BankAccountingEntryCard, BankAccountingEntryCard>> = ({
  value: { documentDate, documentNumber },
}) => {
  const queryString = useQueryString();

  return (
    <>
      <WithInfoTooltip text={documentNumber}>
        {ref => (
          <Typography.P data-field={'documentNumber'} innerRef={ref} line={'COLLAPSE'}>
            <HightlightText searchWords={queryString} textToHightlight={String(documentNumber)} />
          </Typography.P>
        )}
      </WithInfoTooltip>
      <Typography.Text data-field={'documentDate'}>
        <HightlightText
          searchWords={queryString}
          textToHightlight={locale.admin.transactionsScroller.cells.documentDate({
            date: formatDateTime(documentDate, { keepLocalTime: true, format: DATE_FORMAT }),
          })}
        />
      </Typography.Text>
    </>
  );
};

DocumentInfo.displayName = 'DocumentInfo';
