import React from 'react';
import { NationalCurrencyText } from 'components/common/statement-info-content/national-currency-text';
import {
  NationalCurrencyTransactionSummary,
  SUMMARY_TYPE,
} from 'components/common/statement-info-content/national-currency-transaction-summary';
import { locale } from 'localization';
import { formatAccountCode } from '@platform/tools/localization';
import { Box, Gap, Pattern, Typography, WithInfoTooltip } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента общей информации по выписке. */
interface StatementInfoContentProps {
  /** Счёт. */
  accountNumber: string;
  /** Организация. */
  organizationName: string;
  /** Иностранная ли валюта (Нужен рублёвый эквивалент). */
  isNationalCurrency: boolean;
  /** Входящий остаток. */
  incomingBalance: number;
  /** Код валюты. */
  currencyCode: string;
  /** Входящий остаток в рублёвом эквиваленте. */
  incomingBalanceNatCurr: number;
  /** Количество списаний. */
  outcomesCount: number;
  /** Сумма списаний. */
  outcome: number;
  /** Сумма списаний в рублёвом эквиваленте. */
  outcomeNatCurr: number;
  /** Количество поступлений. */
  incomesCount: number;
  /** Сумма поступлений. */
  income: number;
  /** Сумма поступлений в рублёвом эквиваленте. */
  incomeNatCurr: number;
  /** Исходящий остаток. */
  outgoingBalance: number;
  /** Исходящий остаток в рублёвом эквиваленте. */
  outgoingBalanceNatCurr: number;
}

/** Компонент общей информации по выписке.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440034
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675666
 * */
export const StatementInfoContent = ({
  accountNumber,
  organizationName,
  incomingBalance,
  outcome,
  income,
  outcomesCount,
  incomesCount,
  outgoingBalance,
  incomingBalanceNatCurr,
  incomeNatCurr,
  outcomeNatCurr,
  outgoingBalanceNatCurr,
  isNationalCurrency,
  currencyCode,
}: StatementInfoContentProps) => (
  <Box className={css.statementInfoWrapper}>
    <Gap.SM />
    <Pattern gap={'X2L'}>
      <Pattern.Span size={4}>
        <Typography.Text className={css.titleStatementInfoItem}>{locale.transactionsScroller.labels.accountNumber}</Typography.Text>
        <Typography.P>{formatAccountCode(accountNumber)}</Typography.P>
        <Gap.XS />
        <Typography.Text className={css.titleStatementInfoItem}>{locale.transactionsScroller.labels.organizationName}</Typography.Text>
        <WithInfoTooltip text={organizationName}>
          {ref => (
            <Typography.P innerRef={ref} line={'COLLAPSE'}>
              {organizationName}
            </Typography.P>
          )}
        </WithInfoTooltip>
      </Pattern.Span>
      <Pattern.Span size={2}>
        <Typography.Text align={'RIGHT'} className={css.titleStatementInfoItem}>
          {locale.transactionsScroller.labels.incomingBalance}
        </Typography.Text>
        {isNationalCurrency && <NationalCurrencyText />}
        <Typography.P align={'RIGHT'} data-field={'statementSummaryInfo.incomingBalance'}>
          {locale.moneyString.unsigned({ amount: String(incomingBalance), currencyCode })}
        </Typography.P>
        {isNationalCurrency && <NationalCurrencyTransactionSummary amount={incomingBalanceNatCurr} type={SUMMARY_TYPE.UNSIGNED} />}
      </Pattern.Span>
      <Pattern.Span size={2}>
        <Typography.Text align={'RIGHT'} className={css.titleStatementInfoItem} data-field={'statementSummaryInfo.outcomesCount'}>
          {locale.transactionsScroller.labels.outcomeTransactions({ amount: outcomesCount })}
          {isNationalCurrency && <NationalCurrencyText />}
        </Typography.Text>
        <Typography.P align={'RIGHT'} data-field={'statementSummaryInfo.outcome'} fill={'CRITIC'}>
          {locale.moneyString.negative({ amount: String(outcome), currencyCode })}
          {isNationalCurrency && <NationalCurrencyTransactionSummary amount={outcomeNatCurr} type={SUMMARY_TYPE.NEGATIVE} />}
        </Typography.P>
      </Pattern.Span>
      <Pattern.Span size={2}>
        <Typography.Text align={'RIGHT'} className={css.titleStatementInfoItem} data-field={'statementSummaryInfo.incomesCount'}>
          {locale.transactionsScroller.labels.incomeTransactions({ amount: incomesCount })}
          {isNationalCurrency && <NationalCurrencyText />}
        </Typography.Text>
        <Typography.P align={'RIGHT'} data-field={'statementSummaryInfo.income'} fill={'SUCCESS'}>
          {locale.moneyString.positive({ amount: String(income), currencyCode })}
          {isNationalCurrency && <NationalCurrencyTransactionSummary amount={incomeNatCurr} type={SUMMARY_TYPE.POSITIVE} />}
        </Typography.P>
      </Pattern.Span>
      <Pattern.Span size={2}>
        <Typography.Text align={'RIGHT'} className={css.titleStatementInfoItem}>
          {locale.transactionsScroller.labels.outgoingBalance}
          {isNationalCurrency && <NationalCurrencyText />}
        </Typography.Text>
        <Typography.P align={'RIGHT'} data-field={'statementSummaryInfo.outgoingBalance'}>
          {locale.moneyString.unsigned({ amount: String(outgoingBalance), currencyCode })}
          {isNationalCurrency && <NationalCurrencyTransactionSummary amount={outgoingBalanceNatCurr} type={SUMMARY_TYPE.UNSIGNED} />}
        </Typography.P>
      </Pattern.Span>
    </Pattern>
    <Gap.XS />
  </Box>
);

StatementInfoContent.displayName = 'StatementInfoContent';
