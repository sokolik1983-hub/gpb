import React, { useMemo } from 'react';
import { Content } from 'components/export-params-dialog/content';
import type { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import type { IFormState } from 'interfaces/form/form-state';
import { getInitialFormState } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { Form } from 'react-final-form';
import { dialog } from '@platform/ui';
import type { IDialogContext } from './dialog-context';
import { DialogContext } from './dialog-context';

/** Свойства ЭФ с параметрами выписки и документов. */
export interface IExportParamsDialogProps {
  /** Вариант вызова диалога. */
  useCase: EXPORT_PARAMS_USE_CASES;
  /** Обработчик закрытия формы. */
  onClose(): void;
  /** Обработчик отправки формы. */
  onSubmit(values: IFormState): void;
}

/** Компонент "ЭФ параметров выписки и документов". */
export const ExportParamsDialog: React.FC<IExportParamsDialogProps> = ({ onClose, onSubmit, useCase }) => {
  const initialFormState = getInitialFormState();

  const handleSubmit = (values: IFormState) => {
    onClose();
    onSubmit(values);
  };

  const value: IDialogContext = useMemo(
    () => ({
      onClose,
      useCase,
    }),
    [onClose, useCase]
  );

  return (
    <DialogContext.Provider value={value}>
      <Form initialValues={initialFormState} render={Content} onSubmit={handleSubmit} />
    </DialogContext.Provider>
  );
};

ExportParamsDialog.displayName = 'StatementParamsDialog';

export const showStatementParamsDialog = (useCase: EXPORT_PARAMS_USE_CASES) =>
  new Promise<IFormState>((resolve, reject) =>
    dialog.show('statementParamsDialog', ExportParamsDialog, { useCase, onSubmit: resolve }, () => reject(true))
  );

/**
 * Диалог экспорта неактуальной выписки.
 *
 * @param onOk - Функция экспорта неактуальной выписки.
 */
export const showExportOutdatedStatementDialog = (onOk: () => void) =>
  dialog.showConfirmation(locale.exportParamsDialog.exportOutdatedStatement.label, onOk, {
    cancelButtonText: locale.exportParamsDialog.buttons.cancel.label,
    okButtonText: locale.exportParamsDialog.buttons.ok.label,
  });
