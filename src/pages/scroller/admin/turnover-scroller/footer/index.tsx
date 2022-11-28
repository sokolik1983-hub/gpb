import React from 'react';
import type { TurnoverCard } from 'interfaces/admin/dto/turnover';
import { locale } from 'localization';
import { Typography, Box, Horizon, Gap } from '@platform/ui';
import css from './styles.scss';

/** Свойства футера скроллера. */
interface FooterProps {
  /** Выбранные записи. */
  selectedRows: TurnoverCard[];
}

/** Компонент для вывода футера скроллера проводок. */
export const Footer: React.FC<FooterProps> = ({ selectedRows }) => (
  <Box className={css.container} fill="BASE">
    <Horizon>
      <Typography.P>{locale.common.footer.selected}</Typography.P>
      <Gap.XS />
      <Typography.PBold>{selectedRows.length}</Typography.PBold>
    </Horizon>
  </Box>
);

Footer.displayName = 'Footer';
