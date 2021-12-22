import type { IRequestStatementDto } from 'interfaces/client/request-statement-dto';
import { to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * Функция запроса выписки.
 *
 * Https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675639.
 */
export const createStatement: IActionConfig<typeof context, IRequestStatementDto> = {
  action: ({ done, fatal, addSucceeded, addFailed }, { service, showLoader, hideLoader, showAwaitingForm }) => async ([
    doc,
  ]: IRequestStatementDto[]) => {
    showLoader();

    // создание нового запроса выписки
    const [statement, cancel] = await to(service.createStatement(doc));

    hideLoader();

    if (cancel) {
      fatal();
      done();

      return;
    }

    // ожидание формирования выписки
    const [_, close] = await to(showAwaitingForm());

    if (close) {
      addFailed();
      done();

      return;
    }

    addSucceeded(statement!);

    done();
  },
  guardians: [],
};
