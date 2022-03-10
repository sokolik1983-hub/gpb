import React, { useContext } from 'react';
import type { IDialogContext } from 'components/export-params-dialog/dialog-context';
import { DialogContext } from 'components/export-params-dialog/dialog-context';
import { locale } from 'localization';
import { downloadButtonShowCases, printButtonShowCases } from 'utils/export-params-dialog';
import { Adjust, Gap, Horizon, PrimaryButton, RegularButton, ACTIONS } from '@platform/ui';

// TODO: в рамках ТехДолга переделать футер с использованием actions из DialogTemplate

/** Подвал с кнопками на ЭФ параметров экспорта.  */
export const Footer: React.FC = () => {
  const { useCase } = useContext<IDialogContext>(DialogContext);
  const isDownloadButtonShow = downloadButtonShowCases.includes(useCase!);
  // TODO: для MVP принудительно скрываем, после - восстанавливаем
  // const isSendToEmailButtonShow = sendToEmailButtonShowCases.includes(useCase!);
  const isSendToEmailButtonShow = false;
  const isPrintButtonShow = printButtonShowCases.includes(useCase!);

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
