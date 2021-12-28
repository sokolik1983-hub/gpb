import { statementService } from 'services';
import { noop } from 'utils';
import { createExecuter, applyMiddlewares, onSuccessMiddleware } from '@platform/core';
import { createContext } from '@platform/services';

export const context = {
  ...createContext(),
  service: statementService,
};

/** Экзекутор клиента. */
export const executor = createExecuter(context);

/** Метод получения экзекутора.  */
export const getExecutor = () => applyMiddlewares<typeof context>(onSuccessMiddleware(noop))(executor);
