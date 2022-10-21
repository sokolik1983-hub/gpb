import React, { useMemo } from 'react';
import type { IUrlParams } from 'interfaces';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import type { BankAccountingEntryGroupAggregate } from 'interfaces/admin/dto/bank-accounting-entry-group-aggregate';
import { locale } from 'localization';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { bigNumber, formatMoney } from '@platform/tools/big-number';
import { Typography, Box, Horizon, Gap } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонета с футером скроллера проводок. */
interface FooterProps {
  /** Набор выбранных проводок. */
  selectedRows: BankAccountingEntryCard[];
}

/** Вычисляет суммарный входящий остаток по заданным ст строкам. */
const getIncomeTotal = (rows: BankAccountingEntryCard[]) =>
  rows.reduce((acc, item) => acc.plus(item?.incomingBalance ?? 0), bigNumber(0)).toString();

/** Вычисляет суммарный исходящий остаток по заданным ст строкам. */
const getOutcomeTotal = (rows: BankAccountingEntryCard[]) =>
  rows.reduce((acc, item) => acc.plus(item?.outgoingBalance ?? 0), bigNumber(0)).toString();

/** Компонент для вывода футера скроллера проводок. */
export const Footer: React.FC<FooterProps> = ({ selectedRows }) => {
  const { id } = useParams<IUrlParams>();
  const queryClient = useQueryClient();

  const total = queryClient.getQueryData<BankAccountingEntryGroupAggregate[]>(['@eco/statement', 'turnoverTotalByAccount', id]);
  const currencyLetterCode = total?.[0]?.account?.currency?.letterCode ?? '';

  // суммарный входящий остаток по выбранным проводкам
  const incomeTotal = useMemo(() => getIncomeTotal(selectedRows), [selectedRows]);

  // суммарный исходящий остаток по выбранным проводкам
  const outcomeTotal = useMemo(() => getOutcomeTotal(selectedRows), [selectedRows]);

  return (
    <Box className={css.footer} fill="BASE">
      <Horizon>
        <Typography.P>{locale.admin.entryScroller.footer.selected}</Typography.P>
        <Gap.XS />
        <Typography.PBold>{selectedRows.length}</Typography.PBold>
        <Gap.XL />
        <Typography.P> {locale.admin.entryScroller.footer.income}</Typography.P>
        <Gap.XS />
        <Typography.PBold fill="ACCENT">{formatMoney(incomeTotal)}</Typography.PBold>
        <Gap.XS />
        <Typography.PBold fill="ACCENT">{currencyLetterCode}</Typography.PBold>
        <Gap.XL />
        <Typography.P> {locale.admin.entryScroller.footer.outcome}</Typography.P>
        <Gap.XS />
        <Typography.PBold fill="ACCENT">{formatMoney(outcomeTotal)}</Typography.PBold>
        <Gap.XS />
        <Typography.PBold fill="ACCENT">{currencyLetterCode}</Typography.PBold>
        <Gap.XS />
      </Horizon>
    </Box>
  );
};

Footer.displayName = 'Footer';
