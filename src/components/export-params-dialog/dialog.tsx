import React, { useMemo } from 'react';
import { Content } from 'components/export-params-dialog/content';
import type { EXPORT_PARAMS_USE_CASES, ACTION } from 'interfaces/client';
import { OUTDATED_STATEMENT_MODE } from 'interfaces/client';
import type { IFormState } from 'interfaces/form/form-state';
import { getInitialFormState } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { Form } from 'react-final-form';
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

const LocaleOfOutdatedStatementMode: Record<keyof typeof OUTDATED_STATEMENT_MODE, string> = {
  [OUTDATED_STATEMENT_MODE.EXPORT]: locale.exportParamsDialog.exportOutdatedStatement.label,
  [OUTDATED_STATEMENT_MODE.VIEW]: locale.exportParamsDialog.viewOutdatedStatement.label,
};

/** Диалог про неактуальную выписку. */
export const showOutdatedStatementDialog = (mode: OUTDATED_STATEMENT_MODE) =>
  new Promise<void>((resolve, reject) =>
    dialog.showConfirmation(LocaleOfOutdatedStatementMode[mode], resolve, {
      cancelButtonText: locale.exportParamsDialog.buttons.cancel.label,
      okButtonText: locale.exportParamsDialog.buttons.ok.label,
      onClose: () => reject(true),
    })
  );
