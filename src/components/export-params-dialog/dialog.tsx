import React, { useMemo } from 'react';
import { Content } from 'components/export-params-dialog/content';
import type { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { ACTION } from 'interfaces/client';
import { locale } from 'localization';
import { Form } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { getInitialFormState } from 'stream-constants/form';
import { dialog } from '@platform/ui';
import type { IDialogContext } from './dialog-context';
import { DialogContext } from './dialog-context';

/** Свойства ЭФ с параметрами выписки и документов. */
export interface IExportParamsDialogProps {
  /** Действие. */
  action: ACTION;
  /** Вариант вызова диалога. */
  useCase: EXPORT_PARAMS_USE_CASES;
  /** Обработчик закрытия формы. */
  onClose(): void;
  /** Обработчик отправки формы. */
  onSubmit(values: IFormState): void;
}

/** Компонент "ЭФ параметров выписки и документов". */
export const ExportParamsDialog: React.FC<IExportParamsDialogProps> = ({ onClose, onSubmit, useCase, action }) => {
  const initialFormState = getInitialFormState({ useCase });

  const handleSubmit = (values: IFormState) => {
    onClose();
    onSubmit(values);
  };

  const value: IDialogContext = useMemo(
    () => ({
      onClose,
      useCase,
      action,
    }),
    [action, onClose, useCase]
  );

  return (
    <DialogContext.Provider value={value}>
      <Form initialValues={initialFormState} render={Content} onSubmit={handleSubmit} />
    </DialogContext.Provider>
  );
};

ExportParamsDialog.displayName = 'StatementParamsDialog';

export const showStatementParamsDialog = (useCase: EXPORT_PARAMS_USE_CASES, action: ACTION) =>
  new Promise<IFormState>((resolve, reject) =>
    dialog.show('statementParamsDialog', ExportParamsDialog, { useCase, action, onSubmit: resolve }, () => reject(true))
  );

/** Заголовок диалога неактуальности выписки по способу вызова / возможному действию. */
const dialogTitleByAction: Record<ACTION.DOWNLOAD | ACTION.VIEW, string> = {
  [ACTION.DOWNLOAD]: locale.exportParamsDialog.exportOutdatedStatement.label,
  [ACTION.VIEW]: locale.exportParamsDialog.viewOutdatedStatement.label,
};

/** Диалог неактуальности выписки. */
export const showOutdatedStatementDialog = (action: ACTION) =>
  new Promise<void>((resolve, reject) =>
    dialog.showConfirmation(dialogTitleByAction[action], resolve, {
      cancelButtonText: locale.exportParamsDialog.buttons.cancel.label,
      okButtonText: locale.exportParamsDialog.buttons.ok.label,
      onClose: () => reject(true),
    })
  );
