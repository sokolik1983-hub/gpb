import type { FC } from 'react';
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { executor } from 'actions/client/executor';
import clamp from 'clamp-js-main';
import type { IStatementTransactionRow } from 'interfaces/client';
import { locale } from 'localization';
import type { CellProps } from 'react-table';
import { getActiveActionButtons } from 'utils';
import { DATE_FORMAT } from '@platform/services';
import { useAuth } from '@platform/services/client';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import { ServiceIcons, Typography, WithDropDown, WithInfoTooltip, Box, ACTIONS } from '@platform/ui';
import { ROW_DROPDOWN_ACTIONS } from '../action-configs';
import css from './styles.scss';

/** Свойства ячейки. */
export type TransactionCellProps = CellProps<IStatementTransactionRow, IStatementTransactionRow>;

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

  const formattedDate = formatDateTime(documentDate, { keepLocalTime: true, format: DATE_FORMAT });

  const formattedDocumentNumber = locale.transactionsScroller.labels.documentNumber({ documentNumber });

  return (
    <>
      <WithInfoTooltip text={formattedDocumentNumber}>
        {ref => (
          <Typography.Text data-field={'documentNumber'} innerRef={ref} line={'COLLAPSE'}>
            {formattedDocumentNumber}
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

  return (
    <>
      <WithInfoTooltip text={counterpartyName}>
        {ref => (
          <Typography.Text innerRef={ref} line={'COLLAPSE'}>
            {counterpartyName}
          </Typography.Text>
        )}
      </WithInfoTooltip>
      <Typography.SmallText>{formatAccountCode(counterpartyAccountNumber)}</Typography.SmallText>
    </>
  );
};

CounterpartyInfo.displayName = 'CounterpartyInfo';

/** Списания. */
export const Outcome: FC<TransactionCellProps> = ({ value }) => {
  const { outcome, currencyCode } = value;

  if (typeof outcome !== 'number') {
    return null;
  }

  return (
    <Typography.Text align={'RIGHT'} fill={'CRITIC'}>
      {locale.moneyString.negative({ amount: String(outcome), currencyCode })}
    </Typography.Text>
  );
};

Outcome.displayName = 'Outcome';

/** Поступления. */
export const Income: FC<TransactionCellProps> = ({ value }) => {
  const { income, currencyCode } = value;

  if (typeof income !== 'number') {
    return null;
  }

  return (
    <Typography.Text align={'RIGHT'} fill={'SUCCESS'}>
      {locale.moneyString.positive({ amount: String(income), currencyCode })}
    </Typography.Text>
  );
};

Income.displayName = 'Income';

/** Назначение платежа. */
export const Purpose: FC<TransactionCellProps> = ({ value }) => {
  const { purpose } = value;

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
    <WithInfoTooltip text={purpose}>
      {ref => (
        <Typography.SmallText innerRef={ref}>
          {/*
            Компонент WithInfoTooltip всегда отображает тултип при наведении,
            если в нём нет элемента со стилем "text-overflow: ellipsis" (поэтому передаётся undefined).
            А если такой элемент есть, то отображает только если содержимое не помещается в элемент,
            т.к. содержимое усечено, то оно помещается в элемент, и тултип не отображается.
          */}
          <div ref={clampedElementRef} style={{ textOverflow: isShouldShowTooltip ? undefined : 'ellipsis' }}>
            {purpose}
          </div>
        </Typography.SmallText>
      )}
    </WithInfoTooltip>
  );
};

Purpose.displayName = 'Purpose';

/** Действия со строкой. */
export const Actions: FC<TransactionCellProps> = ({ value }) => {
  const { getAvailableActions } = useAuth();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(ROW_DROPDOWN_ACTIONS), executor, [value]), [
    getAvailableActions,
    value,
  ]);

  if (actions.length === 0) {
    return null;
  }

  return (
    <WithDropDown extraSmall actions={actions} className={css.rowDropdownActions} offset={6} radius="XS" shadow="LG">
      {(ref, _, toggleOpen) => (
        <Box ref={ref} className={css.actionsRowButton} data-action={ACTIONS.MORE} onClick={toggleOpen}>
          <Box className={css.actionsIconWrapper}>
            <ServiceIcons.ActionMenuHorizontal clickable fill={'FAINT'} scale={30} />
          </Box>
        </Box>
      )}
    </WithDropDown>
  );
};

Actions.displayName = 'Actions';
