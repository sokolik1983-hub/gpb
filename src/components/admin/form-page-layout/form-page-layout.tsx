import type { FC } from 'react';
import React from 'react';
import { PageHeader } from 'components/common';
import { Box, Gap } from '@platform/ui';
import css from './styles.scss';

/** Свойства лэаута страницы формы. */
interface FormPageLayoutProps {
  /** Заголовок кнопки назад. */
  backButtonTitle?: string;
  /** Форма. */
  children: React.ReactElement;
  /** Текст заголовка формы. */
  header: string;
  /** Обработчик клика кнопки назад. */
  onBack?(): void;
}

/** Лэаут страницы формы. */
export const FormPageLayout: FC<FormPageLayoutProps> = ({ children, backButtonTitle, header, onBack }) => (
  <Box.Base className={css['form-page-layout']}>
    <PageHeader backButtonTitle={backButtonTitle} header={header} onClick={onBack} />
    <Gap.XL />
    {children}
  </Box.Base>
);

FormPageLayout.displayName = 'FormPageLayout';
