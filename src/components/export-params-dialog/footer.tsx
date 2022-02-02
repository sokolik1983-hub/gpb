import React, { useContext } from 'react';
import { downloadButtonShowCases, printButtonShowCases } from 'components/export-params-dialog/utils';
import type { IFormContext } from 'interfaces/form/form-context';
import { FormContext } from 'interfaces/form/form-context';
import { locale } from 'localization';
import { Adjust, Gap, Horizon, PrimaryButton, RegularButton } from '@platform/ui';

// TODO: в рамках ТехДолга переделать футер с использованием actions из DialogTemplate

/** Подвал с кнопками на ЭФ параметров экспорта.  */
export const Footer: React.FC = () => {
  const { useCase } = useContext<IFormContext>(FormContext);
  const isDownloadButtonShow = downloadButtonShowCases.includes(useCase!);
  // TODO: для MVP принудительно скрываем, после - восстанавливаем
  // const isSendToEmailButtonShow = sendToEmailButtonShowCases.includes(useCase!);
  const isSendToEmailButtonShow = false;
  const isPrintButtonShow = printButtonShowCases.includes(useCase!);

  return (
    <Horizon className={Adjust.getPadClass(['LG', null, null, null])}>
      {isDownloadButtonShow && (
        <PrimaryButton extraSmall dimension="SM">
          {locale.exportParamsDialog.buttons.download.label}
        </PrimaryButton>
      )}
      {isPrintButtonShow && (
        <PrimaryButton extraSmall dimension="SM">
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
