import type { FC } from 'react';
import React from 'react';
import type { IExtendedActionWebInfo } from 'interfaces';
import { locale } from 'localization';
import type { TransfomedAction } from '@platform/core';
import type { IButtonAction } from '@platform/ui';
import { Horizon, Gap, PrimaryButton, RegularButton, Adjust, ServiceIcons, ACTIONS, WithDropDown, CONTAINER_POSITION } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента Footer. */
export interface IFooterProps {
  /** Действия кнопок. */
  actions: Array<TransfomedAction<IExtendedActionWebInfo>>;
  /** Действия кнопок в DropDown. */
  dropdownActions: IButtonAction[];
}

const ACTIONS_CONTAINER_POSITION = [CONTAINER_POSITION.TOP, CONTAINER_POSITION.BOTTOM];

/**
 * Футер диалога карточки проводки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32245869
 */
export const Footer: FC<IFooterProps> = ({ actions, dropdownActions }) => (
  <Horizon className={Adjust.getPadClass(['LG', null, null, null])}>
    {actions.map(action => (
      <>
        <PrimaryButton extraSmall data-name={action.name} dataAction={action.name} dimension="SM" onClick={action.onClick}>
          {action.label}
        </PrimaryButton>
        <Gap />
      </>
    ))}
    {dropdownActions.length > 0 && (
      <WithDropDown
        extraSmall
        actions={dropdownActions}
        className={css.dropdownActions}
        offset={6}
        positioningOrder={ACTIONS_CONTAINER_POSITION}
        radius="XS"
        shadow="LG"
      >
        {(ref, _, toggleOpen) => (
          <RegularButton
            ref={ref}
            extraSmall
            data-action={ACTIONS.MORE}
            dimension="SM"
            icon={ServiceIcons.ActionMenuHorizontal}
            onClick={toggleOpen}
          >
            {locale.transactionCard.buttons.more}
          </RegularButton>
        )}
      </WithDropDown>
    )}
  </Horizon>
);

Footer.displayName = 'Footer';
