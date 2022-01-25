import type { FC } from 'react';
import React, { useState } from 'react';
import type { IStatementTransactionRow } from 'interfaces/client';
import { locale } from 'localization';
import LinesEllipsis from 'react-lines-ellipsis';
import type { CellProps } from 'react-table';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import { Typography, WithInfoTooltip } from '@platform/ui';

/** Свойства ячейки. */
type Cell = CellProps<IStatementTransactionRow, IStatementTransactionRow>;

/** Дата операции. */
export const OperationDate: FC<Cell> = ({ value }) => {
  const { operationDate } = value;

  return <Typography.Text>{formatDateTime(operationDate, { keepLocalTime: true, format: DATE_FORMAT })}</Typography.Text>;
};

OperationDate.displayName = 'OperationDate';

/** Информация о документе. */
export const DocumentInfo: FC<Cell> = ({ value }) => {
  const { documentDate, documentNumber } = value;

  const formattedDate = formatDateTime(documentDate, { keepLocalTime: true, format: DATE_FORMAT });

  return (
    <>
      <Typography.Text line={'COLLAPSE'}>{locale.transactionsScroller.labels.documentNumber({ documentNumber })}</Typography.Text>
      <Typography.SmallText>{locale.transactionsScroller.labels.documentDate({ date: formattedDate })}</Typography.SmallText>
    </>
  );
};

DocumentInfo.displayName = 'DocumentInfo';

/** Информация о контрагенте. */
export const CounterpartyInfo: FC<Cell> = ({ value }) => {
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
export const Outcome: FC<Cell> = ({ value }) => {
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
export const Income: FC<Cell> = ({ value }) => {
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
export const Purpose: FC<Cell> = ({ value }) => {
  const { purpose } = value;

  const [isShouldShowTooltip, setIShouldShowTooltip] = useState<boolean>(false);

  const handleReflow = rleState => {
    setIShouldShowTooltip(rleState.clamped);
  };

  return (
    <WithInfoTooltip text={purpose}>
      {ref => (
        <Typography.SmallText innerRef={ref}>
          <LinesEllipsis trimRight basedOn="letters" ellipsis="…" maxLine="2" text={purpose} onReflow={handleReflow} />

          {/*
            Компонент WithInfoTooltip всегда отображает тултип при наведении на элемент,
            если в нём нет элемента со стилем "text-overflow: ellipsis" (поэтому передаётся undefined).
            А если такой элемент есть, то отображает только если содержимое не помещается в элемент,
            а т.к. содержимое усечено, то оно помещается в элемент, и тултип не отображается.
          */}
          <div style={{ textOverflow: isShouldShowTooltip ? undefined : 'ellipsis' }} />
        </Typography.SmallText>
      )}
    </WithInfoTooltip>
  );
};

Purpose.displayName = 'Purpose';
