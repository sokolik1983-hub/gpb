import type { FC } from 'react';
import React, { useMemo } from 'react';
import { executor } from 'actions/client/executor';
import type { IGetTransactionCardResponseDto } from 'interfaces/dto';
import { locale } from 'localization';
import { CARD_FOOTER_ACTIONS, CARD_FOOTER_DROPDOWN_ACTIONS } from 'pages/scroller/client/statement-transaction/action-configs';
import { getActiveActionButtons } from 'utils';
import { useAuth } from '@platform/services/client';
import { Horizon, Gap, PrimaryButton, RegularButton, Adjust, ServiceIcons, ACTIONS, WithDropDown, CONTAINER_POSITION } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента Footer. */
export interface IFooterProps {
  /** Проводка. */
  transaction: IGetTransactionCardResponseDto;
  /** Id запроса на выписку. */
  statementId: string;
}

const ACTIONS_CONTAINER_POSITION = [CONTAINER_POSITION.TOP, CONTAINER_POSITION.BOTTOM];

/**
 * Футер диалога карточки проводки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32245869
 */
export const Footer: FC<IFooterProps> = ({ transaction: doc, statementId: id }) => {
  const { getAvailableActions } = useAuth();

  const [action] = useMemo(() => getActiveActionButtons(getAvailableActions(CARD_FOOTER_ACTIONS), executor, [[doc], id]), [
    getAvailableActions,
    doc,
    id,
  ]);

  const otherActions = useMemo(() => {
    const activeActionButtons = getActiveActionButtons(getAvailableActions(CARD_FOOTER_DROPDOWN_ACTIONS), executor, [[doc], id]);

    return activeActionButtons.map(({ icon, ...restButtonProps }) => ({ ...restButtonProps }));
  }, [getAvailableActions, doc, id]);

  return (
    <Horizon className={Adjust.getPadClass(['LG', null, null, null])}>
      {action && (
        <>
          <PrimaryButton extraSmall data-name={action.name} dataAction={action.name} dimension="SM" onClick={action.onClick}>
            {action.label}
          </PrimaryButton>
          <Gap />
        </>
      )}
      {otherActions.length > 0 && (
        <WithDropDown
          extraSmall
          actions={otherActions}
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
