import React, { useCallback, useMemo, useState } from 'react';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import { formatMoney } from '@platform/tools/big-number';
import { CONTAINER_POSITION, Gap, Horizon, Link, Tooltip, Typography, WithTooltip } from '@platform/ui';

/** Список со счетами. */
export interface ITooltipPanelAccounts {
  /** Количество платежек. */
  count: number;
  /** Код валюты. */
  currency: string;
  /** Сумма по счету. */
  amount: string;
}

/** Пропсы для AccountFieldsWithTooltipPanel. */
export interface IAccountFieldsWithTooltipPanelProps {
  /** Выводить списания(true для списаний, false для поступлений). */
  isDebit: boolean;
  /** Список счетов. */
  payments: BankAccountingEntryCard[];
}

/**
 * Компонент отвечает за строку в подсказке.
 *
 * @example  <RowAccountField key={props.account} {...props} />
 */
const RowAccountField: React.FC<ITooltipPanelAccounts> = ({ currency, count, amount }) => (
  <>
    <Horizon>
      <Typography.PBold>{count}</Typography.PBold>
      <Gap.XS />
      <Typography.P>{locale.admin.transactionsScroller.footer.tooltip}</Typography.P>
      <Gap.XS />
      <Typography.PBold>{formatMoney(amount, currency)}</Typography.PBold>
      <Gap.XS />
      <Typography.PBold>{currency}</Typography.PBold>
    </Horizon>
    <Gap.SM />
  </>
);

/**
 * Компонент отвечает за отображение счетов с подсказкой.
 *
 * @example <AccountFieldsWithTooltipPanel payments={payments} />
 */
export const AccountFieldsWithTooltipPanel: React.FC<IAccountFieldsWithTooltipPanelProps> = ({ payments, isDebit }) => {
  const [show, setShow] = useState(false);

  const filteredPayments = useMemo(() => payments.filter(payment => payment.debitSign === isDebit), [isDebit, payments]);

  const handleMouseEnter = useCallback(() => setShow(true), []);

  const handleMouseLeave = useCallback(() => setShow(false), []);

  const currenciesSet = useMemo(
    () =>
      filteredPayments.reduce<Set<string>>(
        (result, payment) => result.add(isDebit ? payment.currencyNumericCodeByDebit : payment.currencyNumericCodeByCredit),
        new Set()
      ),
    [filteredPayments, isDebit]
  );

  let labelText = '';

  if (currenciesSet.size === 0) {
    labelText = locale.moneyString.unsigned({
      amount: String(0),
      currencyCode: '',
    });
  } else if (currenciesSet.size === 1) {
    const amount = filteredPayments.reduce((summary, payment) => summary + (isDebit ? payment.amountByDebit : payment.amountByCredit), 0);

    labelText = locale.moneyString.unsigned({
      amount: String(amount),
      currencyCode: isDebit ? filteredPayments[0].currencyNumericCodeByDebit : filteredPayments[0].currencyNumericCodeByCredit,
    });
  } else {
    const currencies = Array.from(currenciesSet.values());

    if (currencies.length > 3) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      labelText = locale.admin.transactionsScroller.footer.collapsedCurrencies({
        currencies: currencies.slice(3).join(', '),
        amount: String(currencies.length - 3),
      });
    } else {
      labelText = currencies.join(', ');
    }
  }

  return (
    <WithTooltip
      positioningOrder={[CONTAINER_POSITION.TOP_CENTER]}
      tooltip={({ position }) => (
        <Tooltip inverse fieldName="accountList" position={position}>
          {currenciesSet.size === 0 ? (
            <>
              <Typography.Text fill={'FAINT'}>
                {isDebit ? locale.admin.transactionsScroller.footer.income : locale.admin.transactionsScroller.footer.outcome}
              </Typography.Text>
              <Gap.XS />
              <RowAccountField amount={String(0)} count={0} currency="" />
            </>
          ) : (
            Array.from(currenciesSet.values()).reduce<React.ReactElement[]>((paymentRows, currency, index) => {
              const currencyPayments = filteredPayments.filter(payment => {
                const paymentCurrency = isDebit ? payment.currencyNumericCodeByDebit : payment.currencyNumericCodeByCredit;

                return paymentCurrency === currency;
              });
              const amount = currencyPayments.reduce(
                (summary, payment) => summary + (isDebit ? payment.amountByDebit : payment.amountByCredit),
                0
              );

              paymentRows.push(
                <>
                  <Typography.Text fill={'FAINT'}>
                    {isDebit ? locale.admin.transactionsScroller.footer.income : locale.admin.transactionsScroller.footer.outcome}
                  </Typography.Text>
                  <Gap.XS />
                  <RowAccountField key={currency} amount={String(amount)} count={currencyPayments.length} currency={currency} />
                  {currenciesSet.size - 1 > index && <Gap.XL />}
                </>
              );

              return paymentRows;
            }, [])
          )}
        </Tooltip>
      )}
      visible={show}
    >
      {tooltipRef => (
        <Horizon ref={tooltipRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Link underlined="dashed">
            <Typography.PBold fill={'ACCENT'}>{labelText}</Typography.PBold>
          </Link>
        </Horizon>
      )}
    </WithTooltip>
  );
};

AccountFieldsWithTooltipPanel.displayName = 'AccountFieldsWithTooltipPanel';
