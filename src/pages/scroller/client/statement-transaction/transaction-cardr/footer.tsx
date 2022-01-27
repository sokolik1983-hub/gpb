import type { FC } from 'react';
import React, { useMemo } from 'react';
import { executor } from 'actions/client/executor';
import type { IGetTransactionCardResponseDto } from 'interfaces/client';
import { locale } from 'localization';
import { getActiveActionButtons } from 'utils';
import { useAuth } from '@platform/services/client';
import { Horizon, Gap, PrimaryButton, RegularButton, Adjust, ServiceIcons, ACTIONS, WithDropDown, CONTAINER_POSITION } from '@platform/ui';
import { CARD_FOOTER_DROPDOWN_ACTIONS, CARD_FOOTER_ACTIONS } from '../action-configs';
import css from './styles.scss';

/** Свойства компонента Footer. */
export interface IFooterProps {
  /** Проводка. */
  transaction: IGetTransactionCardResponseDto;
}

const ACTIONS_CONTAINER_POSITION = [CONTAINER_POSITION.TOP, CONTAINER_POSITION.BOTTOM];

/**
 * Футер диалога карточки проводки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32245869
 */
export const Footer: FC<IFooterProps> = () => {
  const { getAvailableActions } = useAuth();

  const [action] = useMemo(() => getActiveActionButtons(getAvailableActions(CARD_FOOTER_ACTIONS), executor, []), [getAvailableActions]);

  const dropDownActions = useMemo(() => getActiveActionButtons(getAvailableActions(CARD_FOOTER_DROPDOWN_ACTIONS), executor, []), [
    getAvailableActions,
  ]);

  return (
    <Horizon className={Adjust.getPadClass(['LG', null, null, null])}>
      {action && (
        <>
          <PrimaryButton extraSmall data-action={action.name} data-name={action.name} dimension="SM" onClick={action.onClick}>
            {action.label}
          </PrimaryButton>
          <Gap />
        </>
      )}
      {dropDownActions.length > 0 && (
        <WithDropDown
          extraSmall
          actions={dropDownActions}
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
};

Footer.displayName = 'Footer';
