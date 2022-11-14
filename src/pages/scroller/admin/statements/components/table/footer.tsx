import type { FC } from 'react';
import React from 'react';
import type { StatementHistoryRow } from 'interfaces/admin';
import { locale } from 'localization';
import { Gap, Horizon, Typography } from '@platform/ui';

/** Свойства футера таблицы выписок. */
interface FooterProps {
  /** Массив выбранных строк. */
  selectedRows: StatementHistoryRow[];
}

/** Футер таблицы выписок. */
export const Footer: FC<FooterProps> = ({ selectedRows }) => (
  <Horizon>
    <Typography.P>{locale.admin.statementScroller.footer.selected}</Typography.P>
    <Gap.XS />
    <Typography.PBold data-field={'selectedRows.length'}>{selectedRows.length}</Typography.PBold>
  </Horizon>
);

Footer.displayName = 'Footer';
