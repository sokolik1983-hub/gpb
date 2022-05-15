import React from 'react';
import { Box, ROLE } from '@platform/ui';
import type { WebIcon } from '@platform/ui/dist-types/icons/icon';
import css from './styles.scss';

/** Свойства кнопки прокрутки таблицы. */
interface IScrollButton {
  /** Иконка на кнопке. */
  Icon: WebIcon;
  /** Обработчик клика по кнопке. */
  onClick(): void;
}

/** Кнопка прокрутки таблицы. */
export const ScrollButton: React.FC<IScrollButton> = ({ Icon, onClick }) => (
  <Box inverse className={css.scrollIconBox} fill="BASE" radius="MAX" role={ROLE.BUTTON} shadow="MD" onClick={onClick}>
    {<Icon fill={'BASE'} scale={'MD'} />}
  </Box>
);

ScrollButton.displayName = 'ScrollButton';
