import React, { useState } from 'react';
import { FocusLock } from 'components/common/focus-lock';
import { locale } from 'localization';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { useRedirect } from '@platform/services/client';
import { Gap, dialog, Box, BUTTON, DialogTemplate, Typography, DATA_TYPE, ServiceIcons } from '@platform/ui';
import type { IButtonAction } from '@platform/ui';

/** Свойства компонента ModalElectronicSignature. */
export interface IModalElectronicSignature {
  /** Коллбэк закрытия формы. */
  onClose(): void;
}

/** Модальное окно с электронной подписью. */
export const ModalElectronicSignature: React.FC<IModalElectronicSignature> = ({ onClose }) => {
  const [visible, setVisible] = useState(false);
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
      disabled: !visible,
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
          content={
            <>
              <Typography.H3 style={{ paddingBottom: '8px' }}>{locale.client.modal.electronicSignature.content}</Typography.H3>
              <Box style={{ position: 'relative' }} onClick={() => setVisible(!visible)}>
                <img alt="electronic-signature-img" src="https://i.postimg.cc/Kvgtvc6g/electronic3.png" />
                <ServiceIcons.Tick
                  fill={'ACCENT'}
                  scale={'MD'}
                  style={{
                    display: visible ? 'block' : 'none',
                    position: 'absolute',
                    right: '15px',
                    top: '50%',
                    transform: 'translateY(-70%)',
                  }}
                />
              </Box>
            </>
          }
          dataType={DATA_TYPE.CONFIRMATION}
          header={
            <>
              <Typography.H2>{locale.client.modal.electronicSignature.title}</Typography.H2>
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
