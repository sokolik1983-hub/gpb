import React from 'react';
import { BackButton } from 'components/common/back-button';
import { Box, Gap, Typography } from '@platform/ui';

/** Свойства компонента отображения шапки страницы. */
export interface IPageHeader {
  /** Текст кнопки "Назад". */
  backButtonTitle?: string;
  // TODO: Код взят из develop ветки, реализованной командой Tern. Необходимо переименовать в onBack. onClick логичнее для самого заголовка как то.
  /** Обработчик клика по кнопке "Назад". */
  onClick?(): void;
  /** Заголовок. */
  header: string;
}

/** Компонент отображения шапки страницы. */
export const PageHeader: React.FC<IPageHeader> = ({ backButtonTitle, onClick, header }) => (
  <Box>
    {onClick && backButtonTitle && (
      <>
        <BackButton title={backButtonTitle} onClick={onClick} />
        <Gap.X2S />
      </>
    )}
    <Typography.H2>{header}</Typography.H2>
  </Box>
);

PageHeader.displayName = 'PageHeader';
