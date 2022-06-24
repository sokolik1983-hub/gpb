import type { MouseEventHandler } from 'react';
import React, { useCallback } from 'react';
import { locale } from 'localization';
import { Typography, ServiceIcons, Link, Box } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента ToggleButton. */
interface IToggleProps {
  /** Обработчик клика по кнопки. */
  onClick(): void;
  /** Состояние переключателя. */
  opened: boolean;
}

/** Кнопка переключения видимости дополнительных фильтров. */
export const ToggleButton: React.FC<IToggleProps> = ({ onClick, opened }) => {
  const handleClick: MouseEventHandler = useCallback(
    event => {
      event.preventDefault();

      onClick();
    },
    [onClick]
  );

  return (
    <Box className={css.linkFocusable}>
      <Link iconBorder href="" icon={opened ? ServiceIcons.ChevronUp : ServiceIcons.ChevronDown} onClick={handleClick}>
        <Typography.P fill={'ACCENT'}>
          {opened ? locale.scroller.filter.buttons.collapse : locale.scroller.filter.buttons.expand}
        </Typography.P>
      </Link>
    </Box>
  );
};

ToggleButton.displayName = 'ToggleButton';
