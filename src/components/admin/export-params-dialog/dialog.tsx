import React, { useMemo } from 'react';
import type { EXPORT_PARAMS_USE_CASES } from 'interfaces/admin';
import type { ACTION } from 'interfaces/common';
import { Form } from 'react-final-form';
import { getInitialFormState } from 'stream-constants/admin/form';
import type { IFormState } from 'stream-constants/form';
import { dialog } from '@platform/ui';
import { Content } from './content';
import type { IDialogContext } from './dialog-context';
import { DialogContext } from './dialog-context';

/** Свойства ответа "ЭФ параметров выписки и документов". */
interface StatementParamsDialogResponse {
  /** Данные формы. */
  formState: IFormState;
}

/** Свойства ЭФ с параметрами выписки и документов. */
export interface IExportParamsDialogProps {
  /** Действие. */
  action: ACTION;
  /** Вариант вызова диалога. */
  useCase: EXPORT_PARAMS_USE_CASES;
  /** Обработчик закрытия формы. */
  onClose(): void;
  /** Обработчик отправки формы. */
  onSubmit(values: StatementParamsDialogResponse): void;
  /** Идентификатор выписки. */
  statementId?: string;
}

/** Компонент "ЭФ параметров выписки и документов". */
export const ExportParamsDialog: React.FC<IExportParamsDialogProps> = ({ onClose, onSubmit, useCase, action, statementId }) => {
  const initialFormState = getInitialFormState({ useCase, dateFrom: '', dateTo: '' });

  const handleSubmit = (formState: IFormState) => {
    onClose();
    onSubmit({ formState });
  };

  const value: IDialogContext = useMemo(
    () => ({
      onClose,
      useCase,
      action,
      statementId,
    }),
    [action, onClose, useCase, statementId]
  );

  return (
    <DialogContext.Provider value={value}>
      <Form initialValues={initialFormState} render={Content} onSubmit={handleSubmit} />
    </DialogContext.Provider>
  );
};

ExportParamsDialog.displayName = 'StatementParamsDialog';

export const showStatementParamsDialog = (useCase: EXPORT_PARAMS_USE_CASES, action: ACTION, statementId) =>
  new Promise<StatementParamsDialogResponse>((resolve, reject) =>
    dialog.show('statementParamsDialog', ExportParamsDialog, { useCase, action, onSubmit: resolve, statementId }, () => reject(true))
  );
