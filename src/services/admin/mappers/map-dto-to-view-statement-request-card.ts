import type { ExtendedStatementRequestCard, StatementRequestCard } from 'interfaces/admin';
import { formatAccountCode } from '@platform/tools/localization';

/**
 * Мап dto в представление карточки запроса выписки.
 *
 * @param card - Карточка запроса выписки.
 */
export const mapDtoToViewStatementRequestCard = (card: StatementRequestCard): ExtendedStatementRequestCard => ({
  ...card,
  accounts: card.accounts.map(({ number, ...rest }) => ({
    ...rest,
    number: formatAccountCode(number),
  })),
  organizations: card.accounts.map(({ bankClient }) => bankClient),
});
