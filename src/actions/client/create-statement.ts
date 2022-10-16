import type { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { TYPE } from 'interfaces/common';
import type { ICreateRequestStatementDto } from 'interfaces/dto';
import { locale } from 'localization';
import { showAwaitingForm } from 'pages/form/client/components/awaiting-form';
import type { IFormState } from 'stream-constants/form';
import { fatalHandler, statementRequestValidationSchema, getUserDeviceInfo } from 'utils/common';
import type { ValidationError } from 'yup';
import { to, singleAction } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * Функция запроса выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675639
 */
export const createStatement: (useCase: EXPORT_PARAMS_USE_CASES) => IActionConfig<typeof context, string> = useCase => ({
  action: ({ done, fatal, addSucceeded }, { service, showLoader, showError, hideLoader }) => async ([doc]: [
    ICreateRequestStatementDto
  ]) => {
    // если запрос создаётся не через форму, то первая найденная ошибка отображается в диалоге
    if (doc.type === TYPE.HIDDEN_VIEW) {
      const [_, validationError] = (await to(statementRequestValidationSchema.validate(doc, { abortEarly: true }))) as [
        IFormState,
        ValidationError
      ];

      if (validationError) {
        showError(locale.errors.progressErrorHeader, validationError.errors[0]);

        done();
      }
    }

    showLoader();

    const userDeviceInfo = await getUserDeviceInfo();

    const [res, err] = await to(service.createStatement({ ...doc, userDeviceInfo }));

    hideLoader();

    const { data: id, error } = res ?? {};

    fatal(err || error);

    // показываем ЭФ ожидания формирования выписки
    const [_, close] = await to(showAwaitingForm(id!, useCase));

    if (close) {
      done();
    }

    addSucceeded(id!);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
});
