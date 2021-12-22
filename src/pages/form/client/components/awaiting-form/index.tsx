import React from 'react';
import { locale } from 'localization';
import type { IButtonAction } from '@platform/ui';
import { DialogTemplate, Typography, ServiceIcons, Gap, Box, BUTTON } from '@platform/ui';
import css from './styles.scss';

export interface IAwaitingFormProps {
  onClose(): void;
}

export const AwaitingForm: React.FC<IAwaitingFormProps> = ({ onClose }) => {
  const actions: IButtonAction[] = [
    {
      name: 'close',
      label: locale.awaitingForm.cancelRequestButton,
      onClick: onClose,
      buttonType: BUTTON.REGULAR,
      extraSmall: true,
    },
  ];

  return (
    <Box className={css.container}>
      <DialogTemplate
        extraSmall
        actions={actions}
        content={<Typography.P>{locale.awaitingForm.content}</Typography.P>}
        header={
          <>
            <ServiceIcons.ServiceProgress fill={'FAINT'} scale={'XL'} />
            <Gap />
            <Typography.H1>{locale.awaitingForm.title}</Typography.H1>
            <Gap />
          </>
        }
        onClose={onClose}
      />
    </Box>
  );
};

AwaitingForm.displayName = 'AwaitingForm';
