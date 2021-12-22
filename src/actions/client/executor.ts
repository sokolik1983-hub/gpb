import { AwaitingForm } from 'pages/form/client/components/awaiting-form';
import { statementService } from 'services';
import { noop } from 'utils';
import { createExecuter, applyMiddlewares, onSuccessMiddleware } from '@platform/core';
import { createContext } from '@platform/services';
import { dialog } from '@platform/ui';

export const context = {
  ...createContext(),
  service: statementService,
  showAwaitingForm: () =>
    new Promise<void>((resolve, reject) =>
      dialog.show(
        'awaitingForm',
        AwaitingForm,
        {
          onSuccess: resolve,
        },
        () => reject(true)
      )
    ),
};

/** Экзекутор клиента. */
export const executor = createExecuter(context);

/** Метод получения экзекутора.  */
export const getExecutor = () => applyMiddlewares<typeof context>(onSuccessMiddleware(noop))(executor);
