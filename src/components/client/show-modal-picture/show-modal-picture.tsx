import React from 'react';
import { FocusLock } from 'components/common/focus-lock';
import { dialog, Box, DialogTemplate, DATA_TYPE, LayoutScroll } from '@platform/ui';

/** Свойства компонента ModalPicture. */
export interface IModalPicture {
  /** Коллбэк закрытия формы. */
  onClose(): void;
}

/** Модальное окно с тестовым документом. */
export const ModalPicture: React.FC<IModalPicture> = ({ onClose }) => (
  <FocusLock>
    <Box style={{ outline: 'none' }} tabIndex={0}>
      <DialogTemplate
        extraSmall
        content={
          <LayoutScroll style={{ height: '500px', width: '566px' }}>
            <img alt="example-img" src={'https://i.postimg.cc/m2kTB9G8/example-statement.png'} />
          </LayoutScroll>
        }
        dataType={DATA_TYPE.CUSTOM}
        header={''}
        onClose={() => onClose()}
      />
    </Box>
  </FocusLock>
);

ModalPicture.displayName = 'ModalPicture';

export const showModalPicture = () => {
  dialog.show('ModalPicture', ModalPicture);
};
