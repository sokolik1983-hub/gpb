import type { ICreateRequestStatementDto } from 'interfaces/client';
import { TYPE } from 'interfaces/client';
import { locale } from 'localization';
import { showAwaitingForm } from 'pages/form/client/components/awaiting-form';
import { fatalHandler, statementRequestValidationSchema } from 'utils';
import type { ValidationError } from 'yup';
import { to, singleAction } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * Функция запроса выписки.
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675639}
 */
export const createStatement: IActionConfig<typeof context, string> = {
  action: ({ done, fatal, addSucceeded }, { service, showLoader, showError, hideLoader }) => async ([doc]: [
    ICreateRequestStatementDto
  ]) => {
    // Если запрос создаётся не через форму, то первая найденная ошибка отображается в диалоге.
    if (doc.type === TYPE.HIDDEN_VIEW) {
      const [_, validationError] = (await to(statementRequestValidationSchema.validate(doc, { abortEarly: true }))) as [
        ICreateRequestStatementDto,
        ValidationError
      ];

      if (validationError) {
        showError(locale.errors.progressErrorHeader, validationError.errors[0]);

        done();
      }
    }

    showLoader();

    const [res, err] = await to(service.createStatement(doc));

    hideLoader();

    const { data: id, error } = res ?? {};

    fatal(err || error);

    // ожидание формирования выписки
    const [_, close] = await to(showAwaitingForm(id!));

    if (close) {
      done();
    }

    addSucceeded(id!);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
