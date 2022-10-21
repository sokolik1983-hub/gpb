import React from 'react';
import type { BankAccountingEntryAccount } from 'interfaces/admin/dto/bank-accounting-entry-account';
import type { BankAccountingEntryGroup } from 'interfaces/admin/dto/bank-accounting-entry-group';
import { locale } from 'localization';
import type { RecordCell } from 'platform-copies/services';
import type { Row } from 'react-table';
import { formatAccountCode } from '@platform/tools/localization';
import { Gap, Horizon, ServiceIcons, Typography, WithClickable } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента для отображения заголовка. */
interface AggregateHeaderProps {
  /** Счет ля группы проводок. */
  account: BankAccountingEntryAccount;
}

/** Компонент для отображения заголовка подстрок при группировке по счетам. */
const AggregateByAccountHeader: React.FC<AggregateHeaderProps> = ({ account }) => {
  const formattedAccountNumber = locale.admin.entryScroller.columns.aggregate.account({
    accountNumber: formatAccountCode(account?.number),
  });
  const currencyCode = account?.currency?.letterCode ?? '';
  const organizationName = account?.bankClient.name ?? '';

  return (
    <>
      <Typography.PBold line="COLLAPSE">{formattedAccountNumber}</Typography.PBold>
      <Gap.SM />
      <Typography.PBold fill="FAINT">{currencyCode}</Typography.PBold>
      <Gap.SM />
      <Typography.PBold fill="FAINT">{organizationName}</Typography.PBold>
    </>
  );
};

AggregateByAccountHeader.displayName = 'AggregateByAccountHeader';

/** Свойства компонента для строки с аггрегированными данными. */
interface AggregateByAccountRowProps {
  /** Строка с данными. */
  row: Row<RecordCell>;
}

/** Компонент для строки с аггрегированными данными по группе. */
export const AggregateByAccountHeaderRow: React.FC<AggregateByAccountRowProps> = ({ row }) => {
  const { original, getRowProps, isExpanded } = row;
  const { aggregate } = original as BankAccountingEntryGroup;
  const { key, ...rowProps } = getRowProps();

  const Icon = isExpanded ? ServiceIcons.ChevronDown : ServiceIcons.ChevronUp;

  return (
    <WithClickable>
      {ref => (
        <Horizon {...rowProps} ref={ref} className={css.container}>
          <AggregateByAccountHeader account={aggregate?.account} />
          <Gap />
          <Icon fill="FAINT" scale="MD" />
        </Horizon>
      )}
    </WithClickable>
  );
};

AggregateByAccountHeaderRow.displayName = 'AggregateByAccountHeaderRow';
