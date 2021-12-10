import type { FC } from 'react';
import React, { useContext } from 'react';
import { ScrollerLoadingOverlay } from 'components';
import { locale } from 'localization';
import { TurnoverScrollerContext } from 'pages/scroller/client/statement-turnover/turnover-scroller-context';
import { Box, useToggle, Typography, Gap } from '@platform/ui';
import css from './styles.scss';

/** Суммарные остатки и обороты по валютам. */
export const Totals: FC = () => {
  const {
    turnovers: { total },
    isLoading,
  } = useContext(TurnoverScrollerContext);

  const [isAllTotalVisible, toggleIsAllTotalVisible] = useToggle(false);

  const visibleTotals = isAllTotalVisible ? total : total.slice(0, 2);

  if (total.length === 0) {
    return null;
  }

  return (
    <Box className={css.totalsWrapper}>
      {/* Шапка таблицы. */}
      <Box className={css.totalsRow}>
        <Box className={css.totalsCell}>
          <Typography.Text align={'RIGHT'} fill={'FAINT'}>
            {locale.turnoverScroller.headers.incomingBalance}
          </Typography.Text>
        </Box>
        <Box className={css.totalsCell}>
          <Typography.Text align={'RIGHT'} fill={'FAINT'}>
            {locale.turnoverScroller.headers.outcome}
          </Typography.Text>
        </Box>
        <Box className={css.totalsCell}>
          <Typography.Text align={'RIGHT'} fill={'FAINT'}>
            {locale.turnoverScroller.headers.income}
          </Typography.Text>
        </Box>
        <Box className={css.totalsCell}>
          <Typography.Text align={'RIGHT'} fill={'FAINT'}>
            {locale.turnoverScroller.headers.outgoingBalance}
          </Typography.Text>
        </Box>
      </Box>

      {/* Строки таблицы */}
      <Box className={css.totalsRowWrapper}>
        {visibleTotals.map(({ income, currencyCode, outcome, outgoingBalance, incomingBalance }) => (
          <Box key={currencyCode} className={css.totalsRow}>
            <Box className={css.totalsCell}>
              <Typography.Text align={'RIGHT'}>{locale.moneyString.unsigned({ amount: incomingBalance, currencyCode })}</Typography.Text>
            </Box>
            <Box className={css.totalsCell}>
              <Typography.Text align={'RIGHT'} fill={'CRITIC'}>
                {locale.moneyString.negative({ amount: outcome, currencyCode })}
              </Typography.Text>
            </Box>
            <Box className={css.totalsCell}>
              <Typography.Text align={'RIGHT'} fill={'SUCCESS'}>
                {locale.moneyString.positive({ amount: income, currencyCode })}
              </Typography.Text>
            </Box>
            <Box className={css.totalsCell}>
              <Typography.Text align={'RIGHT'}>{locale.moneyString.unsigned({ amount: outgoingBalance, currencyCode })}</Typography.Text>
            </Box>
          </Box>
        ))}
        {isLoading && <ScrollerLoadingOverlay />}
      </Box>

      {/* Кнопка управления видимостью строк. */}
      {total.length > 2 && (
        <>
          <Gap.XS />
          <Box className={css.totalsRow}>
            <Box className={css.totalsCell}>
              <Typography.Text clickable inline fill={'ACCENT'} onClick={toggleIsAllTotalVisible}>
                {isAllTotalVisible ? locale.turnoverScroller.buttons.hideTotals : locale.turnoverScroller.buttons.showTotals}
              </Typography.Text>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

Totals.displayName = 'Totals';
