import type { FC } from 'react';
import React from 'react';
import type { IGetTransactionCardResponseDto } from 'interfaces/client';
import { locale } from 'localization';
import { Horizon, Gap, PrimaryButton, RegularButton, Adjust, ServiceIcons, ACTIONS } from '@platform/ui';

/** Свойства компонента Footer. */
export interface IFooterProps {
  /** Проводка. */
  transaction: IGetTransactionCardResponseDto;
}

/**
 * Футер диалога карточки проводки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32245869
 */
export const Footer: FC<IFooterProps> = () => (
  <Horizon className={Adjust.getPadClass(['LG', null, null, null])}>
    <PrimaryButton extraSmall dimension="SM">
      {locale.transactionCard.buttons.export}
    </PrimaryButton>
    <Gap />
    <RegularButton extraSmall data-action={ACTIONS.MORE} dimension="SM" icon={ServiceIcons.ActionMenuHorizontal} rounding={'ROUND'}>
      {locale.transactionCard.buttons.more}
    </RegularButton>
  </Horizon>
);

Footer.displayName = 'Footer';
