import React, { useCallback, useContext } from 'react';
import type { IDialogContext } from 'components/export-params-dialog/dialog-context';
import { DialogContext } from 'components/export-params-dialog/dialog-context';
import { CreationParams } from 'components/form/creation-params';
import { DetailDocumentsParams } from 'components/form/detail-documents-params';
import { Email } from 'components/form/email';
import { FileFormats } from 'components/form/file-formats';
import type { IFormState } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { FormProvider } from 'pages/form/client/form-provider';
import type { FormRenderProps } from 'react-final-form';
import { noop } from 'utils';
import { creationParamsShowCases, detailDocumentsParamsShowCases, exportCases, fileFormatShowCases } from 'utils/export-params-dialog';
import { BUTTON, DATA_TYPE, DialogTemplate } from '@platform/ui';

/** Содержимое модального окна ЭФ параметров выписки и документов. */
export const Content: React.FC<FormRenderProps<IFormState>> = ({ handleSubmit }) => {
  const { onClose, useCase } = useContext<IDialogContext>(DialogContext);
  const isExport = exportCases.includes(useCase);
  // TODO: для MVP принудительно скрываем, после - восстанавливаем
  const isEmailShow = false;
  const isSendToEmailButtonShow = false;
  const isFileFormatsShow = fileFormatShowCases.includes(useCase);
  const isCreationParamsShow = creationParamsShowCases.includes(useCase);
  const isDetailDocumentsParamsShow = detailDocumentsParamsShowCases.includes(useCase);

  /** Кнопки модального окна. */
  const getActions = useCallback(() => {
    /** Конфиг для экшона экспорта выписки / документов выписки. */
    const DOWNLOAD = {
      name: 'download',
      label: locale.exportParamsDialog.buttons.download.label,
      onClick: handleSubmit,
      buttonType: BUTTON.PRIMARY,
      extraSmall: true,
    };

    // TODO: для MVP не используется
    /** Конфиг для экшона отправки выписки / документов выписки на электронную почту. */
    const SEND_TO_EMAIL = {
      name: 'sendToEmail',
      label: locale.exportParamsDialog.buttons.sendToEmail.label,
      onClick: noop,
      buttonType: BUTTON.REGULAR,
      extraSmall: true,
    };

    /** Конфиг для экшона печати выписки / документов выписки. */
    const PRINT = {
      name: 'print',
      label: locale.exportParamsDialog.buttons.print.label,
      onClick: handleSubmit,
      buttonType: BUTTON.PRIMARY,
      extraSmall: true,
    };

    if (isExport) {
      if (isSendToEmailButtonShow) {
        return [DOWNLOAD, SEND_TO_EMAIL];
      }

      return [DOWNLOAD];
    }

    return [PRINT];
  }, [handleSubmit, isExport, isSendToEmailButtonShow]);

  const actions = getActions();

  return (
    <DialogTemplate
      extraSmall
      actions={actions}
      content={
        <FormProvider onSubmit={handleSubmit}>
          {isFileFormatsShow && <FileFormats />}
          {isCreationParamsShow && <CreationParams />}
          {isDetailDocumentsParamsShow && <DetailDocumentsParams />}
          {isEmailShow && <Email />}
        </FormProvider>
      }
      dataType={DATA_TYPE.CONFIRMATION}
      header={isExport ? locale.exportParamsDialog.exportStatement.label : locale.exportParamsDialog.printStatement.label}
      onClose={onClose}
    />
  );
};

Content.displayName = 'Content';
