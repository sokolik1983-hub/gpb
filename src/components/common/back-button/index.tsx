import React from 'react';
import { Gap, ServiceIcons, Typography, Horizon } from '@platform/ui';

/** Свойства компонента "Кнопка назад". */
export interface IBackButton {
  /** Текст кнопки. */
  title: string;
  /** Функция-обработчик клика. */
  onClick(): void;
}

/** Компонент "Кнопка назад". */
export const BackButton: React.FC<IBackButton> = ({ onClick, title }) => (
  <Horizon>
    <ServiceIcons.ArrowLeftSimple fill={'ACCENT'} scale={'SM'} />
    <Gap.X2S />
    <Typography.Text fill={'ACCENT'} style={{ cursor: 'pointer' }} onClick={onClick}>
      {title}
    </Typography.Text>
  </Horizon>
);

BackButton.displayName = 'BackButton';
