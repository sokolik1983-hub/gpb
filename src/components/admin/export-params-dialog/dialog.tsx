import React, { useMemo } from 'react';
import type { EXPORT_PARAMS_USE_CASES } from 'interfaces/admin';
import { ACTION } from 'interfaces/common';
import type { IStatementSummaryInfoResponseDto } from 'interfaces/dto';
import { locale } from 'localization';
import { Form } from 'react-final-form';
import { useQueryClient } from 'react-query';
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
  /** Информация по выписке. */
  statementInfo: {
    income?: number;
    outcome?: number;
  };
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
  const queryClient = useQueryClient();

  const statementSummary = queryClient.getQueryData<IStatementSummaryInfoResponseDto>(['@eco/statement', 'statement', statementId]);

  const initialFormState = getInitialFormState({ useCase, dateFrom: statementSummary?.dateFrom, dateTo: statementSummary?.dateTo });

  const handleSubmit = (formState: IFormState) => {
    onClose();
    onSubmit({ formState, statementInfo: { income: statementSummary?.income, outcome: statementSummary?.outcome } });
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
