import type { FC } from 'react';
import React, { useContext } from 'react';
import cn from 'classnames';
import type { IGroupedAccounts, IGroupInfo, IAccountTurnoversInfo } from 'interfaces/dto';
import { GROUPING_TYPE, GROUPING_VALUES } from 'interfaces/dto';
import { locale } from 'localization';
import type { CellProps } from 'react-table';
import { formatAccountCode } from '@platform/tools/localization';
import { Typography, WithInfoTooltip, Horizon, ServiceIcons, Gap, Box } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import css from './styles.scss';
import { isGroupingRow } from './utils';

/** Ячейка "Организация". */
export const OrganizationCell: FC<CellProps<IGroupedAccounts, IAccountTurnoversInfo | IGroupInfo>> = ({ value, row }) => {
  const { isExpanded } = row;
  const { groupByForRender } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const Icon = isExpanded ? ServiceIcons.ChevronDown : ServiceIcons.ChevronUp;

  /**
   * Определяет марджин ячейки строки второго уровня.
   */
  const hasSecondLevelMargin = ![GROUPING_VALUES.NO_GROUPING, GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES].includes(groupByForRender);

  // Если ячейка была вызвана для отрисовки группирующей строки.
  if (isGroupingRow(value)) {
    const { groupingType, currencyName, currencyCode } = value;

    switch (groupingType) {
      case GROUPING_TYPE.CURRENCIES:
        return (
          <Horizon>
            <Icon fill="FAINT" scale={'MD'} />
            <Gap.SM />
            <Typography.Text data-field={'currencyNameOrCurrencyCode'}>{currencyName ?? currencyCode}</Typography.Text>
          </Horizon>
        );
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
      <Box className={cn({ [css.secondLevelCell]: hasSecondLevelMargin })}>
        <WithInfoTooltip text={organizationName}>
          {ref => (
            <Typography.SmallText data-field={'organizationName'} innerRef={ref} line={'COLLAPSE'}>
              {organizationName}
            </Typography.SmallText>
          )}
        </WithInfoTooltip>
      </Box>
    );
  }
};

OrganizationCell.displayName = 'OrganizationCell';

/** Ячейка "Номер счёта". */
export const AccountNumberCell: FC<CellProps<IGroupedAccounts, IAccountTurnoversInfo | IGroupInfo>> = ({ value, row }) => {
  const { groupByForRender } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const { isExpanded } = row;

  const Icon = isExpanded ? ServiceIcons.ChevronDown : ServiceIcons.ChevronUp;

  // Если ячейка была вызвана для отрисовки группирующей строки.
  if (isGroupingRow(value)) {
    const { groupingType, currencyName, currencyCode } = value;

    // А группирующая строка "По валютам" рендерится с помощью ячейки таблицы.
    if (groupingType === GROUPING_TYPE.CURRENCIES && groupByForRender === GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES) {
      return (
        <Horizon>
          <Gap.XL />
          <Icon fill="FAINT" scale={'MD'} />
          <Gap.SM />
          <Typography.Text data-field={'currencyNameOrCurrencyCode'}>{currencyName ?? currencyCode}</Typography.Text>
        </Horizon>
      );
    }

    // Группирующая строка для группировки "по организациям" рендерится без ячеек таблицы,
    // чтобы избежать переноса строки.
    return null;
  }

  const { accountNumber, accountType, accountName } = value;

  const accountDescriptionSuffix = accountName ? `• ${accountName}` : '';
  const accountDescription = `${accountType} ${accountDescriptionSuffix}`;

  /**
   * Определяет марджин ячейки строки второго уровня.
   */
  const hasSecondLevelMargin = groupByForRender === GROUPING_VALUES.ORGANIZATIONS;

  /**
   * Определяет марджин ячейки строки третьего уровня.
   */
  const hasThirdLevelMargin = groupByForRender === GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES;

  return (
    <Box className={cn({ [css.thirdLevelCell]: hasThirdLevelMargin, [css.secondLevelCell]: hasSecondLevelMargin })}>
      <Typography.Text>{formatAccountCode(accountNumber)}</Typography.Text>
      <WithInfoTooltip text={accountDescription}>
        {ref => (
          <Typography.SmallText data-field={'accountDescription'} fill={'FAINT'} innerRef={ref} line={'COLLAPSE'}>
            {accountDescription}
          </Typography.SmallText>
        )}
      </WithInfoTooltip>
    </Box>
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
    return (
      <Typography.Text align={'RIGHT'} data-field={'incomingBalance'}>
        {amount}
      </Typography.Text>
    );
    // Правило отключено потому, что нельзя сделать деструкцию, т.к. тип не уточнён,
    // линтер не учитывает типизацию.
    // eslint-disable-next-line unicorn/consistent-destructuring
  } else if (value.groupingType === GROUPING_TYPE.CURRENCIES) {
    return (
      <Typography.TextBold align={'RIGHT'} data-field={'incomingBalance'} fill={'FAINT'}>
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
      <Typography.Text align={'RIGHT'} data-field={'outcome'} fill={'CRITIC'}>
        {amount}
      </Typography.Text>
    );
    // Правило отключено потому, что TS не позволяет сделать деструкцию, т.к. тип не уточнён,
    // линтер не учитывает типизацию.
    // eslint-disable-next-line unicorn/consistent-destructuring
  } else if (value.groupingType === GROUPING_TYPE.CURRENCIES) {
    return (
      <Typography.TextBold align={'RIGHT'} data-field={'outcome'} fill={'CRITIC'}>
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
      <Typography.Text align={'RIGHT'} data-field={'income'} fill={'SUCCESS'}>
        {amount}
      </Typography.Text>
    );
    // Правило отключено потому, что нельзя сделать деструкцию, т.к. тип не уточнён,
    // линтер не учитывает типизацию.
    // eslint-disable-next-line unicorn/consistent-destructuring
  } else if (value.groupingType === GROUPING_TYPE.CURRENCIES) {
    return (
      <Typography.TextBold align={'RIGHT'} data-field={'income'} fill={'SUCCESS'}>
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
    return (
      <Typography.Text align={'RIGHT'} data-field={'outgoingBalance'}>
        {amount}
      </Typography.Text>
    );
    // Правило отключено потому, что нельзя сделать деструкцию, т.к. тип не уточнён,
    // линтер не учитывает типизацию.
    // eslint-disable-next-line unicorn/consistent-destructuring
  } else if (value.groupingType === GROUPING_TYPE.CURRENCIES) {
    return (
      <Typography.TextBold align={'RIGHT'} data-field={'outgoingBalance'} fill={'FAINT'}>
        {amount}
      </Typography.TextBold>
    );
  }

  return null;
};

OutgoingBalanceCell.displayName = 'OutgoingBalanceCell';
