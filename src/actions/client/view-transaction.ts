import { showTransactionCard } from 'pages/scroller/client/statement-transaction/transaction-cardr';
import { fatalHandler } from 'utils';
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
  action: ({ done, fatal }, { service, showLoader, hideLoader }) => async ([doc]: [IBaseEntity]) => {
    showLoader();

    const [res, err] = await to(service.getTransaction(doc.id));

    hideLoader();

    const { data: transaction, error } = res ?? {};

    fatal(err || error);

    void showTransactionCard(transaction!);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
