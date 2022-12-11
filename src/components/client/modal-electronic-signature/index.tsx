import React from 'react';
import { FocusLock } from 'components/common/focus-lock';
import { locale } from 'localization';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { useRedirect } from '@platform/services/client';
import { Gap, dialog, Box, BUTTON, DialogTemplate, Typography, DATA_TYPE } from '@platform/ui';
import type { IButtonAction } from '@platform/ui';

/** Свойства компонента ModalElectronicSignature. */
export interface IModalElectronicSignature {
  /** Коллбэк закрытия формы. */
  onClose(): void;
}

/** Модальное окно с электронной подписью. */
export const ModalElectronicSignature: React.FC<IModalElectronicSignature> = ({ onClose }) => {
  const toScheduleHistoryPage = useRedirect(COMMON_STREAM_URL.STATEMENT_SCHEDULE_HISTORY);
  const signAndSend = () => {
    toScheduleHistoryPage();
    onClose();
  };
  const actions: IButtonAction[] = [
    {
      name: 'submit',
      label: locale.client.modal.electronicSignature.sign,
      onClick: signAndSend,
      buttonType: BUTTON.PRIMARY,
      extraSmall: true,
    },
    {
      name: 'cancel',
      label: locale.client.modal.electronicSignature.cancel,
      onClick: onClose,
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
          content={<Typography.P>{locale.client.modal.electronicSignature.content}</Typography.P>}
          dataType={DATA_TYPE.CONFIRMATION}
          header={
            <>
              <Typography.H1>{locale.client.modal.electronicSignature.title}</Typography.H1>
              <Gap />
            </>
          }
          onClose={() => onClose()}
        />
      </Box>
    </FocusLock>
  );
};

ModalElectronicSignature.displayName = 'ModalElectronicSignature';

export const showModalElectronicSignature = () => {
  dialog.show('ModalElectronicSignature', ModalElectronicSignature);
};
