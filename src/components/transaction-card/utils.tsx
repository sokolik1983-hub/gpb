import React from 'react';
import type { IGetTransactionCardResponseDto, IAgent } from 'interfaces/dto';
import { locale } from 'localization';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import type { IConfirmationOption } from '@platform/ui';
import { Typography, Box, LayoutScroll } from '@platform/ui';
import css from './styles.scss';

/**
 * Возвращает информацию об агенте проводки.
 *
 * @param agent - Агент операции (плательщик/получатель).
 * @param title - Заголовок блока.
 */
export const getAgentOptions = (agent: IAgent, title: string): IConfirmationOption[] => {
  const { inn, name, account, bankBic, bankName, corrAccount } = agent;

  return [
    {
      value: locale.transactionCard.values.agentInfo({ inn, name }),
      label: <Typography.PBold fill={'FAINT'}>{title}</Typography.PBold>,
    },
    { label: locale.transactionCard.labels.agentAccountNumber, value: formatAccountCode(account) },
    {
      label: locale.transactionCard.labels.bankName,
      value: (
        <Box>
          <Typography.P align={'RIGHT'}>{bankName}</Typography.P>
          <Typography.P align={'RIGHT'}>{locale.transactionCard.values.agentBic({ bankBic })}</Typography.P>
          <Typography.P align={'RIGHT'}>
            {locale.transactionCard.values.agentBankCrrAccounts({ account: formatAccountCode(corrAccount) })}
          </Typography.P>
        </Box>
      ),
    },
  ];
};

/**
 * Возвращает информацию о назначении платежа.
 *
 * @param transaction - Проводка.
 */
export const getPaymentPurposeOptions = (transaction: IGetTransactionCardResponseDto): IConfirmationOption[] => {
  const { paymentPurpose, entryDate } = transaction;

  return [
    {
      label: locale.transactionCard.labels.paymentPurpose,
      value: (
        <Box className={css.paymentPurpose}>
          <LayoutScroll>{paymentPurpose}</LayoutScroll>
        </Box>
      ),
    },
    {
      label: locale.transactionCard.labels.operationDate,
      value: formatDateTime(entryDate, { keepLocalTime: true, format: DATE_FORMAT }),
    },
  ];
};
