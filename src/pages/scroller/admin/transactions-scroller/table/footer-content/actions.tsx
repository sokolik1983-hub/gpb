import type { FC } from 'react';
import React, { Fragment } from 'react';
import type { IButtonAction } from '@platform/ui';
import { Box, BUTTON, Gap, PrimaryButton, RegularButton, SIZE } from '@platform/ui';
import styles from './styles.scss';

/** Пропсы для Actions. */
export interface IActionButtonsProps {
  /** Массив actions. */
  actions: IButtonAction[];
}

/**
 * Компонент со списком кнопок действий.
 */
export const Actions: FC<IActionButtonsProps> = ({ actions }) => (
  <Box className={styles.actionsContainer}>
    {actions.map((action, index) => {
      const ButtonComponent = action.buttonType === BUTTON.PRIMARY ? PrimaryButton : RegularButton;
      const button = (
        <ButtonComponent
          extraSmall
          dataAction={action.name}
          dimension="SM"
          disabled={action.disabled}
          icon={action.icon}
          rounding={'ROUND'}
          onClick={action.onClick}
        >
          {action.label}
        </ButtonComponent>
      );

      if (index === 0) {
        return button;
      }

      return (
        <Fragment key={action.name}>
          <Gap size={SIZE.XS} />
          {button}
        </Fragment>
      );
    })}
  </Box>
);

Actions.displayName = 'Actions';
