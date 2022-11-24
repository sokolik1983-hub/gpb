import React, { useContext } from 'react';
import { ACTION } from 'interfaces';
import { locale } from 'localization';
import { ACTIONS, Adjust, Gap, Horizon, PrimaryButton, RegularButton } from '@platform/ui';
import type { IDialogContext } from './dialog-context';
import { DialogContext } from './dialog-context';

// TODO: в рамках ТехДолга переделать футер с использованием actions из DialogTemplate

/** Подвал с кнопками на ЭФ параметров экспорта.  */
export const Footer: React.FC = () => {
  const { action } = useContext<IDialogContext>(DialogContext);
  const isDownloadButtonShow = action !== ACTION.PRINT;
  // TODO: для MVP принудительно скрываем, после - восстанавливаем
  // const isSendToEmailButtonShow = sendToEmailButtonShowCases.includes(useCase!);
  const isSendToEmailButtonShow = false;
  const isPrintButtonShow = action === ACTION.PRINT;

  return (
    <Horizon className={Adjust.getPadClass(['LG', null, null, null])}>
      {isDownloadButtonShow && (
        <PrimaryButton extraSmall dataAction={ACTIONS.UPLOAD} dimension="SM">
          {locale.exportParamsDialog.buttons.download.label}
        </PrimaryButton>
      )}
      {isPrintButtonShow && (
        <PrimaryButton extraSmall dataAction={ACTIONS.PRINT} dimension="SM">
          {locale.exportParamsDialog.buttons.print.label}
        </PrimaryButton>
      )}
      {isSendToEmailButtonShow && (
        <>
          <Gap />
          <RegularButton extraSmall dimension="SM">
            {locale.exportParamsDialog.buttons.sendToEmail.label}
          </RegularButton>
        </>
      )}
    </Horizon>
  );
};

Footer.displayName = 'Footer';
