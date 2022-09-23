import React from 'react';
import cn from 'classnames';
import { Typography } from '@platform/ui';
import css from './styles.scss';

/** Интерфейс страницы. */
interface IPaginationItemProps {
  /** Обработчик клика на элемент. */
  onClick(): void;
  /** Если true - то пользователь уже находится на этой странице. */
  isCurrent: boolean;
  /** Номер страницы на которую произойдёт переключение. */
  targetPageNumber: number;
}

/** Компонент страницы. */
export const PaginationItem: React.FC<IPaginationItemProps> = ({ targetPageNumber, onClick, isCurrent }) => {
  const Element = isCurrent ? Typography.PBold : Typography.P;

  return (
    <Element
      className={cn(css.paginationItem, isCurrent && css.currentPaginationItem)}
      fill={isCurrent ? 'BASE' : 'ACCENT'}
      onClick={isCurrent ? undefined : onClick}
    >
      {targetPageNumber}
    </Element>
  );
};

PaginationItem.displayName = 'PaginationItem';
