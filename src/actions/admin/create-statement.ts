import type { CreateStatementRequestDto } from 'interfaces/admin';
import { fatalHandler, getUserDeviceInfo } from 'utils/common';
import { to, singleAction } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Банк: Функция запроса выписки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=69873403
 */
export const createStatement: IActionConfig<typeof context, string> = {
  action: ({ done, fatal, addSucceeded }, { service, showLoader, hideLoader }) => async ([doc]: [
    Omit<CreateStatementRequestDto, 'userDeviceInfo'>
  ]) => {
    showLoader();

    const userDeviceInfo = await getUserDeviceInfo();

    const [response, failure] = await to(service.createStatement({ ...doc, userDeviceInfo }));

    hideLoader();

    const { data: id, error } = response ?? {};

    fatal(failure || error);

    addSucceeded(id!);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
