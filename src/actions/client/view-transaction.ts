import { showTransactionCard } from 'components/client/transaction-card';
import { fatalHandler, getUserDeviceInfo } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { IBaseEntity } from '@platform/services/client';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Клиент: Функция просмотра карточки проводки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675633
 */
export const viewTransaction: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal }, { service, showLoader, hideLoader }) => async ([doc]: IBaseEntity[], statementId: string) => {
    showLoader();

    const userDeviceInfo = await getUserDeviceInfo();

    const [res, err] = await to(service.getTransaction({ accountingEntryId: doc.id, userDeviceInfo }));

    hideLoader();

    fatal(err);

    const { data: transaction, error } = res!;

    fatal(error);

    void showTransactionCard(transaction, statementId);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
