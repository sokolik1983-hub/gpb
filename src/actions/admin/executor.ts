import { statementService } from 'services/admin';
import { noop } from 'utils/common';
import { createExecuter, applyMiddlewares, onSuccessMiddleware } from '@platform/core';
import { createContext } from '@platform/services';

export const context = {
  ...createContext(),
  service: statementService,
};

/** Экзекутор клиента. */
export const executor = createExecuter(context);

/** Метод получения экзекутора. */
export const getExecutor = () => applyMiddlewares<typeof context>(onSuccessMiddleware(noop))(executor);
