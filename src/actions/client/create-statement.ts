import { to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * Функция запроса выписки.
 *
 * Https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675639.
 */
export const createStatement: IActionConfig<typeof context, string> = {
  action: ({ done, fatal, addSucceeded, addFailed }, { service, showLoader, hideLoader, showAwaitingForm }) => async ([doc]) => {
    showLoader();

    // создание нового запроса выписки
    const [id, cancel] = await to(service.createStatement(doc));

    hideLoader();

    if (cancel) {
      fatal();
      done();

      return;
    }

    // ожидание формирования выписки
    const [_, close] = await to(showAwaitingForm(id!));

    if (close) {
      addFailed();
      done();

      return;
    }

    addSucceeded(id!);

    done();
  },
  guardians: [],
};
