import React, { useCallback, useContext } from 'react';
import type { IDialogContext } from 'components/export-params-dialog/dialog-context';
import { DialogContext } from 'components/export-params-dialog/dialog-context';
import { CreationParams } from 'components/form/creation-params';
import { DetailDocumentsParams } from 'components/form/detail-documents-params';
import { FileFormats } from 'components/form/file-formats';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import type { IFormState } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { FormProvider } from 'pages/form/client/form-provider';
import type { FormRenderProps } from 'react-final-form';
import { exportCases } from 'utils';
import { DATA_TYPE, BUTTON, DialogTemplate, Box } from '@platform/ui';
import css from './styles.scss';

/** Функция получения заголовка ЭФ. */
const getFormHeaderByUseCase = (useCase: EXPORT_PARAMS_USE_CASES) => {
  switch (useCase) {
    case EXPORT_PARAMS_USE_CASES.TWO:
      return locale.exportParamsDialog.printStatement.label;
    case EXPORT_PARAMS_USE_CASES.THREE:
    case EXPORT_PARAMS_USE_CASES.SEVEN:
      return locale.exportParamsDialog.exportStatementDocuments.label;
    case EXPORT_PARAMS_USE_CASES.FOUR:
    case EXPORT_PARAMS_USE_CASES.SIX:
      return locale.exportParamsDialog.printStatementDocuments.label;
    default:
      return locale.exportParamsDialog.exportStatement.label;
  }
};

/** Содержимое модального окна ЭФ параметров выписки и документов. */
export const Content: React.FC<FormRenderProps<IFormState>> = ({ handleSubmit }) => {
  const { onClose, useCase, action } = useContext<IDialogContext>(DialogContext);
  const isExport = exportCases.includes(useCase!);

  /** Кнопки модального окна. */
  const getActions = useCallback(() => {
    // конфиг для экшона экспорта выписки / документов выписки
    const DOWNLOAD = {
      name: 'download',
      label: locale.exportParamsDialog.buttons.download.label,
      onClick: handleSubmit,
      buttonType: BUTTON.PRIMARY,
      extraSmall: true,
    };

    // конфиг для экшона печати выписки / документов выписки
    const PRINT = {
      name: 'print',
      label: locale.exportParamsDialog.buttons.print.label,
      onClick: handleSubmit,
      buttonType: BUTTON.PRIMARY,
      extraSmall: true,
    };

    if (isExport) {
      return [DOWNLOAD];
    }

    return [PRINT];
  }, [handleSubmit, isExport]);

  const actions = getActions();

  const header = getFormHeaderByUseCase(useCase!);

  return (
    <DialogTemplate
      extraSmall
      actions={actions}
      content={
        <FormProvider action={action} useCase={useCase} onSubmit={handleSubmit}>
          <Box className={css.container}>
            <FileFormats />
            <CreationParams />
            <DetailDocumentsParams />
          </Box>
        </FormProvider>
      }
      dataType={DATA_TYPE.CONFIRMATION}
      header={header}
      onClose={onClose}
    />
  );
};

Content.displayName = 'Content';
