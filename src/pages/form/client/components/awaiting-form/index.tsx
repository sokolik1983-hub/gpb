import React, { useEffect } from 'react';
import { executor } from 'actions/client/executor';
import { exportStatement } from 'actions/client/export-statement';
import { gotoTransactionsScrollerByStatementRequest } from 'actions/client/goto-transactions-scroller-by-statement-request';
import { printStatement } from 'actions/client/print-statement';
import { STATEMENT_REQUEST_STATUSES } from 'interfaces';
import { ACTION } from 'interfaces/client';
import type { IGetStatusResponceDto } from 'interfaces/dto';
import { locale } from 'localization';
import { statementService } from 'services';
import { polling, POLLING_WAS_STOPPED_BY_USER, showCommonErrorMessage } from 'utils';
import { to } from '@platform/core';
import type { IServerDataResp } from '@platform/services';
import type { IButtonAction } from '@platform/ui';
import { Box, BUTTON, DialogTemplate, Gap, ServiceIcons, Typography, dialog, DATA_TYPE } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента AwaitingForm. */
export interface IAwaitingFormProps {
  /** Коллбэк закрытия формы. */
  onClose(): void;
  /** Id выписки. */
  id: string;
}

/**
 * ЭФ Клиента "Выписка формируется".
 * Ожидает перехода запроса выписки в окончательные статусы.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440121
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
     * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675639
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

      const { data: doc, error: statementRequestError } = statementRequestResp ?? {};

      if (fatalStatementRequestErr || statementRequestError) {
        closeAwaitingForm();
        showCommonErrorMessage();

        return;
      }

      const { commentForClient = '', statementActionDto } = doc!;

      if (status === STATEMENT_REQUEST_STATUSES.DENIED) {
        closeAwaitingForm();
        dialog.showAlert(locale.errors.statementDenied({ message: commentForClient }), {
          header: locale.errors.progressErrorHeader,
        });

        return;
      }

      closeAwaitingForm();

      switch (statementActionDto) {
        case ACTION.VIEW:
          await executor.execute(gotoTransactionsScrollerByStatementRequest, [doc], ACTION.VIEW);

          return;
        case ACTION.DOWNLOAD:
          await executor.execute(exportStatement, [doc]);

          return;
        case ACTION.PRINT:
          await executor.execute(printStatement, [doc]);

          return;
        case ACTION.SEND_TO_EMAIL:
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
        dataType={DATA_TYPE.CONFIRMATION}
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
