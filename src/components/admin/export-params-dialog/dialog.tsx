import React, { useMemo } from 'react';
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

export interface IDialogOptions {
  withEntriesList: boolean;
}

/** Свойства ЭФ с параметрами выписки и документов. */
export interface IExportParamsDialogProps {
  /** Идентификатор выписки. */
  statementId: string;
  /** Действие. */
  action: ACTION;
  /** Параметры вызова диалого. */
  options: IDialogOptions;
  /** Обработчик закрытия формы. */
  onClose(): void;
  /** Обработчик отправки формы. */
  onSubmit(values: StatementParamsDialogResponse): void;
}

/** Компонент "ЭФ параметров выписки и документов". */
export const ExportParamsDialog: React.FC<IExportParamsDialogProps> = ({ onClose, onSubmit, action, statementId, options }) => {
  const initialFormState = getInitialFormState({ dateFrom: '', dateTo: '', withEntriesList: options.withEntriesList });

  const handleSubmit = (formState: IFormState) => {
    onClose();
    onSubmit({ formState });
  };

  const value: IDialogContext = useMemo(
    () => ({
      onClose,
      options,
      action,
      statementId,
    }),
    [action, onClose, options, statementId]
  );

  return (
    <DialogContext.Provider value={value}>
      <Form initialValues={initialFormState} render={Content} onSubmit={handleSubmit} />
    </DialogContext.Provider>
  );
};

ExportParamsDialog.displayName = 'StatementParamsDialog';

export const showStatementParamsDialog = (params: Omit<IExportParamsDialogProps, 'onClose' | 'onSubmit'>) =>
  new Promise<StatementParamsDialogResponse>((resolve, reject) =>
    dialog.show('statementParamsDialog', ExportParamsDialog, { onSubmit: resolve, ...params }, () => reject(true))
  );
