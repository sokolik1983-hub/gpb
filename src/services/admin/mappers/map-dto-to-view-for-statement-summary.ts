import type { AccountOrganization, StatementSummary, TotalTurnoverGroupedByCurrencyResponseDto } from 'interfaces/admin';
import { uniqBy } from 'utils/common';
import { formatAccountCode } from '@platform/tools/localization';

/**
 * Мап dto в представление сводной информации по выписке.
 *
 * @param totalTurnovers - Суммарные обороты сгруппированные по валюте.
 * @param totalTurnovers.groups - Список групп.
 * @param totalTurnovers.statement - Данные выписки.
 */
export const mapDtoToViewForStatementSummary = ({ groups, statement }: TotalTurnoverGroupedByCurrencyResponseDto): StatementSummary => {
  const { organizations, ...otherProps } = groups.reduce<
    Omit<StatementSummary, 'organizationNames'> & { organizations: AccountOrganization[] }
  >(
    (
      prevValue,
      {
        accounts,
        currency: { letterCode: currencyCode },
        incomingBalance,
        incomingCount,
        outgoingBalance,
        outgoingCount,
        turnoverCredit,
        turnoverDebit,
      }
    ) => {
      const { accountNumberList, organizationList } = accounts.reduce<{
        accountNumberList: string[];
        organizationList: AccountOrganization[];
      }>(
        (prevAccountValue, { bankClient, number }) => ({
          ...prevAccountValue,
          accountNumberList: [...prevAccountValue.accountNumberList, formatAccountCode(number)],
          organizationList: [...prevAccountValue.organizationList, bankClient],
        }),
        { accountNumberList: [], organizationList: [] }
      );

      return {
        ...prevValue,
        accountNumbers: [...prevValue.accountNumbers, ...accountNumberList],
        incomingCount: prevValue.incomingCount + incomingCount,
        currencyGroups: [
          ...prevValue.currencyGroups,
          { currencyCode, incomingBalance, incomingCount, outgoingBalance, outgoingCount, turnoverCredit, turnoverDebit },
        ],
        organizations: [...prevValue.organizations, ...organizationList],
        outgoingCount: prevValue.outgoingCount + outgoingCount,
      };
    },
    {
      accountNumbers: [],
      incomingCount: 0,
      currencyGroups: [],
      organizations: [],
      outgoingCount: 0,
      statement,
    }
  );

  return {
    organizationNames: uniqBy<AccountOrganization>(organizations, 'id').map(({ name }) => name),
    ...otherProps,
  };
};
