import type { FC } from 'react';
import React, { useMemo, useContext } from 'react';
import { executor } from 'actions/client/executor';
import { HightlightText, StopPropagation } from 'components';
import type { CellAccessibilityInnerFocusProps } from 'components/scroller-table-view/accessibility';
import type { IUrlParams } from 'interfaces';
import type { IStatementTransactionRow } from 'interfaces/client';
import { locale } from 'localization';
import { useParams } from 'react-router-dom';
import type { CellProps } from 'react-table';
import { getActiveActionButtons, formatToMask } from 'utils';
import { DATE_FORMAT } from '@platform/services';
import { useAuth } from '@platform/services/client';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import { Gap, Horizon, MASK_INPUT_TYPE, RegularButton, ServiceIcons, Typography, WithDropDown, WithInfoTooltip } from '@platform/ui';
import { ROW_DROPDOWN_ACTIONS } from '../action-configs';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import css from './styles.scss';

/** Свойства ячейки. */
type TransactionCellProps = CellAccessibilityInnerFocusProps & CellProps<IStatementTransactionRow, IStatementTransactionRow>;

/** Дата операции. */
export const OperationDate: FC<TransactionCellProps> = ({ value: { operationDate } }) => (
  <Typography.P data-field={'operationDate'}>{formatDateTime(operationDate, { keepLocalTime: true, format: DATE_FORMAT })}</Typography.P>
);

OperationDate.displayName = 'OperationDate';

/** Информация о документе. */
export const DocumentInfo: FC<TransactionCellProps> = ({ value: { documentDate, documentNumber } }) => {
  const { filterPanel } = useContext(TransactionScrollerContext);

  const { queryString } = filterPanel.values;

  const formattedDate = formatDateTime(documentDate, { keepLocalTime: true, format: DATE_FORMAT });

  const formattedDocumentNumber = locale.transactionsScroller.labels.documentNumber({ documentNumber });

  return (
    <>
      <WithInfoTooltip text={formattedDocumentNumber}>
        {ref => (
          <Typography.P data-field={'documentNumber'} innerRef={ref} line={'COLLAPSE'}>
            <HightlightText searchWords={queryString} textToHightlight={formattedDocumentNumber} />
          </Typography.P>
        )}
      </WithInfoTooltip>
      <Typography.Text data-field={'documentDate'}>
        {locale.transactionsScroller.labels.documentDate({ date: formattedDate })}
      </Typography.Text>
    </>
  );
};

DocumentInfo.displayName = 'DocumentInfo';

/** Информация о контрагенте. */
export const CounterpartyInfo: FC<TransactionCellProps> = ({ value: { counterpartyName, counterpartyAccountNumber } }) => {
  const { filterPanel } = useContext(TransactionScrollerContext);

  const { queryString } = filterPanel.values;

  const accountMaskValue = formatToMask(queryString, MASK_INPUT_TYPE.ACCOUNT);

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
        <HightlightText searchWords={accountMaskValue.conformedValue} textToHightlight={formatAccountCode(counterpartyAccountNumber)} />
      </Typography.Text>
    </>
  );
};

CounterpartyInfo.displayName = 'CounterpartyInfo';

/** Списания. */
export const Outcome: FC<TransactionCellProps> = ({ value: { outcome, currencyCode } }) => {
  const { filterPanel } = useContext(TransactionScrollerContext);

  const { queryString } = filterPanel.values;

  const moneyMaskValue = formatToMask(queryString, MASK_INPUT_TYPE.MONEY);

  if (typeof outcome !== 'number') {
    return null;
  }

  return (
    <Typography.P align={'RIGHT'} fill={'CRITIC'}>
      <HightlightText
        searchWords={moneyMaskValue.conformedValue}
        textToHightlight={locale.moneyString.negative({ amount: String(outcome), currencyCode })}
      />
    </Typography.P>
  );
};

Outcome.displayName = 'Outcome';

/** Поступления. */
export const Income: FC<TransactionCellProps> = ({ value: { income, currencyCode } }) => {
  const { filterPanel } = useContext(TransactionScrollerContext);

  const { queryString } = filterPanel.values;

  if (typeof income !== 'number') {
    return null;
  }

  return (
    <Typography.P align={'RIGHT'} fill={'SUCCESS'}>
      <HightlightText searchWords={queryString} textToHightlight={locale.moneyString.positive({ amount: String(income), currencyCode })} />
    </Typography.P>
  );
};

Income.displayName = 'Income';

/** Действия со строкой. */
export const Actions: FC<TransactionCellProps> = ({ value: doc }) => {
  const { getAvailableActions } = useAuth();
  const { id } = useParams<IUrlParams>();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(ROW_DROPDOWN_ACTIONS), executor, [[doc], id]), [
    getAvailableActions,
    doc,
    id,
  ]);

  if (actions.length === 0) {
    return null;
  }

  const visibleActions = actions.slice(0, 1);
  const dropDownActions = actions.slice(1);

  return (
    <StopPropagation>
      <Horizon allHeight={false}>
        {visibleActions.map(({ icon, name, onClick }) => (
          <RegularButton key={name} extraSmall className={css.rowActionButton} dimension={'MC'} icon={icon} onClick={onClick} />
        ))}

        {dropDownActions.length > 0 && (
          <>
            <Gap.XS />
            <WithDropDown extraSmall actions={dropDownActions} offset={6} radius="XS" shadow="LG">
              {(ref, _, toggleOpen) => (
                <RegularButton
                  ref={ref}
                  extraSmall
                  className={css.rowActionButton}
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

Actions.displayName = 'Actions';
