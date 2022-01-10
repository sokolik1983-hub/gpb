import type { FC } from 'react';
import React, { useContext, useMemo } from 'react';
import cn from 'classnames';
import { locale } from 'localization';
import { bigNumber } from '@platform/tools/big-number';
import { Typography, Box, Adjust, Horizon, Gap } from '@platform/ui';
import type { ITransactionScrollerContext } from '../transaction-scroller-context';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import css from './styles.scss';

/** Суммарная информация о выбранных строках таблицы. */
export const Footer: FC = () => {
  const { selectedRows, statementSummaryInfo: { currencyCode = '' } = {} } = useContext<ITransactionScrollerContext>(
    TransactionScrollerContext
  );

  const totalIncome = useMemo(() => selectedRows.reduce((acc, item) => acc.plus(item.income ?? 0), bigNumber(0)).toString(), [
    selectedRows,
  ]);

  const totalOutcome = useMemo(() => selectedRows.reduce((acc, item) => acc.plus(item.outcome ?? 0), bigNumber(0)).toString(), [
    selectedRows,
  ]);

  return (
    <Box className={cn(css.footer, Adjust.getPadClass(['MD', 'X2L']))} fill={'BASE'}>
      <Horizon>
        {/* Выбрано */}
        <Typography.P>{locale.transactionsScroller.footer.selected}</Typography.P>
        <Gap.XS />
        <Typography.PBold>{selectedRows.length}</Typography.PBold>
        <Gap.XL />
        {/* Списания */}
        <Typography.P>{locale.transactionsScroller.footer.outcome}</Typography.P>
        <Gap.XS />
        <Typography.PBold>{locale.moneyString.unsigned({ amount: totalOutcome, currencyCode })}</Typography.PBold>
        <Gap.XL />
        {/* Поступления */}
        <Typography.P>{locale.transactionsScroller.footer.income}</Typography.P>
        <Gap.XS />
        <Typography.PBold>{locale.moneyString.unsigned({ amount: totalIncome, currencyCode })}</Typography.PBold>
        <Gap.XL />
      </Horizon>
    </Box>
  );
};

Footer.displayName = 'Footer';
