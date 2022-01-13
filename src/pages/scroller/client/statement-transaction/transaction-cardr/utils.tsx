import React from 'react';
import type { ITransaction } from 'interfaces/client';
import { locale } from 'localization';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';
import type { IConfirmationOption } from '@platform/ui';
import { Typography, Box } from '@platform/ui';

/**
 * Возвращает информацию по плательщике.
 *
 * @param transaction - Проводка.
 */
export const getPayerOptions = (transaction: ITransaction): IConfirmationOption[] => {
  //  TODO: После готовности бека рассмотреть возможность, объединения реализации с getReceiverOptions
  const { payerInn, payerOrgName, payerAccountNumber, payerBankBic, payerBankName, payerBankCorrAccount } = transaction;

  return [
    {
      value: locale.transactionCard.values.agentInfo({ inn: payerInn, orgName: payerOrgName }),
      label: <Typography.PBold fill={'FAINT'}>{locale.transactionCard.labels.payer}</Typography.PBold>,
    },
    { label: locale.transactionCard.labels.agentAccountNumber, value: formatAccountCode(payerAccountNumber) },
    {
      label: locale.transactionCard.labels.bankName,
      value: (
        <Box>
          <Typography.P align={'RIGHT'}>{payerBankName}</Typography.P>
          <Typography.P align={'RIGHT'}>{locale.transactionCard.values.agentBic({ bic: payerBankBic })}</Typography.P>
          <Typography.P align={'RIGHT'}>
            {locale.transactionCard.values.agentBankCrrAccounts({ account: formatAccountCode(payerBankCorrAccount) })}
          </Typography.P>
        </Box>
      ),
    },
  ];
};

/**
 * Возвращает информацию о получателе платежа.
 *
 * @param transaction - Проводка.
 */
export const getReceiverOptions = (transaction: ITransaction): IConfirmationOption[] => {
  //  TODO: После готовности бека рассмотреть возможность, объединения реализации с getPayerOptions
  const { receiverInn, receiverOrgName, receiverAccountNumber, receiverBankBic, receiverBankName, receiverBankCorrAccount } = transaction;

  return [
    {
      value: locale.transactionCard.values.agentInfo({ inn: receiverInn, orgName: receiverOrgName }),
      label: <Typography.PBold fill={'FAINT'}>{locale.transactionCard.labels.receiver}</Typography.PBold>,
    },
    { label: locale.transactionCard.labels.agentAccountNumber, value: formatAccountCode(receiverAccountNumber) },
    {
      label: locale.transactionCard.labels.bankName,
      value: (
        <Box>
          <Typography.P align={'RIGHT'}>{receiverBankName}</Typography.P>
          <Typography.P align={'RIGHT'}>{locale.transactionCard.values.agentBic({ bic: receiverBankBic })}</Typography.P>
          <Typography.P align={'RIGHT'}>
            {locale.transactionCard.values.agentBankCrrAccounts({ account: formatAccountCode(receiverBankCorrAccount) })}
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
export const getPaymentPurposeOptions = (transaction: ITransaction): IConfirmationOption[] => {
  const { paymentPurpose, date } = transaction;

  return [
    { label: locale.transactionCard.labels.paymentPurpose, value: paymentPurpose },
    {
      label: locale.transactionCard.labels.operationDate,
      value: formatDateTime(date, { keepLocalTime: true, format: DATE_FORMAT }),
    },
  ];
};
