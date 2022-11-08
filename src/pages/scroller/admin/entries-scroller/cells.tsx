import React, { useMemo } from 'react';
import { executor } from 'actions/admin/executor';
import { HightlightText, StopPropagation } from 'components/common';
import type { IUrlParams } from 'interfaces';
import type { BankAccountingEntryTurnoverCard } from 'interfaces/admin/dto/bank-accounting-entry-turnover-card';
import { DATA_ACTION } from 'interfaces/data-action';
import { locale } from 'localization';
import { useParams } from 'react-router-dom';
import type { CellProps } from 'react-table';
import { getActiveActionButtons } from 'utils/common';
import { DATE_FORMAT } from '@platform/services';
import { useAuth } from '@platform/services/admin';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import { Gap, Horizon, RegularButton, ServiceIcons, Typography, WithDropDown, WithInfoTooltip } from '@platform/ui';
import { ROW_ACTIONS } from './action-configs';
import { useQueryString } from './hooks';
import css from './styles.scss';

/** Компонент с ячейкой для отображения информации о дате. */
export const EntryDateCell: React.FC<CellProps<BankAccountingEntryTurnoverCard>> = ({ value: { entryDate } }) => {
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

EntryDateCell.displayName = 'EntryDateCell';

/** Компонент для отображения информации по счету клиента. */
export const AccountInfoCell: React.FC<CellProps<BankAccountingEntryTurnoverCard>> = ({
  value: {
    account: {
      bankClient: { name },
      number,
    },
  },
}) => {
  const queryString = useQueryString();

  return (
    <>
      <WithInfoTooltip extraSmall text={name}>
        {ref => (
          <Typography.P innerRef={ref} line={'COLLAPSE'}>
            <HightlightText searchWords={queryString} textToHightlight={name} />
          </Typography.P>
        )}
      </WithInfoTooltip>
      <Typography.Text>
        <HightlightText searchWords={queryString} textToHightlight={formatAccountCode(number)} />
      </Typography.Text>
    </>
  );
};

AccountInfoCell.displayName = 'AccountInfoCell';

/** Компонент с ячейкой для отображения информации о документе.  */
export const DocumentInfoCell: React.FC<CellProps<BankAccountingEntryTurnoverCard>> = ({ value: { documentDate, documentNumber } }) => {
  const queryString = useQueryString();

  return (
    <>
      <WithInfoTooltip text={documentNumber}>
        {ref => (
          <Typography.P data-field={'documentNumber'} innerRef={ref} line={'COLLAPSE'}>
            <HightlightText searchWords={queryString} textToHightlight={documentNumber} />
          </Typography.P>
        )}
      </WithInfoTooltip>
      <Typography.Text data-field={'documentDate'}>
        <HightlightText
          searchWords={queryString}
          textToHightlight={locale.admin.entryScroller.cells.documentDate({
            date: formatDateTime(documentDate, { keepLocalTime: true, format: DATE_FORMAT }),
          })}
        />
      </Typography.Text>
    </>
  );
};

DocumentInfoCell.displayName = 'DocumentInfoCell';

/** Компонент с ячейкой для отображения информации о контрагенте. */
export const CounterpartyInfoCell: React.FC<CellProps<BankAccountingEntryTurnoverCard>> = ({
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

CounterpartyInfoCell.displayName = 'CounterpartyInfoCell';

/** Компонент с ячейкой для отображения суммы поступления. */
export const IncomeCell: React.FC<CellProps<BankAccountingEntryTurnoverCard>> = ({
  value: {
    amountCredit,
    account: { currencyLetterCode },
  },
}) => {
  const queryString = useQueryString();

  if (!amountCredit) {
    return null;
  }

  return (
    <Typography.P align={'RIGHT'} fill={'SUCCESS'}>
      <HightlightText
        searchWords={queryString}
        textToHightlight={locale.moneyString.positive({ amount: String(amountCredit), currencyCode: currencyLetterCode })}
      />
    </Typography.P>
  );
};

IncomeCell.displayName = 'IncomeCell';

/** Компонент с ячейкой для отображения суммы списания. */
export const OutcomeCell: React.FC<CellProps<BankAccountingEntryTurnoverCard>> = ({
  value: {
    amountDebit,
    account: { currencyLetterCode },
  },
}) => {
  const queryString = useQueryString();

  if (!amountDebit) {
    return null;
  }

  return (
    <Typography.P align={'RIGHT'} fill={'CRITIC'}>
      <HightlightText
        searchWords={queryString}
        textToHightlight={locale.moneyString.negative({ amount: String(amountDebit), currencyCode: currencyLetterCode })}
      />
    </Typography.P>
  );
};

OutcomeCell.displayName = 'OutcomeCell';

/** Компонент с ячейкой для отображения суммы поступления и списания. */
export const SummaryCell: React.FC<CellProps<BankAccountingEntryTurnoverCard>> = props => (
  <>
    <IncomeCell {...props} />
    <OutcomeCell {...props} />
  </>
);

SummaryCell.displayName = 'SummaryCell';

/** Компонент с ячейкой с действиями для строки скроллера. */
export const ActionsCell: React.FC<CellProps<BankAccountingEntryTurnoverCard>> = ({ value }) => {
  const { getAvailableActions } = useAuth();
  const { id } = useParams<IUrlParams>();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(ROW_ACTIONS), executor, [[value], id]), [
    getAvailableActions,
    value,
    id,
  ]);

  if (actions.length === 0) {
    return null;
  }

  const visibleActions = actions.slice(0, 2);
  const dropDownActions = actions.slice(2);

  return (
    <StopPropagation>
      <Horizon allHeight={false}>
        {visibleActions.map(({ icon, name, onClick }) => (
          <RegularButton
            key={name}
            extraSmall
            className={css['row__action-button']}
            data-action={name}
            dimension={'MC'}
            icon={icon}
            onClick={onClick}
          />
        ))}

        {dropDownActions.length > 0 && (
          <>
            <Gap.XS />
            <WithDropDown extraSmall actions={dropDownActions} offset={6} radius="XS" shadow="LG">
              {(ref, _, toggleOpen) => (
                <RegularButton
                  ref={ref}
                  extraSmall
                  className={css['row__action-button']}
                  data-action={DATA_ACTION.MORE}
                  dimension={'MC'}
                  icon={ServiceIcons.ActionMenuHorizontal}
                  onClick={toggleOpen}
                />
              )}
            </WithDropDown>
          </>
        )}
      </Horizon>
    </StopPropagation>
  );
};

ActionsCell.displayName = 'ActionsCell';
