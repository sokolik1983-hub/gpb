import { locale } from 'localization';
import { showAwaitingForm } from 'pages/form/client/components/awaiting-form';
import { to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * Функция запроса выписки.
 *
 * Https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675639.
 */
export const createStatement: IActionConfig<typeof context, string> = {
  action: ({ done, fatal, addSucceeded }, { service, showLoader, hideLoader }) => async ([doc]) => {
    showLoader();

    const [id, err] = await to(service.createStatement(doc));

    hideLoader();

    fatal(err);

    // ожидание формирования выписки
    const [_, close] = await to(showAwaitingForm(id!));

    if (close) {
      done();
    }

    addSucceeded(id!);

    done();
  },
  fatalHandler({ showError }) {
    showError(locale.errors.progressErrorHeader, locale.errors.progressError);
  },
  guardians: [],
};
