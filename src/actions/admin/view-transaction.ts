import { showTransactionCard } from 'components/admin/transaction-card';
import { fatalHandler } from 'utils/common';
import { singleAction, to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { IBaseEntity } from '@platform/services/client';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Банк: Функция просмотра карточки проводки.
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440049
 */
export const viewTransaction: IActionConfig<typeof context, Promise<void>> = {
  action: ({ done, fatal }, { service, showLoader, hideLoader }) => async ([doc]: IBaseEntity[], statementId: string) => {
    showLoader();

    const [res, err] = await to(service.getTransaction({ accountingEntryId: doc.id }));

    hideLoader();

    fatal(err);

    // TODO Убрать после реализации сервиса getTransaction
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { data: transaction, error } = res;

    fatal(error);

    void showTransactionCard(transaction, statementId);

    done();
  },
  fatalHandler,
  guardians: [singleAction],
};
