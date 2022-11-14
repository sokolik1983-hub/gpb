import { useMemo } from 'react';
import { executor } from 'actions/admin';
import type { StatementHistoryRow } from 'interfaces/admin';
import { HEADER_ACTIONS } from 'pages/scroller/admin/statements/action-configs';
import { getActiveActionButtons } from 'utils/common';
import { useAuth } from '@platform/services/admin';
import type { IButtonAction } from '@platform/ui';

/** Свойства хука useHeader. */
interface UseHeaderRequest {
  /** Дата начала периода. */
  dateFrom: string;
  /** Дата окончания периода. */
  dateTo: string;
  /** Выписки. */
  statements: StatementHistoryRow[];
}

/** Хук, возвращающий экшены заголовка скроллера. */
export const useHeaderActions = ({ dateFrom, dateTo, statements }: UseHeaderRequest): IButtonAction[] => {
  const { getAvailableActions } = useAuth();

  return useMemo(
    () =>
      getActiveActionButtons(getAvailableActions(HEADER_ACTIONS), executor, [
        {
          dateFrom,
          dateTo,
          statements,
        },
      ]),
    [dateFrom, dateTo, getAvailableActions, statements]
  );
};
