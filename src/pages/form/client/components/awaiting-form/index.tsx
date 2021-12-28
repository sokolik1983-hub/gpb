import React, { useEffect } from 'react';
import { executor } from 'actions/client/executor';
import { gotoTransactionsScroller } from 'actions/client/goto-transactions-scroller';
import { STATEMENT_STATUSES } from 'interfaces';
import type { ILatestStatementDto } from 'interfaces/client';
import { ACTIONS } from 'interfaces/client';
import { locale } from 'localization';
import { statementService } from 'services';
import { polling, POLLING_WAS_STOPPED_BY_USER } from 'utils';
import { to } from '@platform/core';
import type { IServerDataResp } from '@platform/services';
import type { IButtonAction } from '@platform/ui';
import { Box, BUTTON, DialogTemplate, Gap, ServiceIcons, Typography, dialog } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента AwaitingForm. */
export interface IAwaitingFormProps {
  /** Коллбэк закрытия формы. */
  onClose(): void;
  /** Id закрытия формы. */
  id: string;
}

/**
 * ЭФ Клиента "Выписка формируется".
 * Ожидает перехода запроса выписки в окончательные статусы.
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440121}
 */
export const AwaitingForm: React.FC<IAwaitingFormProps> = ({ onClose, id }) => {
  const job = () => statementService.getStatementRequest(id);

  const checker = (result: IServerDataResp<ILatestStatementDto>): boolean => {
    const {
      data: { status },
    } = result;

    return [STATEMENT_STATUSES.DENIED, STATEMENT_STATUSES.EXECUTED].includes(status);
  };

  const { pollingFunc: checkStatus, stopPolling: stopCheckStatus } = polling(job, checker, 2000);

  const closeAwaitingForm = () => {
    stopCheckStatus();
    onClose();
  };

  const actions: IButtonAction[] = [
    {
      name: 'close',
      label: locale.awaitingForm.cancelRequestButton,
      onClick: closeAwaitingForm,
      buttonType: BUTTON.REGULAR,
      extraSmall: true,
    },
  ];

  useEffect(() => {
    /**
     * Выполняет шаги 4,5,6 создания запроса выписки.
     *
     * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675639}
     */
    const performEffect = async () => {
      const [resp, fatalError] = await to(checkStatus());

      const { data: statementRequest, error: statementRequestError } = resp ?? {};

      if (fatalError && fatalError === POLLING_WAS_STOPPED_BY_USER) {
        return;
      }

      if (statementRequestError || fatalError) {
        closeAwaitingForm();
        dialog.showAlert(locale.errors.progressError, { header: locale.errors.progressErrorHeader });

        return;
      }

      const { status, commentForClient = '', action } = statementRequest!;

      if (status === STATEMENT_STATUSES.DENIED) {
        closeAwaitingForm();
        dialog.showAlert(locale.errors.statementDenied({ message: commentForClient }), {
          header: locale.errors.progressErrorHeader,
        });

        return;
      }

      closeAwaitingForm();

      switch (action) {
        case ACTIONS.VIEW:
          void executor.execute(gotoTransactionsScroller, [statementRequest]);

          return;
        // TODO: По мере добавления новых действий разделять кейсы
        case ACTIONS.PRINT:
        case ACTIONS.DOWNLOAD:
        case ACTIONS.SEND_TO_EMAIL:
        default:
          return;
      }
    };

    void performEffect();
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
        onClose={closeAwaitingForm}
      />
    </Box>
  );
};

AwaitingForm.displayName = 'AwaitingForm';

export const showAwaitingForm = (id: string) =>
  new Promise((resolve, reject) =>
    dialog.show(
      'awaitingForm',
      AwaitingForm,
      {
        id,
      },
      () => reject(true)
    )
  );
