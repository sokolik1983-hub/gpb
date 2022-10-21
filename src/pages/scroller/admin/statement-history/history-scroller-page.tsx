import React, { useCallback, useMemo, useState } from 'react';
import { executor } from 'actions/admin';
import { ContentLoader, FilterLayout, SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusNode, FocusTree } from 'components/common/focus-tree';
import {
  useAccounts,
  useAccountsByIds,
  useOrganizations,
  useOrganizationsByIds,
  useServiceBranches,
  useUsers,
  useUsersByFio,
} from 'hooks/admin';
import { useIsFetchedData, useStreamContentHeight } from 'hooks/common';
import type { IFilterPanel } from 'interfaces';
import type { StatementHistoryRow } from 'interfaces/admin';
import { locale } from 'localization';
import type { StatementHistoryScrollerContextProps } from 'pages/scroller/admin/statement-history/context';
import { StatementHistoryScrollerContext } from 'pages/scroller/admin/statement-history/context';
import type { FilterValues } from 'pages/scroller/admin/statement-history/filter/types';
import { useDebounce } from 'platform-copies/hooks';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { getDateRangeValidationScheme } from 'schemas';
import { statementService } from 'services/admin';
import { LINE_HEIGHT } from 'stream-constants';
import { COMMON_SCROLLER_NODE, HISTORY_SCROLLER_FILTER_NODE } from 'stream-constants/a11y-nodes';
import { convertTablePaginationToMetaData, getActiveActionButtons } from 'utils/common';
import { useFilter } from '@platform/services';
import { MainLayout, useAuth } from '@platform/services/admin';
import type { IMetaData } from '@platform/services/client/dist-types/interfaces/common';
import { Box } from '@platform/ui';
import { validate } from '@platform/validation';
import { HEADER_ACTIONS } from './action-configs';
import { ADDITIONAL_FORM_FIELDS, AdditionalFilter, FORM_FIELDS, QuickFilter, STORAGE_KEY, fields, tagLabels } from './filter';
import { Table } from './table';
import { TagsPanel } from './tags-panel';

/** Схема валидации формы фильтра скроллера. */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO });

/** Высота фильтра. Минус разделитель внизу фильтра. */
const FILTER_HEIGHT = 58 - LINE_HEIGHT;

/** Задержка изменения данных в мс.  */
const DEBOUNCE_DELAY = 300;

/**
 * [Выписки_ЗВ] ЭФ Банка "Журнал запросов выписки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32247657
 */
export const StatementHistoryScrollerPage = () => {
  const [totalStatements, setTotalStatements] = useState(0);
  const [statements, setStatements] = useState<StatementHistoryRow[]>([]);
  const [statementsInitialed, setStatementsInitialed] = useState(false);
  const [accountSearchValue, setAccountSearchValue] = useState('');
  const [organizationSearchValue, setOrganizationSearchValue] = useState('');
  const [userSearchValue, setUserSearchValue] = useState('');

  const [datePeriodInitialed, setDatePeriodInitialed] = useState(false);

  const { filterPanel, filterValues, tagsPanel } = useFilter({ fields, labels: tagLabels, storageKey: STORAGE_KEY });

  // Получение счетов.
  const selectedAccountIds = filterValues?.[FORM_FIELDS.ACCOUNT_IDS]?.value || [];
  const { data: selectedAccounts, isFetched: isSelectedAccountsFetched } = useAccountsByIds(selectedAccountIds);

  const accountSearchValueDebounced = useDebounce(accountSearchValue, DEBOUNCE_DELAY);
  const { data: accounts, isFetched: isAccountsFetched } = useAccounts(accountSearchValueDebounced);

  const accountsFetched = useIsFetchedData(isAccountsFetched);
  const selectedAccountsFetched = useIsFetchedData(isSelectedAccountsFetched);

  // Получение организаций.
  const selectedOrganizationIds = filterValues?.[FORM_FIELDS.ORGANIZATION_IDS]?.value || [];
  const { data: selectedOrganizations } = useOrganizationsByIds(selectedOrganizationIds);

  const organizationSearchValueDebounced = useDebounce(organizationSearchValue, DEBOUNCE_DELAY);
  const { data: organizations } = useOrganizations(organizationSearchValueDebounced);

  // Получение пользователей.
  const selectedUserIds = filterValues?.[FORM_FIELDS.USER_IDS]?.value || [];
  const { data: selectedUsers } = useUsers({ ids: selectedUserIds });

  const userSearchValueDebounced = useDebounce(userSearchValue, DEBOUNCE_DELAY);
  const { data: users } = useUsersByFio(userSearchValueDebounced);

  // Получение подразделений обслуживания.
  const { data: serviceBranches } = useServiceBranches();

  const filterValuesDebounced = useDebounce(filterValues, DEBOUNCE_DELAY);

  /** Метод делает запрос выписок на сервер. */
  const fetchStatements = useCallback(
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<StatementHistoryRow>> => {
      try {
        const metaData: IMetaData = {
          filters: filterValuesDebounced,
          multiSort,
          ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
        };

        const { data: rows, total } = await statementService.getStatementList(metaData);

        setStatements(rows);
        setTotalStatements(total);

        return { rows, pageCount: Math.ceil(total / pageSize) };
      } catch {
        return { rows: [], pageCount: 0 };
      } finally {
        if (!statementsInitialed) {
          setStatementsInitialed(true);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filterValuesDebounced]
  );

  const { getAvailableActions } = useAuth();

  const actions = useMemo(
    () =>
      getActiveActionButtons(getAvailableActions(HEADER_ACTIONS), executor, [
        {
          dateFrom: filterPanel.values[FORM_FIELDS.DATE_FROM],
          dateTo: filterPanel.values[FORM_FIELDS.DATE_TO],
          statements,
        },
      ]),
    [filterPanel, getAvailableActions, statements]
  );

  const headerProps = {
    actions,
    header: locale.admin.historyScroller.pageTitle,
  };

  const setDatePeriodFetched = useCallback(() => {
    if (!datePeriodInitialed) {
      setDatePeriodInitialed(true);
    }
  }, [datePeriodInitialed]);

  const contextValue: StatementHistoryScrollerContextProps = useMemo(
    () => ({
      accounts,
      fetchStatements,
      filterPanel: (filterPanel as unknown) as IFilterPanel<FilterValues>,
      organizations,
      selectedAccounts,
      selectedOrganizations,
      selectedUsers,
      serviceBranches,
      setAccountSearchValue,
      setDatePeriodFetched,
      setOrganizationSearchValue,
      setUserSearchValue,
      tagsPanel,
      totalStatements,
      users,
    }),
    [
      accounts,
      fetchStatements,
      filterPanel,
      organizations,
      selectedAccounts,
      selectedOrganizations,
      selectedUsers,
      serviceBranches,
      setDatePeriodFetched,
      tagsPanel,
      totalStatements,
      users,
    ]
  );

  const height = useStreamContentHeight();

  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT - FILTER_HEIGHT;

  const filterLoading = selectedAccountIds.length > 0 ? !(selectedAccountsFetched && accountsFetched) : !accountsFetched;

  return (
    <StatementHistoryScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <FocusLock>
          <FocusTree treeId={COMMON_SCROLLER_NODE}>
            <ScrollerPageLayout headerProps={headerProps}>
              <FocusNode hidden nodeId={HISTORY_SCROLLER_FILTER_NODE} parentId={COMMON_SCROLLER_NODE}>
                <ContentLoader height={FILTER_HEIGHT} loading={filterLoading}>
                  <FilterLayout
                    AdditionalFilter={AdditionalFilter}
                    QuickFilter={QuickFilter}
                    TagsPanel={TagsPanel}
                    additionalFilterFields={ADDITIONAL_FORM_FIELDS}
                    filterFields={fields}
                    filterState={filterPanel}
                    tagsState={tagsPanel}
                    validate={validate(validationSchema)}
                  />
                </ContentLoader>
              </FocusNode>
              <ContentLoader height={tableHeight} loading={!datePeriodInitialed && !statementsInitialed}>
                <Box />
              </ContentLoader>
              {datePeriodInitialed && <Table />}
            </ScrollerPageLayout>
          </FocusTree>
        </FocusLock>
      </MainLayout>
    </StatementHistoryScrollerContext.Provider>
  );
};

StatementHistoryScrollerPage.displayName = 'StatementHistoryScrollerPage';
