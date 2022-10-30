import React, { useCallback, useMemo, useState } from 'react';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import { RUB_CURRENCY } from 'stream-constants';
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
      <Typography.P>{locale.entriesScroller.footer.tooltip}</Typography.P>
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

  const handleMouseEnter = useCallback(() => {
    if (filteredPayments.length > 0) {
      setShow(true);
    }
  }, [filteredPayments.length]);
  const handleMouseLeave = useCallback(() => {
    if (filteredPayments.length > 0) {
      setShow(false);
    }
  }, [filteredPayments.length]);
  const currenciesSet = useMemo(
    () => filteredPayments.reduce<Set<string>>((result, payment) => result.add(payment.account.currency.letterCode), new Set()),
    [filteredPayments]
  );

  let labelText = '';

  if (currenciesSet.size === 0) {
    labelText = locale.moneyString.unsigned({
      amount: String(0),
      currencyCode: RUB_CURRENCY,
    });
  } else if (currenciesSet.size === 1) {
    const amount = filteredPayments.reduce((summary, payment) => summary + (isDebit ? payment.amountDebit : payment.amountCredit), 0);

    labelText = locale.moneyString.unsigned({
      amount: String(amount),
      currencyCode: filteredPayments[0].account.currency.letterCode,
    });
  } else {
    const currencies = Array.from(currenciesSet.values());

    if (currencies.length > 3) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      labelText = locale.entriesScroller.footer.collapsedCurrencies({
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
          {Array.from(currenciesSet.values()).reduce<any[]>((paymentRows, currency, index) => {
            const currencyPayments = filteredPayments.filter(payment => payment.account.currency.letterCode === currency);
            const amount = currencyPayments.reduce(
              (summary, payment) => summary + (isDebit ? payment.amountDebit : payment.amountCredit),
              0
            );

            paymentRows.push(
              <>
                <Typography.Text fill={'FAINT'}>
                  {isDebit ? locale.admin.entryScroller.footer.income : locale.admin.entryScroller.footer.outcome}
                </Typography.Text>
                <Gap.XS />
                <RowAccountField key={currency} amount={String(amount)} count={currencyPayments.length} currency={currency} />
                {currenciesSet.size - 1 > index && <Gap.XL />}
              </>
            );

            return paymentRows;
          }, [])}
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
