import type { FC } from 'react';
import React from 'react';
import type { ITransaction } from 'interfaces/client';
import { locale } from 'localization';
import { Horizon, Gap, PrimaryButton, RegularButton, Adjust } from '@platform/ui';

/** Свойства компонента Footer. */
export interface IFooterProps {
  /** Проводка. */
  transaction: ITransaction;
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
    <RegularButton extraSmall dimension="SM">
      {locale.transactionCard.buttons.sendToEmail}
    </RegularButton>
  </Horizon>
);

Footer.displayName = 'Footer';
