import React from 'react';
import type { BankAccountingEntryTurnoverCard } from 'interfaces/admin/dto/bank-accounting-entry-turnover-card';
import { locale } from 'localization';
import { Typography, Box, Horizon, Gap } from '@platform/ui';
import { AccountFieldsWithTooltipPanel } from './account-fields-with-tooltip-panel';
import css from './styles.scss';

/** Свойства компонета с футером ЭФ Банка "Журнал проводок удаленных/добавленных". */
interface ContentProps {
  /** Набор выбранных проводок. */
  selectedRows: BankAccountingEntryTurnoverCard[];
}

/** Компонент для вывода футера ЭФ Банка "Журнал проводок удаленных/добавленных". */
export const Content: React.FC<ContentProps> = ({ selectedRows }) => (
  <Box className={css.container} fill="BASE">
    <Horizon>
      <Typography.P>{locale.admin.transactionsScroller.footer.selected}</Typography.P>
      <Gap.XS />
      <Typography.PBold>{selectedRows.length}</Typography.PBold>
      <Gap.XL />
      <Typography.P> {locale.admin.transactionsScroller.footer.outcome}</Typography.P>
      <Gap.XS />
      <AccountFieldsWithTooltipPanel isDebit payments={selectedRows} />
      <Gap.XL />
      <Typography.P> {locale.admin.transactionsScroller.footer.income}</Typography.P>
      <Gap.XS />
      <AccountFieldsWithTooltipPanel isDebit={false} payments={selectedRows} />
    </Horizon>
  </Box>
);

Content.displayName = 'Content';
