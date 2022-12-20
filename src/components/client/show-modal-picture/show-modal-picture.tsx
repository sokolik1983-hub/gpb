import React from 'react';
import { showModalElectronicSignature } from 'components/client';
import { FocusLock } from 'components/common/focus-lock';
import { locale } from 'localization';
import { mocksAssets } from 'mocks/assets';
import type { IButtonAction } from '@platform/ui';
import { dialog, Box, DialogTemplate, DATA_TYPE, LayoutScroll, BUTTON } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента ModalPicture. */
export interface IModalPicture {
  /** Коллбэк закрытия формы. */
  onClose(): void;
  /** Свойство, описывающее какой кнопкой открывается модальное окно. */
  type?: string;
}

/** Модальное окно с тестовым документом. */
export const ModalPicture: React.FC<IModalPicture> = props => {
  const { onClose, type } = props;
  const clickAndGo = () => {
    onClose();
    showModalElectronicSignature();
  };

  const actions: IButtonAction[] = [
    {
      name: 'submit',
      label: locale.client.modal.electronicSignature.sign,
      onClick: clickAndGo,
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
      <DialogTemplate
        extraSmall
        actions={type === 'VIEW' ? [] : actions}
        content={
          <Box className={css.wrap} tabIndex={0}>
            <LayoutScroll>
              <img alt="example-img" src={type === 'CANCEL' ? mocksAssets.cancel : mocksAssets.sign} />
            </LayoutScroll>
          </Box>
        }
        dataType={DATA_TYPE.CUSTOM}
        header={''}
        onClose={() => onClose()}
      />
    </FocusLock>
  );
};

ModalPicture.displayName = 'ModalPicture';

/** Функция, вызывающая модальное окно с тестовым документом. */
export const showModalPicture = string => dialog.show('ModalPicture', ModalPicture, { type: string });
