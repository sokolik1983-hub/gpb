import React, { useCallback, useContext } from 'react';
import { FocusLock } from 'components/common/focus-lock';
import { Row } from 'components/common/form/row';
import { ACTION } from 'interfaces';
import { locale } from 'localization';
import type { FormRenderProps } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { Box, BUTTON, DATA_TYPE, DialogTemplate, Fields } from '@platform/ui';
import { FIELD_NAME, options } from './constants';
import type { IDialogContext } from './dialog-context';
import { DialogContext } from './dialog-context';
import css from './styles.scss';

/** Функция получения заголовка ЭФ. */
const getFormHeader = (isExport: boolean, amount: number) => {
  if (isExport) {
    return `${locale.exportParamsDialog.exportStatementDocuments.label}: ${amount}`;
  }

  return `${locale.exportParamsDialog.printStatementDocuments.label}: ${amount}`;
};

/** Содержимое модального окна ЭФ параметров выписки и документов. */
export const Content: React.FC<FormRenderProps<IFormState>> = ({ handleSubmit }) => {
  const { onClose, action, amount } = useContext<IDialogContext>(DialogContext);
  const isExport = action !== ACTION.PRINT;

  /** Кнопки модального окна. */
  const getActions = useCallback(() => {
    // конфиг для экшона экспорта выписки / документов выписки
    const DOWNLOAD = {
      name: 'download',
      label: locale.exportParamsDialog.buttons.download.label,
      onClick: handleSubmit,
      buttonType: BUTTON.PRIMARY,
      extraSmall: true,
    };

    // конфиг для экшона печати выписки / документов выписки
    const PRINT = {
      name: 'print',
      label: locale.exportParamsDialog.buttons.print.label,
      onClick: handleSubmit,
      buttonType: BUTTON.PRIMARY,
      extraSmall: true,
    };

    if (isExport) {
      return [DOWNLOAD];
    }

    return [PRINT];
  }, [handleSubmit, isExport]);

  const actions = getActions();

  const header = getFormHeader(isExport, amount);

  return (
    <FocusLock>
      <Box style={{ outline: 'none' }} tabIndex={0}>
        <DialogTemplate
          extraSmall
          actions={actions}
          content={
            <Box className={css.container}>
              <Row align={'TOP'} label={locale.common.documentsSetParams.label}>
                <Box>
                  <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FIELD_NAME} options={options} />
                </Box>
              </Row>
            </Box>
          }
          dataType={DATA_TYPE.CONFIRMATION}
          header={header}
          onClose={onClose}
        />
      </Box>
    </FocusLock>
  );
};

Content.displayName = 'Content';
