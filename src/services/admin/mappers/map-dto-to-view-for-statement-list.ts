import { DATE_PERIODS } from 'interfaces';
import type { Organization, StatementHistoryResponseDto, StatementHistoryRow } from 'interfaces/admin';
import { DATE_FORMAT, DATE_TIME_FORMAT_WITHOUT_SEC } from '@platform/services';
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
    : `${formatDateTime(periodEnd, { keepLocalTime: true, format: DATE_FORMAT })}–${formatDateTime(periodStart, {
        keepLocalTime: true,
        format: DATE_FORMAT,
      })}`;

/**
 * Получить дату и время из полной даты.
 *
 * @param fullDate - Полная дата.
 */
const getDateAndTime = (fullDate: string): { date: string; time: string } => {
  const [date, time] = formatDateTime(fullDate, {
    keepLocalTime: true,
    format: DATE_TIME_FORMAT_WITHOUT_SEC,
  }).split(' ');

  return { date, time };
};

/**
 * Мап dto в представление запросов выписок для скроллера Истории запросов выписок.
 *
 * @param statements - Запросы выписок.
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
      const { accountNumbers, accountsIds, organizations, serviceBranches } = accounts.reduce<{
        accountNumbers: string[];
        accountsIds: string[];
        organizations: Organization[];
        serviceBranches: string[];
      }>(
        (prevValue, { filialName, id: accountId, number, organization }) => ({
          accountNumbers: [...prevValue.accountNumbers, number],
          accountsIds: [...prevValue.accountsIds, accountId],
          organizations: [...prevValue.organizations, organization],
          serviceBranches: [...prevValue.serviceBranches, filialName],
        }),
        {
          accountNumbers: [],
          accountsIds: [],
          organizations: [],
          serviceBranches: [],
        }
      );

      return {
        accountNumbers: accountNumbers.map(item => formatAccountCode(item)),
        accountsIds,
        action,
        createdAt: getDateAndTime(createdAt),
        format,
        id,
        organizations,
        periodDate: getPeriodDate({ periodEnd, periodStart, periodType }),
        periodType,
        requestStatus: status,
        serviceBranches,
        statementId,
        statementType,
        statementStatus,
        user,
      };
    }
  );
