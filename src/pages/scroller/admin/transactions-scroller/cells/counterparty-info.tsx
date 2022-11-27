import React from 'react';
import { HightlightText } from 'components/common';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import type { CellProps } from 'react-table';
import { formatAccountCode } from '@platform/tools/localization';
import { Typography, WithInfoTooltip } from '@platform/ui';
import { useQueryString } from '../hooks';

/** Компонент с ячейкой для отображения информации о контрагенте. */
export const CounterpartyInfo: React.FC<CellProps<BankAccountingEntryCard, BankAccountingEntryCard>> = ({
  value: { counterpartyName, counterpartyAccountNumber },
}) => {
  const queryString = useQueryString();

  return (
    <>
      <WithInfoTooltip extraSmall text={counterpartyName}>
        {ref => (
          <Typography.P innerRef={ref} line={'COLLAPSE'}>
            <HightlightText searchWords={queryString} textToHightlight={counterpartyName} />
          </Typography.P>
        )}
      </WithInfoTooltip>
      <Typography.Text>
        <HightlightText searchWords={queryString} textToHightlight={formatAccountCode(counterpartyAccountNumber)} />
      </Typography.Text>
    </>
  );
};

CounterpartyInfo.displayName = 'CounterpartyInfo';
