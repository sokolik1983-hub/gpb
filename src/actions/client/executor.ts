import { createExecuter } from '@platform/core';
import { createContext } from '@platform/services';

/** Контекст экзекутора клиента. */
export const context = {
  ...createContext(),
};

/** Экзекутор клиента. */
export const executor = createExecuter(context);
