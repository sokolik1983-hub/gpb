import React, { useEffect } from 'react';
import { executor } from 'actions/client/executor';
import { gotoTransactionsScrollerByStatementRequest } from 'actions/client/goto-transactions-scroller-by-statement-request';
import { STATEMENT_REQUEST_STATUSES } from 'interfaces';
import type { IGetStatusResponceDto } from 'interfaces/client';
import { ACTIONS } from 'interfaces/client';
import { locale } from 'localization';
import { statementService } from 'services';
import { polling, POLLING_WAS_STOPPED_BY_USER, showCommonErrorMessage } from 'utils';
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
  const job = () => statementService.getStatus(id);

  const checker = (result: IServerDataResp<IGetStatusResponceDto>): boolean => {
    const {
      data: { status },
    } = result;

    return [STATEMENT_REQUEST_STATUSES.DENIED, STATEMENT_REQUEST_STATUSES.EXECUTED].includes(status);
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
      const [statusResp, fatalStatusError] = await to(checkStatus());

      const { data: statusResponseDto, error: statusError } = statusResp ?? {};

      if (fatalStatusError && fatalStatusError === POLLING_WAS_STOPPED_BY_USER) {
        return;
      }

      if (statusError || fatalStatusError) {
        closeAwaitingForm();
        showCommonErrorMessage();

        return;
      }

      const { status } = statusResponseDto!;

      const [statementRequestResp, fatalStatementRequestErr] = await to(statementService.getStatementRequest(id));

      const { data: statementRequest, error: statementRequestError } = statementRequestResp ?? {};

      if (fatalStatementRequestErr || statementRequestError) {
        closeAwaitingForm();
        showCommonErrorMessage();

        return;
      }

      const { commentForClient = '', action } = statementRequest!;

      if (status === STATEMENT_REQUEST_STATUSES.DENIED) {
        closeAwaitingForm();
        dialog.showAlert(locale.errors.statementDenied({ message: commentForClient }), {
          header: locale.errors.progressErrorHeader,
        });

        return;
      }

      closeAwaitingForm();

      switch (action) {
        case ACTIONS.VIEW:
        case ACTIONS.PRINT:
        case ACTIONS.DOWNLOAD:
        case ACTIONS.SEND_TO_EMAIL:
        default:
          // TODO: переделать. Временное решение т.к. бек перестал передавать action, пока не понятно где будем фиксить, на фронте или на беке.
          await executor.execute(gotoTransactionsScrollerByStatementRequest, [statementRequest]);

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
