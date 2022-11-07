import React from 'react';
import type { ITurnoverMockDto } from 'interfaces/admin/dto/turnover-mock-dto';
import { locale } from 'localization';
import { Typography, Box, Horizon, Gap } from '@platform/ui';
import css from './styles.scss';

/** Свойства футера скроллера. */
interface FooterProps {
  /** Выбранные записи в скроллере. */
  selectedRows: ITurnoverMockDto[];
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
