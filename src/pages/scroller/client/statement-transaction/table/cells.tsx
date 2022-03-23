import type { FC } from 'react';
import React, { useState, useEffect, useRef, useMemo, useContext } from 'react';
import { executor } from 'actions/client/executor';
import clamp from 'clamp-js-main';
import { HightlightText, StopPropagation } from 'components';
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
import { ServiceIcons, Typography, WithDropDown, WithInfoTooltip, Box, ACTIONS, MASK_INPUT_TYPE } from '@platform/ui';
import { CONTAINER_POSITION } from '@platform/ui/dist-types/floating/container';
import { ROW_DROPDOWN_ACTIONS } from '../action-configs';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import css from './styles.scss';

/** Свойства ячейки. */
type TransactionCellProps = CellProps<IStatementTransactionRow, IStatementTransactionRow>;

/** Дата операции. */
export const OperationDate: FC<TransactionCellProps> = ({ value }) => {
  const { operationDate } = value;

  return (
    <Typography.Text data-field={'operationDate'}>
      {formatDateTime(operationDate, { keepLocalTime: true, format: DATE_FORMAT })}
    </Typography.Text>
  );
};

OperationDate.displayName = 'OperationDate';

/** Информация о документе. */
export const DocumentInfo: FC<TransactionCellProps> = ({ value }) => {
  const { documentDate, documentNumber } = value;

  const { filterPanel } = useContext(TransactionScrollerContext);

  const { queryString } = filterPanel.values;

  const formattedDate = formatDateTime(documentDate, { keepLocalTime: true, format: DATE_FORMAT });

  const formattedDocumentNumber = locale.transactionsScroller.labels.documentNumber({ documentNumber });

  return (
    <>
      <WithInfoTooltip text={formattedDocumentNumber}>
        {ref => (
          <Typography.Text data-field={'documentNumber'} innerRef={ref} line={'COLLAPSE'}>
            <HightlightText searchWords={queryString} textToHightlight={formattedDocumentNumber} />
          </Typography.Text>
        )}
      </WithInfoTooltip>
      <Typography.SmallText data-field={'documentDate'}>
        {locale.transactionsScroller.labels.documentDate({ date: formattedDate })}
      </Typography.SmallText>
    </>
  );
};

DocumentInfo.displayName = 'DocumentInfo';

/** Информация о контрагенте. */
export const CounterpartyInfo: FC<TransactionCellProps> = ({ value }) => {
  const { counterpartyName, counterpartyAccountNumber } = value;

  const { filterPanel } = useContext(TransactionScrollerContext);

  const { queryString } = filterPanel.values;

  const accountMaskValue = formatToMask(queryString, MASK_INPUT_TYPE.ACCOUNT);

  return (
    <>
      <WithInfoTooltip extraSmall text={counterpartyName}>
        {ref => (
          <Typography.Text innerRef={ref} line={'COLLAPSE'}>
            <HightlightText searchWords={queryString} textToHightlight={counterpartyName} />
          </Typography.Text>
        )}
      </WithInfoTooltip>
      <Typography.SmallText>
        <HightlightText searchWords={accountMaskValue.conformedValue} textToHightlight={formatAccountCode(counterpartyAccountNumber)} />
      </Typography.SmallText>
    </>
  );
};

CounterpartyInfo.displayName = 'CounterpartyInfo';

/** Списания. */
export const Outcome: FC<TransactionCellProps> = ({ value }) => {
  const { outcome, currencyCode } = value;

  const { filterPanel } = useContext(TransactionScrollerContext);

  const { queryString } = filterPanel.values;

  const moneyMaskValue = formatToMask(queryString, MASK_INPUT_TYPE.MONEY);

  if (typeof outcome !== 'number') {
    return null;
  }

  return (
    <Typography.Text align={'RIGHT'} fill={'CRITIC'}>
      <HightlightText
        searchWords={moneyMaskValue.conformedValue}
        textToHightlight={locale.moneyString.negative({ amount: String(outcome), currencyCode })}
      />
    </Typography.Text>
  );
};

Outcome.displayName = 'Outcome';

/** Поступления. */
export const Income: FC<TransactionCellProps> = ({ value }) => {
  const { income, currencyCode } = value;

  const { filterPanel } = useContext(TransactionScrollerContext);

  const { queryString } = filterPanel.values;

  if (typeof income !== 'number') {
    return null;
  }

  return (
    <Typography.Text align={'RIGHT'} fill={'SUCCESS'}>
      <HightlightText searchWords={queryString} textToHightlight={locale.moneyString.positive({ amount: String(income), currencyCode })} />
    </Typography.Text>
  );
};

Income.displayName = 'Income';

/** Назначение платежа. */
export const Purpose: FC<TransactionCellProps> = ({ value }) => {
  const { purpose } = value;

  const { filterPanel } = useContext(TransactionScrollerContext);

  const { queryString } = filterPanel.values;

  const [isShouldShowTooltip, setIsShouldShowTooltip] = useState<boolean>(false);

  const clampedElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (clampedElementRef.current) {
      clamp(clampedElementRef.current, { clamp: 2, useNativeClamp: false });

      const textContent = clampedElementRef.current.innerText;

      /** Если текст оканчивается на символ '…', то значит он был усечён, и надо отображать тултип. */
      if (textContent.match(/…$/)) {
        setIsShouldShowTooltip(true);
      }
    }
  }, []);

  return (
    <WithInfoTooltip
      positioningOrder={[CONTAINER_POSITION.LEFT_END, CONTAINER_POSITION.LEFT_CENTER, CONTAINER_POSITION.LEFT]}
      text={purpose}
    >
      {ref => (
        <Typography.SmallText innerRef={ref}>
          {/*
            Компонент WithInfoTooltip всегда отображает тултип при наведении,
            если в нём нет элемента со стилем "text-overflow: ellipsis" (поэтому передаётся undefined).
            А если такой элемент есть, то отображает только если содержимое не помещается в элемент,
            т.к. содержимое усечено, то оно помещается в элемент, и тултип не отображается.
          */}
          <div ref={clampedElementRef} style={{ textOverflow: isShouldShowTooltip ? undefined : 'ellipsis' }}>
            <HightlightText searchWords={queryString} textToHightlight={purpose} />
          </div>
        </Typography.SmallText>
      )}
    </WithInfoTooltip>
  );
};

Purpose.displayName = 'Purpose';

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

  return (
    <StopPropagation>
      <WithDropDown extraSmall actions={actions} className={css.rowDropdownActions} offset={6} radius="XS" shadow="LG">
        {(ref, _, toggleOpen) => (
          <Box ref={ref} className={css.actionsRowButton} data-action={ACTIONS.MORE} onClick={toggleOpen}>
            <Box className={css.actionsIconWrapper}>
              <ServiceIcons.ActionMenuHorizontal clickable fill={'FAINT'} scale={30} />
            </Box>
          </Box>
        )}
      </WithDropDown>
    </StopPropagation>
  );
};

Actions.displayName = 'Actions';
