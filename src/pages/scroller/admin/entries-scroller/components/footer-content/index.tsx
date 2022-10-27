import React from 'react';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { locale } from 'localization';
import { Typography, Box, Horizon, Gap } from '@platform/ui';
import { AccountFieldsWithTooltipPanel } from './account-fields-with-tooltip-panel';
import css from './styles.scss';

/** Свойства компонета с футером скроллера проводок. */
interface FooterProps {
  /** Набор выбранных проводок. */
  selectedRows: BankAccountingEntryCard[];
}
/** Компонент для вывода футера скроллера проводок. */
export const Footer: React.FC<FooterProps> = ({ selectedRows }) => (
  <Box className={css.container} fill="BASE">
    <Horizon>
      <Typography.P>{locale.admin.entryScroller.footer.selected}</Typography.P>
      <Gap.XS />
      <Typography.PBold>{selectedRows.length}</Typography.PBold>
      <Gap.XL />
      <Typography.P> {locale.admin.entryScroller.footer.outcome}</Typography.P>
      <Gap.XS />
      <AccountFieldsWithTooltipPanel isDebit payments={selectedRows} />
      <Gap.XL />
      <Typography.P> {locale.admin.entryScroller.footer.income}</Typography.P>
      <Gap.XS />
      <AccountFieldsWithTooltipPanel isDebit={false} payments={selectedRows} />
    </Horizon>
  </Box>
);

Footer.displayName = 'Footer';
