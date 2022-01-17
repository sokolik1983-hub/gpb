import type { FC } from 'react';
import React, { useMemo } from 'react';
import type { IGetTransactionCardResponseDto } from 'interfaces/client';
import { locale } from 'localization';
import { getAgentOptions, getPaymentPurposeOptions } from 'pages/scroller/client/statement-transaction/transaction-cardr/utils';
import { Confirmation, Gap, Horizon, Typography } from '@platform/ui';

/** Свойства компонента RequisitesTab. */
export interface IRequisitesTabProps {
  /** Проводка. */
  transaction: IGetTransactionCardResponseDto;
}

/**
 * Вкладка "Реквизиты" диалога "Карточка проводки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32245869
 */
export const RequisitesTab: FC<IRequisitesTabProps> = ({ transaction }) => {
  const { amount, currencyCode, payerDto, payeeDto } = transaction;

  const options = useMemo(
    () => ({
      payer: getAgentOptions(payerDto),
      payee: getAgentOptions(payeeDto),
      paymentPurpose: getPaymentPurposeOptions(transaction),
    }),
    [payeeDto, payerDto, transaction]
  );

  return (
    <>
      <Gap.XL />
      <Horizon>
        <Gap.XS />
        <Typography.P fill={'FAINT'}>{locale.transactionCard.labels.amount}</Typography.P>
        <Horizon.Spacer />
        <Typography.P>
          {locale.moneyString.unsigned({
            amount: String(amount),
            currencyCode,
          })}
        </Typography.P>
        <Gap.XS />
      </Horizon>
      <Gap />
      <Confirmation multiline options={options.payer} />
      <Gap.XL />
      <Confirmation multiline options={options.payee} />
      <Gap.XL />
      <Confirmation multiline options={options.paymentPurpose} />
    </>
  );
};

RequisitesTab.displayName = 'RequisitesTab';