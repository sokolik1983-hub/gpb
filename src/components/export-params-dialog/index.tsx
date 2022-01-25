import React from 'react';
import { DetailedDocumentsParams } from 'components/export-params-dialog/components/detailed-documents-params';
import { DocumentsParams } from 'components/export-params-dialog/components/documents-params';
import { Email } from 'components/export-params-dialog/components/email';
import { FileFormats } from 'components/export-params-dialog/components/file-formats';
import type { EXPORT_PARAMS_USE_CASES } from 'components/export-params-dialog/statemet-params-use-cases';
import { Box, dialog } from '@platform/ui';

/** Свойства ЭФ с параметрами выписки и документов. */
export interface IExportParamsDialogProps {
  /** Вариант вызова диалога. */
  useCase: EXPORT_PARAMS_USE_CASES;
  /** Обработчик закрытия ЭФ. */
  onClose(): void;
}

/** Компонент "ЭФ параметров выписки и документов". */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ExportParamsDialog: React.FC<IExportParamsDialogProps> = ({ useCase }) => (
  <Box>
    <FileFormats />
    <DocumentsParams />
    <DetailedDocumentsParams />
    <Email />
  </Box>
);

ExportParamsDialog.displayName = 'StatementParamsDialog';

export const showStatementParamsDialog = (useCase: EXPORT_PARAMS_USE_CASES) =>
  new Promise((resolve, reject) => dialog.show('statementParamsDialog', ExportParamsDialog, { useCase }, () => reject(true)));
