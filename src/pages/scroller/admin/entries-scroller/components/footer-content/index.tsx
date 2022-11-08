import React, { useMemo } from 'react';
import type { BankAccountingEntryGroup } from 'interfaces/admin/dto/bank-accounting-entry-group';
import type { BankAccountingEntryTurnoverCard } from 'interfaces/admin/dto/bank-accounting-entry-turnover-card';
import { locale } from 'localization';
import { Typography, Box, Horizon, Gap } from '@platform/ui';
import { AccountFieldsWithTooltipPanel } from './account-fields-with-tooltip-panel';
import css from './styles.scss';

/** Свойства компонета с футером скроллера проводок. */
interface FooterProps {
  /** Набор выбранных проводок. */
  selectedRows: BankAccountingEntryTurnoverCard[];
}

/**
 * Проверяет, является ли карточкой бухгалтерской проводки.
 *
 * @param value - Карточка бухгалтерской проводки или группа бухгалтерских проводок.
 */
const isEntryCard = (value: BankAccountingEntryGroup | BankAccountingEntryTurnoverCard): value is BankAccountingEntryTurnoverCard =>
  !(value as BankAccountingEntryGroup).entries;

/** Компонент для вывода футера скроллера проводок. */
export const Footer: React.FC<FooterProps> = ({ selectedRows }) => {
  const entryCards = useMemo(() => selectedRows.filter(isEntryCard), [selectedRows]);

  return (
    <Box className={css.container} fill="BASE">
      <Horizon>
        <Typography.P>{locale.admin.entryScroller.footer.selected}</Typography.P>
        <Gap.XS />
        <Typography.PBold>{entryCards.length}</Typography.PBold>
        <Gap.XL />
        <Typography.P> {locale.admin.entryScroller.footer.outcome}</Typography.P>
        <Gap.XS />
        <AccountFieldsWithTooltipPanel isDebit payments={entryCards} />
        <Gap.XL />
        <Typography.P> {locale.admin.entryScroller.footer.income}</Typography.P>
        <Gap.XS />
        <AccountFieldsWithTooltipPanel isDebit={false} payments={entryCards} />
      </Horizon>
    </Box>
  );
};

Footer.displayName = 'Footer';
