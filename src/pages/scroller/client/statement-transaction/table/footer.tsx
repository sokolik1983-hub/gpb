import React, { useContext, useMemo } from 'react';
import type { IStatementTransactionRow } from 'interfaces/client';
import { locale } from 'localization';
import { bigNumber } from '@platform/tools/big-number';
import { Typography, Box, Horizon, Gap } from '@platform/ui';
import type { ITransactionScrollerContext } from '../transaction-scroller-context';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import css from './styles.scss';

/** Свойства компонента с суммарной информацией о выбранных строках таблицы. */
interface FooterProps {
  /** Список выбранных строк таблицы скроллера проводок. */
  selectedRows: IStatementTransactionRow[];
}

/** Суммарная информация о выбранных строках таблицы. */
export const Footer: React.FC<FooterProps> = ({ selectedRows }) => {
  const { statementSummaryInfo: { currencyCode = '' } = {} } = useContext<ITransactionScrollerContext>(TransactionScrollerContext);

  const totalIncome = useMemo(() => selectedRows.reduce((acc, item) => acc.plus(item.income ?? 0), bigNumber(0)).toString(), [
    selectedRows,
  ]);
  const totalOutcome = useMemo(() => selectedRows.reduce((acc, item) => acc.plus(item.outcome ?? 0), bigNumber(0)).toString(), [
    selectedRows,
  ]);

  return (
    <Box className={css.footer} fill={'BASE'}>
      <Horizon>
        {/* Выбрано */}
        <Typography.P>{locale.transactionsScroller.footer.selected}</Typography.P>
        <Gap.XS />
        <Typography.PBold data-field={'selectedRows.length'}>{selectedRows.length}</Typography.PBold>
        <Gap.XL />
        {/* Списания */}
        <Typography.P>{locale.transactionsScroller.footer.outcome}</Typography.P>
        <Gap.XS />
        <Typography.PBold data-field={'outcome'}>{locale.moneyString.unsigned({ amount: totalOutcome, currencyCode })}</Typography.PBold>
        <Gap.XL />
        {/* Поступления */}
        <Typography.P>{locale.transactionsScroller.footer.income}</Typography.P>
        <Gap.XS />
        <Typography.PBold data-field={'income'}>{locale.moneyString.unsigned({ amount: totalIncome, currencyCode })}</Typography.PBold>
        <Horizon.Spacer />
      </Horizon>
    </Box>
  );
};

Footer.displayName = 'Footer';
