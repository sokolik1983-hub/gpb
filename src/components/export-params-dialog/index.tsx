import React from 'react';
import {
  creationParamsShowCases,
  detailDocumentsParamsShowCases,
  emailShowCases,
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
import type { IButtonAction } from '@platform/ui';
import { Box, BUTTON, dialog, DialogTemplate } from '@platform/ui';
import { FormProvider } from './form-provider';
import type { EXPORT_PARAMS_USE_CASES } from './statemet-params-use-cases';

/** Свойства ЭФ с параметрами выписки и документов. */
export interface IExportParamsDialogProps {
  /** Вариант вызова диалога. */
  useCase: EXPORT_PARAMS_USE_CASES;
  /** Обработчик закрытия ЭФ. */
  onClose(): void;
}

/** Компонент "ЭФ параметров выписки и документов". */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ExportParamsDialog: React.FC<IExportParamsDialogProps> = ({ useCase, onClose }) => {
  const initialFormState = getInitialFormState();
  const isExport = exportCases.includes(useCase);
  const isEmailShow = emailShowCases.includes(useCase);
  const isFileFormatsShow = fileFormatShowCases.includes(useCase);
  const isCreationParamsShow = creationParamsShowCases.includes(useCase);
  const isDetailDocumentsParamsShow = detailDocumentsParamsShowCases.includes(useCase);

  const actions: IButtonAction[] = isExport
    ? [
        {
          name: 'download',
          label: locale.exportParamsDialog.buttons.download.label,
          onClick: noop,
          buttonType: BUTTON.PRIMARY,
          extraSmall: true,
        },
        {
          name: 'sendToEmail',
          label: locale.exportParamsDialog.buttons.sendToEmail.label,
          onClick: noop,
          buttonType: BUTTON.REGULAR,
          extraSmall: true,
        },
      ]
    : [
        {
          name: 'print',
          label: locale.exportParamsDialog.buttons.print.label,
          onClick: noop,
          buttonType: BUTTON.PRIMARY,
          extraSmall: true,
        },
      ];

  return (
    <DialogTemplate
      extraSmall
      actions={actions}
      content={
        <Box fill={'BASE'}>
          <Form
            initialValues={initialFormState}
            render={({ handleSubmit }) => (
              <FormProvider useCase={useCase} onSubmit={handleSubmit}>
                {isFileFormatsShow && (
                  <>
                    <FileFormats />
                    <Box />
                  </>
                )}
                {isCreationParamsShow && (
                  <>
                    <CreationParams />
                    <Box />
                  </>
                )}
                {isDetailDocumentsParamsShow && (
                  <>
                    <DetailDocumentsParams />
                    <Box />
                  </>
                )}
                {isEmailShow && (
                  <>
                    <Email />
                    <Box />
                  </>
                )}
              </FormProvider>
            )}
            onSubmit={noop}
          />
        </Box>
      }
      header={isExport ? locale.exportParamsDialog.exportStatement.label : locale.exportParamsDialog.printStatement.label}
      onClose={onClose}
    />
  );
};

ExportParamsDialog.displayName = 'StatementParamsDialog';

export const showStatementParamsDialog = (useCase: EXPORT_PARAMS_USE_CASES) =>
  new Promise((resolve, reject) => dialog.show('statementParamsDialog', ExportParamsDialog, { useCase }, () => reject(true)));
