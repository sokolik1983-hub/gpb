import React, { useCallback } from 'react';
import {
  creationParamsShowCases,
  detailDocumentsParamsShowCases,
  exportCases,
  fileFormatShowCases,
} from 'components/export-params-dialog/utils';
import { CreationParams } from 'components/form/creation-params';
import { DetailDocumentsParams } from 'components/form/detail-documents-params';
import { Email } from 'components/form/email';
import { FileFormats } from 'components/form/file-formats';
import { getInitialFormState } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { Form } from 'react-final-form';
import { noop } from 'utils';
import { BUTTON, dialog, DialogTemplate, DATA_TYPE } from '@platform/ui';
import { FormProvider } from './form-provider';
import type { EXPORT_PARAMS_USE_CASES } from './statemet-params-use-cases';

/** Свойства ЭФ с параметрами выписки и документов. */
export interface IExportParamsDialogProps {
  /** Вариант вызова диалога. */
  useCase: EXPORT_PARAMS_USE_CASES;
  /** Обработчик закрытия ЭФ. */
  onClose(): void;
}

const DOWNLOAD = {
  name: 'download',
  label: locale.exportParamsDialog.buttons.download.label,
  onClick: noop,
  buttonType: BUTTON.PRIMARY,
  extraSmall: true,
};

const SEND_TO_EMAIL = {
  name: 'sendToEmail',
  label: locale.exportParamsDialog.buttons.sendToEmail.label,
  onClick: noop,
  buttonType: BUTTON.REGULAR,
  extraSmall: true,
};

const PRINT = {
  name: 'print',
  label: locale.exportParamsDialog.buttons.print.label,
  onClick: noop,
  buttonType: BUTTON.PRIMARY,
  extraSmall: true,
};

/** Компонент "ЭФ параметров выписки и документов". */
export const ExportParamsDialog: React.FC<IExportParamsDialogProps> = ({ useCase, onClose }) => {
  const initialFormState = getInitialFormState();
  const isExport = exportCases.includes(useCase);
  // TODO: для MVP принудительно скрываем, после - восстанавливаем
  // const isEmailShow = emailShowCases.includes(useCase);
  // const isSendToEmailButtonShow = sendToEmailButtonShowCases.includes(useCase!);
  const isEmailShow = false;
  const isSendToEmailButtonShow = false;
  const isFileFormatsShow = fileFormatShowCases.includes(useCase);
  const isCreationParamsShow = creationParamsShowCases.includes(useCase);
  const isDetailDocumentsParamsShow = detailDocumentsParamsShowCases.includes(useCase);

  const getActions = useCallback(() => {
    if (isExport) {
      if (isSendToEmailButtonShow) {
        return [DOWNLOAD, SEND_TO_EMAIL];
      }

      return [DOWNLOAD];
    }

    return [PRINT];
  }, [isExport, isSendToEmailButtonShow]);

  const actions = getActions();

  return (
    <DialogTemplate
      extraSmall
      actions={actions}
      content={
        <Form
          initialValues={initialFormState}
          render={({ handleSubmit }) => (
            <FormProvider useCase={useCase} onSubmit={handleSubmit}>
              {isFileFormatsShow && <FileFormats />}
              {isCreationParamsShow && <CreationParams />}
              {isDetailDocumentsParamsShow && <DetailDocumentsParams />}
              {isEmailShow && <Email />}
            </FormProvider>
          )}
          // TODO после готовности BE реализовать onSubmit правильно
          onSubmit={noop}
        />
      }
      dataType={DATA_TYPE.CONFIRMATION}
      header={isExport ? locale.exportParamsDialog.exportStatement.label : locale.exportParamsDialog.printStatement.label}
      onClose={onClose}
    />
  );
};

ExportParamsDialog.displayName = 'StatementParamsDialog';

export const showStatementParamsDialog = (useCase: EXPORT_PARAMS_USE_CASES) =>
  new Promise((resolve, reject) => dialog.show('statementParamsDialog', ExportParamsDialog, { useCase }, () => reject(true)));
