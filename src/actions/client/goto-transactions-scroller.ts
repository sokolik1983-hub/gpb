import { COMMON_STREAM_URL } from 'stream-constants/client';
import { singleAction } from '@platform/core';
import { open } from '@platform/services/client';

/**
 * Действие перехода на скроллер проводок.
 *
 * @param id - Идентификатор сущности "Запроса выписки".
 */
export const gotoTransactionsScroller = {
  ...open(COMMON_STREAM_URL.STATEMENT_TRANSACTIONS),
  guardians: [singleAction],
};
