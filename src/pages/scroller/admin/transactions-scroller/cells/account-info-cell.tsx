import React from 'react';
import { HightlightText } from 'components/common';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import type { CellProps } from 'react-table';
import { formatAccountCode } from '@platform/tools/localization';
import { Typography, WithInfoTooltip } from '@platform/ui';
import { useQueryString } from '../hooks';

/** Компонент для отображения информации по счету клиента. */
export const AccountInfoCell: React.FC<CellProps<BankAccountingEntryCard, BankAccountingEntryCard>> = ({
  value: { bankClientName, bankClientAccountNumber },
}) => {
  const queryString = useQueryString();

  return (
    <>
      <WithInfoTooltip extraSmall text={bankClientName}>
        {ref => (
          <Typography.P innerRef={ref} line={'COLLAPSE'}>
            <HightlightText searchWords={queryString} textToHightlight={bankClientName} />
          </Typography.P>
        )}
      </WithInfoTooltip>
      <Typography.Text>
        <HightlightText searchWords={queryString} textToHightlight={formatAccountCode(bankClientAccountNumber)} />
      </Typography.Text>
    </>
  );
};

AccountInfoCell.displayName = 'AccountInfoCell';
