import type { FC } from 'react';
import React, { useContext } from 'react';
import type { IGroupedAccounts, IGroupInfo, IAccountTurnoversInfo } from 'interfaces/client';
import { GROUPING_TYPE, GROUPING_VALUES } from 'interfaces/client';
import { locale } from 'localization';
import type { CellProps } from 'react-table';
import { formatAccountCode } from '@platform/tools/localization';
import { Typography, WithInfoTooltip } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { isGroupingRow } from './utils';

/** Ячейка "Организация". */
export const OrganizationCell: FC<CellProps<IGroupedAccounts, IAccountTurnoversInfo | IGroupInfo>> = ({ value }) => {
  // Если ячейка была вызвана для отрисовки группирующей строки.
  if (isGroupingRow(value)) {
    const { groupingType, currencyName, currencyCode } = value;

    switch (groupingType) {
      case GROUPING_TYPE.CURRENCIES:
        return <Typography.TextBold fill={'FAINT'}>{currencyName ?? currencyCode}</Typography.TextBold>;
      // Группирующие строки для этих типов группировки, рендерятся без ячеек таблицы,
      // чтобы избежать переноса строки.
      case GROUPING_TYPE.BRANCHES:
      case GROUPING_TYPE.ACCOUNT_TYPE:
      default:
        return null;
    }
  } else {
    const { organizationName } = value;

    return (
      <WithInfoTooltip text={organizationName}>
        {ref => (
          <Typography.SmallText innerRef={ref} line={'COLLAPSE'}>
            {organizationName}
          </Typography.SmallText>
        )}
      </WithInfoTooltip>
    );
  }
};

OrganizationCell.displayName = 'OrganizationCell';

/** Ячейка "Номер счёта". */
export const AccountNumberCell: FC<CellProps<IGroupedAccounts, IAccountTurnoversInfo | IGroupInfo>> = ({ value }) => {
  const {
    filterPanel: { values: filterFormValue },
  } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const { groupBy } = filterFormValue;

  // Если ячейка была вызвана для отрисовки группирующей строки.
  if (isGroupingRow(value)) {
    const { groupingType, currencyName, currencyCode } = value;

    // А группирующая строка "По валютам" рендерится с помощью ячейки таблицы.
    if (groupingType === GROUPING_TYPE.CURRENCIES && groupBy === GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES) {
      return <Typography.TextBold fill={'FAINT'}>{currencyName ?? currencyCode}</Typography.TextBold>;
    }

    // Группирующая строка для группировки "по организациям" рендерится без ячеек таблицы,
    // чтобы избежать переноса строки.
    return null;
  }

  const { accountNumber, accountType, accountName } = value;

  const accountDescriptionSuffix = accountName ? `• ${accountName}` : '';
  const accountDescription = `${accountType} ${accountDescriptionSuffix}`;

  return (
    <>
      <Typography.Text>{formatAccountCode(accountNumber)}</Typography.Text>
      <WithInfoTooltip text={accountDescription}>
        {ref => (
          <Typography.SmallText fill={'FAINT'} innerRef={ref} line={'COLLAPSE'}>
            {accountDescription}
          </Typography.SmallText>
        )}
      </WithInfoTooltip>
    </>
  );
};

AccountNumberCell.displayName = 'AccountNumberCell';

/** Ячейка "Входящий баланс". */
export const IncomingBalanceCell: FC<CellProps<IGroupedAccounts, IAccountTurnoversInfo | IGroupInfo>> = ({ value }) => {
  const { incomingBalance, currencyCode } = value;

  // Non-null assertion используется потому, что ячейка вызывается только для тех строк, в которых определены значения
  const amount = locale.moneyString.unsigned({ amount: String(incomingBalance!), currencyCode: currencyCode! });

  // Если ячейка была вызвана для строки с информацией по счёту.
  if (!isGroupingRow(value)) {
    return <Typography.Text align={'RIGHT'}>{amount}</Typography.Text>;
    // Правило отключено потому, что нельзя сделать деструкцию, т.к. тип не уточнён,
    // линтер не учитывает типизацию.
    // eslint-disable-next-line unicorn/consistent-destructuring
  } else if (value.groupingType === GROUPING_TYPE.CURRENCIES) {
    return (
      <Typography.TextBold align={'RIGHT'} fill={'FAINT'}>
        {amount}
      </Typography.TextBold>
    );
  }

  return null;
};

IncomingBalanceCell.displayName = 'IncomingBalanceCell';

/** Ячейка "Расход". */
export const OutcomeCell: FC<CellProps<IGroupedAccounts, IAccountTurnoversInfo | IGroupInfo>> = ({ value }) => {
  const { outcome, currencyCode } = value;

  // Non-null assertion используется потому, что ячейка вызывается только для тех строк, в которых определены значения
  const amount = locale.moneyString.negative({ amount: String(outcome!), currencyCode: currencyCode! });

  // Если ячейка была вызвана для строки с информацией по счёту.
  if (!isGroupingRow(value)) {
    return (
      <Typography.Text align={'RIGHT'} fill={'CRITIC'}>
        {amount}
      </Typography.Text>
    );
    // Правило отключено потому, что TS не позволяет сделать деструкцию, т.к. тип не уточнён,
    // линтер не учитывает типизацию.
    // eslint-disable-next-line unicorn/consistent-destructuring
  } else if (value.groupingType === GROUPING_TYPE.CURRENCIES) {
    return (
      <Typography.TextBold align={'RIGHT'} fill={'CRITIC'}>
        {amount}
      </Typography.TextBold>
    );
  }

  return null;
};

OutcomeCell.displayName = 'OutcomeCell';

/** Ячейка "Приход". */
export const IncomeCell: FC<CellProps<IGroupedAccounts, IAccountTurnoversInfo | IGroupInfo>> = ({ value }) => {
  const { income, currencyCode } = value;

  // Non-null assertion используется потому, что ячейка вызывается только для тех строк, в которых определены значения
  const amount = locale.moneyString.positive({ amount: String(income!), currencyCode: currencyCode! });

  // Если ячейка была вызвана для строки с информацией по счёту.
  if (!isGroupingRow(value)) {
    return (
      <Typography.Text align={'RIGHT'} fill={'SUCCESS'}>
        {amount}
      </Typography.Text>
    );
    // Правило отключено потому, что нельзя сделать деструкцию, т.к. тип не уточнён,
    // линтер не учитывает типизацию.
    // eslint-disable-next-line unicorn/consistent-destructuring
  } else if (value.groupingType === GROUPING_TYPE.CURRENCIES) {
    return (
      <Typography.TextBold align={'RIGHT'} fill={'SUCCESS'}>
        {amount}
      </Typography.TextBold>
    );
  }

  return null;
};

IncomeCell.displayName = 'IncomeCell';

/** Ячейка "Исходящий остаток". */
export const OutgoingBalanceCell: FC<CellProps<IGroupedAccounts, IAccountTurnoversInfo | IGroupInfo>> = ({ value }) => {
  const { outgoingBalance, currencyCode } = value;

  // Non-null assertion используется потому, что ячейка вызывается только для тех строк, в которых определены значения
  const amount = locale.moneyString.unsigned({ amount: String(outgoingBalance!), currencyCode: currencyCode! });

  // Если ячейка была вызвана для строки с информацией по счёту.
  if (!isGroupingRow(value)) {
    return <Typography.Text align={'RIGHT'}>{amount}</Typography.Text>;
    // Правило отключено потому, что нельзя сделать деструкцию, т.к. тип не уточнён,
    // линтер не учитывает типизацию.
    // eslint-disable-next-line unicorn/consistent-destructuring
  } else if (value.groupingType === GROUPING_TYPE.CURRENCIES) {
    return (
      <Typography.TextBold align={'RIGHT'} fill={'FAINT'}>
        {amount}
      </Typography.TextBold>
    );
  }

  return null;
};

OutgoingBalanceCell.displayName = 'OutgoingBalanceCell';
