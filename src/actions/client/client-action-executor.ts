import { createExecuter } from '@platform/core';
import { createContext } from '@platform/services';

/** Контекст экзекутора клиента. */
export const clientExecutorContext = {
  ...createContext(),
};

/** Экзекутор клиента. */
export const clientActionExecutor = createExecuter(clientExecutorContext);

export type ClientExecutorContext = typeof clientExecutorContext;
