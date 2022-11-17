import React from 'react';
import { BackButton } from 'components/common/back-button';
import { Box, Gap, Typography } from '@platform/ui';

/** Свойства компонента для отображения шапки страницы. */
export interface IPageHeader {
  /** Текст кнопки. */
  backButtonTitle: string;
  /** Функция-обработчик клика. */
  onClick(): void;
  /** Заголовок. */
  header: string;
}

/** Компонент для отображения шапки страницы. */
export const PageHeader: React.FC<IPageHeader> = ({ backButtonTitle, onClick, header }) => (
  <Box>
    <BackButton title={backButtonTitle} onClick={onClick} />
    <Gap.X2S />
    <Typography.H2>{header}</Typography.H2>
  </Box>
);

PageHeader.displayName = 'PageHeader';
