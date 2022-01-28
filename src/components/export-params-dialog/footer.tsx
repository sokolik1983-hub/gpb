import React, { useContext } from 'react';
import { downloadButtonShowCases, printButtonShowCases, sendToEmailButtonShowCases } from 'components/export-params-dialog/utils';
import type { IFormContext } from 'interfaces/form/form-context';
import { FormContext } from 'interfaces/form/form-context';
import { locale } from 'localization';
import { Adjust, Gap, Horizon, PrimaryButton, RegularButton } from '@platform/ui';

export const Footer: React.FC = () => {
  const { useCase } = useContext<IFormContext>(FormContext);
  const isDownloadButtonShow = downloadButtonShowCases.includes(useCase!);
  const isSendToEmailShow = sendToEmailButtonShowCases.includes(useCase!);
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
      {isSendToEmailShow && (
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
