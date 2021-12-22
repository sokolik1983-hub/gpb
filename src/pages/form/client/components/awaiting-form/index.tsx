import React, { useEffect } from 'react';
import { STATEMENT_STATUSES } from 'interfaces';
import { locale } from 'localization';
import { statementService } from 'services';
import { polling } from '@platform/services';
import type { IButtonAction } from '@platform/ui';
import { Box, BUTTON, DialogTemplate, Gap, ServiceIcons, Typography, throttle } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента AwaitingForm. */
export interface IAwaitingFormProps {
  /** Коллбэк закрытия формы. */
  onClose(): void;
  /** Id закрытия формы. */
  id: string;
}

/** ЭФ Клиента "Выписка формируется". */
export const AwaitingForm: React.FC<IAwaitingFormProps> = ({ onClose, id }) => {
  const throttledClose = throttle(() => onClose(), 3000);

  const actions: IButtonAction[] = [
    {
      name: 'close',
      label: locale.awaitingForm.cancelRequestButton,
      onClick: onClose,
      buttonType: BUTTON.REGULAR,
      extraSmall: true,
    },
  ];

  // переход на журнал проводок
  const goToTransaction = throttledClose;

  const job = () => statementService.getStatus(id);
  const checker = (result: { status: STATEMENT_STATUSES }): boolean =>
    result.status === STATEMENT_STATUSES.DENIED || result.status === STATEMENT_STATUSES.EXECUTED;
  const checkStatus = polling(job, checker, 2000);

  useEffect(() => {
    void checkStatus().then(result => {
      if (result.status === STATEMENT_STATUSES.EXECUTED) {
        goToTransaction();
      }

      if (result.status === STATEMENT_STATUSES.DENIED) {
        throttledClose();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
