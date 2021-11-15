import type { IGetAccountsResponseDto } from 'interfaces/client';
import { getAccountUrl } from '@platform/services';
import type { IServerDataResp } from '@platform/services/client';
import { request } from '@platform/services/client';

const ACCOUNTS_BASE_URL = getAccountUrl();

/**
 * Сервис счетов клиента.
 *
 * @see {@link http://api-gateway.sandbox.gboteam.ru/client-dictionary/swagger-ui.html}
 */
export const accountService = {
  /** Возвращает счета пользователя для формирования выписок. */
  getAccounts: (): Promise<IGetAccountsResponseDto[]> =>
    request<IServerDataResp<IGetAccountsResponseDto[]>>({
      url: `${ACCOUNTS_BASE_URL}/search-user-account-for-statement`,
    }).then(result => result.data.data),
};
