import React, { useCallback } from 'react';
import type { FC } from 'react';
import { FocusLock } from 'components/common/focus-lock';
import { FORMAT } from 'interfaces';
import { locale } from 'localization';
import { Box, BUTTON, DATA_TYPE, dialog, DialogTemplate, Gap, Typography } from '@platform/ui';
import css from './styles.scss';

/** Свойства экспорта реестра выписок. */
interface ExportRegistryStatementDialogProps {
  /** Метод закрытия диалога. */
  onClose(): void;
  /** Метод выбора формата файла. */
  onSelect(value: unknown): void;
  /** Количество выписок. */
  statementCount: number;
}

/** Экспорт реестра выписок. */
const ExportStatementsHistoryDialog: FC<ExportRegistryStatementDialogProps> = ({ onClose, onSelect, statementCount }) => {
  /** Обработчик выбора экшена. */
  const handleSelect = useCallback(
    (format: FORMAT.EXCEL | FORMAT.PDF) => {
      onClose();

      onSelect(format);
    },
    [onClose, onSelect]
  );

  const actions = [
    {
      name: FORMAT.EXCEL,
      label: locale.admin.historyScroller.dialog.exportRegistryStatement.button.excel,
      onClick: handleSelect,
      buttonType: BUTTON.REGULAR,
      extraSmall: true,
    },
    {
      name: FORMAT.PDF,
      label: locale.admin.historyScroller.dialog.exportRegistryStatement.button.pdf,
      onClick: handleSelect,
      buttonType: BUTTON.REGULAR,
      extraSmall: true,
    },
  ];

  return (
    <FocusLock>
      <Box style={{ outline: 'none' }} tabIndex={0}>
        <DialogTemplate
          extraSmall
          actions={actions}
          content={
            <Box className={css['export-registry-statement-dialog__content']}>
              <Gap.XS />
              <Typography.PBold>{locale.admin.historyScroller.dialog.exportRegistryStatement.content}</Typography.PBold>
            </Box>
          }
          dataType={DATA_TYPE.CONFIRMATION}
          header={
            <Typography.H3>{locale.admin.historyScroller.dialog.exportRegistryStatement.header({ count: statementCount })}</Typography.H3>
          }
          onClose={onClose}
        />
      </Box>
    </FocusLock>
  );
};

ExportStatementsHistoryDialog.displayName = 'ExportStatementsHistoryDialog';

/** Показать диалог экспрорта реестра выписок. */
export const showExportStatementsHistoryDialog = (statementCount: number) =>
  new Promise((resolve, reject) =>
    dialog.show('exportStatementsHistoryDialog', ExportStatementsHistoryDialog, { onSelect: resolve, statementCount }, () => reject(true))
  );
