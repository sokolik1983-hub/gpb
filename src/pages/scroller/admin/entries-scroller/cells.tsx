import React, { useMemo } from 'react';
import { executor } from 'actions/admin/executor';
import { StopPropagation } from 'components/common';
import type { IUrlParams } from 'interfaces';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
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
import { CARD_ROW_ACTIONS } from './action-configs';
import css from './styles.scss';

/** Компонент с ячейкой для отображения информации о дате. */
export const EntryDateCell: React.FC<CellProps<BankAccountingEntryCard>> = ({ value }) => {
  const { entryDate } = value;
  const formattedEntryDate = formatDateTime(entryDate, { keepLocalTime: true, format: DATE_FORMAT });

  return (
    <WithInfoTooltip text={formattedEntryDate}>
      {ref => (
        <Typography.P data-field={'entryDate'} innerRef={ref} line={'COLLAPSE'}>
          {formattedEntryDate}
        </Typography.P>
      )}
    </WithInfoTooltip>
  );
};

EntryDateCell.displayName = 'EntryDateCell';

/** Компонент для отображения информации по счету клиента. */
export const AccountInfoCell: React.FC<CellProps<BankAccountingEntryCard>> = ({ value }) => {
  const {
    account: {
      bankClient: { name },
      number,
    },
  } = value;

  return (
    <>
      <WithInfoTooltip extraSmall text={name}>
        {ref => (
          <Typography.P innerRef={ref} line={'COLLAPSE'}>
            {name}
          </Typography.P>
        )}
      </WithInfoTooltip>
      <Typography.Text>{formatAccountCode(number)}</Typography.Text>
    </>
  );
};

AccountInfoCell.displayName = 'AccountInfoCell';

/** Компонент с ячейкой для отображения информации о документе.  */
export const DocumentInfoCell: React.FC<CellProps<BankAccountingEntryCard>> = ({ value }) => {
  const { documentDate, documentNumber } = value;

  return (
    <>
      <WithInfoTooltip text={documentNumber}>
        {ref => (
          <Typography.P data-field={'documentNumber'} innerRef={ref} line={'COLLAPSE'}>
            {documentNumber}
          </Typography.P>
        )}
      </WithInfoTooltip>
      <Typography.Text data-field={'documentDate'}>
        {locale.admin.entryScroller.cells.documentDate({
          date: formatDateTime(documentDate, { keepLocalTime: true, format: DATE_FORMAT }),
        })}
      </Typography.Text>
    </>
  );
};

DocumentInfoCell.displayName = 'DocumentInfoCell';

/** Компонент с ячейкой для отображения информации о контрагенте. */
export const CounterpartyInfoCell: React.FC<CellProps<BankAccountingEntryCard>> = ({ value }) => {
  const { counterpartyName, counterpartyAccountNumber } = value;

  return (
    <>
      <WithInfoTooltip extraSmall text={counterpartyName}>
        {ref => (
          <Typography.P innerRef={ref} line={'COLLAPSE'}>
            {counterpartyName}
          </Typography.P>
        )}
      </WithInfoTooltip>
      <Typography.Text>{formatAccountCode(counterpartyAccountNumber)}</Typography.Text>
    </>
  );
};

CounterpartyInfoCell.displayName = 'CounterpartyInfoCell';

/** Компонент с ячейкой для отображения суммы постапления. */
export const IncomeCell: React.FC<CellProps<BankAccountingEntryCard>> = ({ value }) => {
  const {
    incomingBalance,
    account: { currencyLetterCode },
  } = value;

  return (
    <Typography.P align={'RIGHT'} fill={'SUCCESS'}>
      {locale.moneyString.positive({ amount: String(incomingBalance), currencyCode: currencyLetterCode })}
    </Typography.P>
  );
};

IncomeCell.displayName = 'IncomeCell';

/** Компонент с ячейкой для отображения суммы списания. */
export const OutcomeCell: React.FC<CellProps<BankAccountingEntryCard>> = ({ value }) => {
  const {
    outgoingBalance,
    account: { currencyLetterCode },
  } = value;

  return (
    <Typography.P align={'RIGHT'} fill={'CRITIC'}>
      {locale.moneyString.negative({ amount: String(outgoingBalance), currencyCode: currencyLetterCode })}
    </Typography.P>
  );
};

OutcomeCell.displayName = 'OutcomeCell';

/** Компонент с ячейкой для отображения суммы поступления и списания. */
export const SummaryCell: React.FC<CellProps<BankAccountingEntryCard>> = props => (
  <>
    <IncomeCell {...props} />
    <OutcomeCell {...props} />
  </>
);

SummaryCell.displayName = 'SummaryCell';

/** Компонент с ячейкой с действиями для строки скроллера. */
export const ActionsCell: React.FC<CellProps<BankAccountingEntryCard>> = ({ value }) => {
  const { getAvailableActions } = useAuth();
  const { id } = useParams<IUrlParams>();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(CARD_ROW_ACTIONS), executor, [[value], id]), [
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
