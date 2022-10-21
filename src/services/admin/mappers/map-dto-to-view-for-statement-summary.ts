import type { StatementSummary, TotalTurnover, TotalTurnoverGroupedByCurrencyResponseDto } from 'interfaces/admin';
import { formatAccountCode } from '@platform/tools/localization';

/**
 * Мап dto в представление сводной информации по выписке.
 *
 * @param totalTurnovers - Суммарные обороты сгруппированные по валюте.
 * @param totalTurnovers.groups - Список групп.
 * @param totalTurnovers.statement - Данные выписки.
 */
export const mapDtoToViewForStatementSummary = ({ groups, statement }: TotalTurnoverGroupedByCurrencyResponseDto): StatementSummary => ({
  groups: groups.map(
    ({ accounts, currency, incomingBalance, incomingCount, outgoingBalance, outgoingCount, turnoverCredit, turnoverDebit }) => {
      const { accountNumbers, organizationNames } = accounts.reduce<Pick<TotalTurnover, 'accountNumbers' | 'organizationNames'>>(
        (prevValue, { bankClient: { name }, number }) => ({
          ...prevValue,
          accountNumbers: [...prevValue.accountNumbers, formatAccountCode(number)],
          organizationNames: [...prevValue.organizationNames, name],
        }),
        { accountNumbers: [], organizationNames: [] }
      );

      return {
        accountNumbers,
        currencyCode: currency.letterCode,
        incomingBalance,
        incomingCount,
        organizationNames,
        outgoingBalance,
        outgoingCount,
        statement,
        turnoverCredit,
        turnoverDebit,
      };
    }
  ),
  statement,
});
