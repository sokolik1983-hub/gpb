import type { FC } from 'react';
import React, { useContext } from 'react';
import { ItemWithRestInPopUp } from 'components/common';
import { locale } from 'localization';
import { EntriesScrollerContext } from 'pages/scroller/admin/entries-scroller/context';
import { Adjust, Box, Gap, Link, Pattern, Typography, useToggle } from '@platform/ui';
import css from './styles.scss';

/** Высота области с компонентом. */
export const STATEMENT_SUMMARY_HEIGHT = 88;

/** Количество отображаемых валют по умолчанию. */
const COUNT_DEFAULT_CURRENCIES = 2;

/** Сводная информация выписки. */
export const StatementSummary: FC = () => {
  const {
    statementSummary: { accountNumbers, currencyGroups, incomingCount, organizationNames, outgoingCount },
  } = useContext(EntriesScrollerContext);

  const [allCurrenciesVisible, toggleAllCurrenciesVisible] = useToggle(false);

  const visibleCurrencyGroups = allCurrenciesVisible ? currencyGroups : currencyGroups.slice(0, COUNT_DEFAULT_CURRENCIES);

  return (
    <Box className={css['statement-summary']}>
      <Pattern>
        <Pattern.Span size={3}>
          <Typography.Text fill={'FAINT'}>{locale.transactionsScroller.labels.accountNumber}</Typography.Text>
          <ItemWithRestInPopUp component={Typography.P} items={accountNumbers} />

          <Gap.XS />

          <Typography.Text fill={'FAINT'}>{locale.transactionsScroller.labels.organizationName}</Typography.Text>
          <ItemWithRestInPopUp component={Typography.P} items={organizationNames} />
        </Pattern.Span>

        <Pattern.Span size={9}>
          <Box>
            <Pattern>
              <Pattern.Span size={3}>
                <Typography.Text align={'RIGHT'} fill={'FAINT'}>
                  {locale.transactionsScroller.labels.incomingBalance}
                </Typography.Text>
              </Pattern.Span>
              <Pattern.Span size={3}>
                <Typography.Text align={'RIGHT'} fill={'FAINT'}>
                  {locale.transactionsScroller.labels.outcomeTransactions({ amount: outgoingCount })}
                </Typography.Text>
              </Pattern.Span>
              <Pattern.Span size={3}>
                <Typography.Text align={'RIGHT'} fill={'FAINT'}>
                  {locale.transactionsScroller.labels.incomeTransactions({ amount: incomingCount })}
                </Typography.Text>
              </Pattern.Span>
              <Pattern.Span size={3}>
                <Typography.Text align={'RIGHT'} fill={'FAINT'}>
                  {locale.transactionsScroller.labels.outgoingBalance}
                </Typography.Text>
              </Pattern.Span>
            </Pattern>

            <Pattern>
              {visibleCurrencyGroups.map(({ currencyCode, incomingBalance, outgoingBalance, turnoverCredit, turnoverDebit }) => (
                <>
                  <Pattern.Span size={3}>
                    <Typography.P align={'RIGHT'}>
                      {locale.moneyString.unsigned({ amount: String(incomingBalance), currencyCode })}
                    </Typography.P>
                  </Pattern.Span>
                  <Pattern.Span size={3}>
                    <Typography.P align={'RIGHT'} fill={'CRITIC'}>
                      {locale.moneyString.negative({ amount: String(turnoverDebit), currencyCode })}
                    </Typography.P>
                  </Pattern.Span>
                  <Pattern.Span size={3}>
                    <Typography.P align={'RIGHT'} fill={'SUCCESS'}>
                      {locale.moneyString.positive({ amount: String(turnoverCredit), currencyCode })}
                    </Typography.P>
                  </Pattern.Span>
                  <Pattern.Span size={3}>
                    <Typography.P align={'RIGHT'}>
                      {locale.moneyString.unsigned({ amount: String(outgoingBalance), currencyCode })}
                    </Typography.P>
                  </Pattern.Span>
                </>
              ))}
            </Pattern>

            {currencyGroups.length > COUNT_DEFAULT_CURRENCIES && (
              <Adjust hor={'RIGHT'}>
                <Link onClick={toggleAllCurrenciesVisible}>
                  {allCurrenciesVisible
                    ? locale.admin.entriesScroller.statementSummary.buttons.hideTotals
                    : locale.admin.entriesScroller.statementSummary.buttons.showTotals}
                </Link>
              </Adjust>
            )}
          </Box>
        </Pattern.Span>
      </Pattern>
    </Box>
  );
};

StatementSummary.displayName = 'StatementSummary';
