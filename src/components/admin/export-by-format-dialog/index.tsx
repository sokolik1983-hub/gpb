import React, { useCallback } from 'react';
import type { FC } from 'react';
import { FocusLock } from 'components/common/focus-lock';
import { FORMAT } from 'interfaces';
import { locale } from 'localization';
import { Box, BUTTON, DATA_TYPE, dialog, DialogTemplate, Gap, Typography } from '@platform/ui';
import css from './styles.scss';

/** Свойства диалога кспорта ПФ. */
interface ExportByFormatDialogProps {
  /** Коллбэк при закрытии диалога. */
  onClose(): void;
  /** Коллбэк при выборе формата файла. */
  onSelect(value: FORMAT.EXCEL | FORMAT.PDF): void;
}

/** Диалог для ПФ экспорта журнала остатков и оборотов. */
const ExportByFormatDialog: FC<ExportByFormatDialogProps> = ({ onClose, onSelect }) => {
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
      label: locale.common.formats.Excel,
      onClick: handleSelect,
      buttonType: BUTTON.REGULAR,
      extraSmall: true,
    },
    {
      name: FORMAT.PDF,
      label: locale.common.formats.PDF,
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
            <Box className={css['export-by-format-dialog__content']}>
              <Gap.XS />
              <Typography.PBold>{locale.admin.turnoverScroller.actions.exportTurnovers}</Typography.PBold>
            </Box>
          }
          dataType={DATA_TYPE.CONFIRMATION}
          header={locale.admin.turnoverScroller.actions.exportTurnovers}
          onClose={onClose}
        />
      </Box>
    </FocusLock>
  );
};

ExportByFormatDialog.displayName = 'ExportStatementsHistoryDialog';

/** Показать диалог экспорта остатков и оборотов. */
export const showExportByFormatDialog = () =>
  new Promise<FORMAT.EXCEL | FORMAT.PDF>((resolve, reject) =>
    dialog.show('showExportByFormatDialog', ExportByFormatDialog, { onSelect: resolve }, () => reject(true))
  );
