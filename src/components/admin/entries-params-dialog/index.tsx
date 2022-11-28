import React, { useMemo } from 'react';
import type { ACTION } from 'interfaces';
import { Form } from 'react-final-form';
import { dialog } from '@platform/ui';
import { FIELD_NAME, initialValues } from './constants';
import { Content } from './content';
import type { IDialogContext } from './dialog-context';
import { DialogContext } from './dialog-context';

/** Свойства ЭФ с параметрами выписки и документов. */
export interface IExportParamsDialogProps {
  /** Действие. */
  action: ACTION;
  /** Количество выгружаемых выписок. */
  amount: number;
  /** Обработчик закрытия формы. */
  onClose(): void;
  /** Обработчик отправки формы. */
  onSubmit(value: string[]): void;
}

export interface IParamsFormState {
  [FIELD_NAME]: string[];
}

/** Компонент "ЭФ параметров выписки и документов". */
export const EntriesParamsDialog: React.FC<IExportParamsDialogProps> = ({ onClose, onSubmit, action, amount }) => {
  const handleSubmit = (value: IParamsFormState) => {
    onClose();
    onSubmit(value[FIELD_NAME]);
  };

  const value: IDialogContext = useMemo(
    () => ({
      onClose,
      action,
      amount,
    }),
    [action, amount, onClose]
  );

  return (
    <DialogContext.Provider value={value}>
      <Form initialValues={initialValues} render={Content} onSubmit={handleSubmit} />
    </DialogContext.Provider>
  );
};

EntriesParamsDialog.displayName = 'EntriesParamsDialog';

export const showEntriesParamsDialog = (params: Omit<IExportParamsDialogProps, 'onClose' | 'onSubmit'>) =>
  new Promise<string[]>((resolve, reject) =>
    dialog.show('statementParamsDialog', EntriesParamsDialog, { onSubmit: resolve, ...params }, () => reject(true))
  );
