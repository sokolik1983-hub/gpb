import React from 'react';
import { locale } from 'localization';
import { Horizon, Box, Gap, Typography, ServiceIcons, ROLE, ACTIONS } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента ToggleButton. */
interface IToggleProps {
  /** Обработчик клика по кнопки. */
  onClick(): void;
  /** Состояние переключателя. */
  isOpen: boolean;
}

/** Кнопка переключения видимости дополнительных фильтров. */
export const ToggleButton: React.FC<IToggleProps> = ({ onClick, isOpen }) => {
  const Icon = isOpen ? ServiceIcons.ChevronUp : ServiceIcons.ChevronDown;

  return (
    <Box
      clickable
      className={css.toggleButton}
      data-action={ACTIONS.OPEN}
      data-name={'additionalFilter'}
      role={ROLE.BUTTON}
      onClick={onClick}
    >
      <Horizon>
        <Box border={'FAINT'} className={css.toggleIcon} fill={'BASE'} radius={'MAX'}>
          <Icon fill={'ACCENT'} scale={'SM'} />
        </Box>
        <Gap.XS />
        <Typography.P clickable fill={'ACCENT'}>
          {isOpen ? locale.scroller.filter.buttons.collapse : locale.scroller.filter.buttons.expand}
        </Typography.P>
      </Horizon>
    </Box>
  );
};

ToggleButton.displayName = 'ToggleButton';
