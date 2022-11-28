import { DATE_PERIODS } from 'interfaces';
import type { AccountOrganization, Branch, StatementHistoryResponseDto, StatementHistoryRow } from 'interfaces/admin';
import { getDateAndTime } from 'services/admin/mappers/utils';
import { uniqBy } from 'utils/common';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { formatAccountCode } from '@platform/tools/localization';

/**
 * Метод получения даты периода по типу периода.
 *
 * @param arg - Данные для вычисления даты периода.
 * @param arg.periodEnd - Конец периода.
 * @param arg.periodStart - Начало периода.
 * @param arg.periodType - Тип периода.
 */
const getPeriodDate = ({ periodEnd, periodStart, periodType }: { periodType: DATE_PERIODS; periodStart: string; periodEnd: string }) =>
  [DATE_PERIODS.YESTERDAY, DATE_PERIODS.TODAY].includes(periodType)
    ? formatDateTime(periodStart, { keepLocalTime: true, format: DATE_FORMAT })
    : `${formatDateTime(periodStart, { keepLocalTime: true, format: DATE_FORMAT })}–${formatDateTime(periodEnd, {
        keepLocalTime: true,
        format: DATE_FORMAT,
      })}`;

/**
 * Мап dto в представление запросов выписок для скроллера Истории запросов выписок.
 *
 * @param statements - Список запросов выписок.
 */
export const mapDtoToViewForStatementList = (statements: StatementHistoryResponseDto[]): StatementHistoryRow[] =>
  statements.map(
    ({
      accounts,
      action,
      createdAt,
      format,
      id,
      periodEnd,
      periodStart,
      periodType,
      statementId,
      statementStatus,
      statementType,
      status,
      user,
    }) => {
      const { accountNumbers, accountIds, organizations, serviceBranches } = accounts.reduce<{
        accountNumbers: string[];
        accountIds: string[];
        organizations: AccountOrganization[];
        serviceBranches: Branch[];
      }>(
        (prevValue, { branch, id: accountId, number, bankClient: organization }) => ({
          accountNumbers: [...prevValue.accountNumbers, number],
          accountIds: [...prevValue.accountIds, accountId],
          organizations: [...prevValue.organizations, organization],
          serviceBranches: [...prevValue.serviceBranches, branch],
        }),
        {
          accountNumbers: [],
          accountIds: [],
          organizations: [],
          serviceBranches: [],
        }
      );

      return {
        accountNumbers: accountNumbers.map(item => formatAccountCode(item)),
        accountIds,
        action,
        createdAt: getDateAndTime(createdAt),
        format,
        id,
        organizations: uniqBy(organizations, 'id'),
        periodDate: getPeriodDate({ periodEnd, periodStart, periodType }),
        periodEnd,
        periodStart,
        periodType,
        requestStatus: status,
        serviceBranches: uniqBy<Branch>(serviceBranches, 'id').map(({ filialName }) => filialName),
        statementId,
        statementType,
        statementStatus,
        user,
      };
    }
  );
