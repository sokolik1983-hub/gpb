import { showTransactionCard } from 'components/admin/transaction-card';
import { fatalHandler } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig, IBaseEntity } from '@platform/services';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Банк: Функция просмотра карточки проводки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440049
 */
export const viewEntry: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal }, { service, showLoader, hideLoader }) => async ([doc]: IBaseEntity[]) => {
    showLoader();

    const [res, err] = await to(service.getTransaction({ accountingEntryId: doc.id }));

    hideLoader();

    fatal(err);

    const { data: transaction, error } = res!;

    fatal(error);

    void showTransactionCard(transaction);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
