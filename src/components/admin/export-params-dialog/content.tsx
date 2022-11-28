import React, { useCallback, useContext } from 'react';
import { CreationParams } from 'components/admin/form/creation-params';
import { DetailDocumentsParams } from 'components/admin/form/detail-documents-params';
import { FocusLock } from 'components/common/focus-lock';
import { FileFormats } from 'components/common/form/file-formats';
import { ACTION } from 'interfaces';
import { locale } from 'localization';
import type { FormRenderProps } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { Box, BUTTON, DATA_TYPE, DialogTemplate } from '@platform/ui';
import type { IDialogContext } from './dialog-context';
import { DialogContext } from './dialog-context';
import { FormProvider } from './form-provider';
import css from './styles.scss';

/** Функция получения заголовка ЭФ. */
const getFormHeader = (isExport: boolean, withEntriesList: boolean) => {
  if (isExport) {
    return withEntriesList ? locale.exportParamsDialog.exportStatementDocuments.label : locale.exportParamsDialog.exportStatement.label;
  }

  return withEntriesList ? locale.exportParamsDialog.printStatementDocuments.label : locale.exportParamsDialog.printStatement.label;
};

/** Содержимое модального окна ЭФ параметров выписки и документов. */
export const Content: React.FC<FormRenderProps<IFormState>> = ({ handleSubmit }) => {
  const { onClose, action, statementId, options } = useContext<IDialogContext>(DialogContext);
  const isExport = action !== ACTION.PRINT;

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

  const header = getFormHeader(isExport, Boolean(options?.withEntriesList));

  const fileFormatsVisible = isExport && !options?.withEntriesList;
  const creationParamsVisible = !options?.withEntriesList;

  return (
    <FocusLock>
      <Box style={{ outline: 'none' }} tabIndex={0}>
        <DialogTemplate
          extraSmall
          actions={actions}
          content={
            <FormProvider action={action} statementId={statementId} onSubmit={handleSubmit}>
              <Box className={css.container}>
                {fileFormatsVisible && <FileFormats />}
                {creationParamsVisible && <CreationParams withEntriesList={Boolean(options?.withEntriesList)} />}
                <DetailDocumentsParams withEntriesList={Boolean(options?.withEntriesList)} />
              </Box>
            </FormProvider>
          }
          dataType={DATA_TYPE.CONFIRMATION}
          header={header}
          onClose={onClose}
        />
      </Box>
    </FocusLock>
  );
};

Content.displayName = 'Content';
