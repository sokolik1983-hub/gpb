import React, { useCallback, useMemo, useState } from 'react';
import { executor } from 'actions/admin';
import { FilterLayout, ScrollerPageLayout } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusNode, FocusTree } from 'components/common/focus-tree';
import type { StatementHistoryRow } from 'interfaces/admin';
import { locale } from 'localization';
import type { StatementHistoryScrollerContextProps } from 'pages/scroller/admin/statement-history/context';
import { StatementHistoryScrollerContext } from 'pages/scroller/admin/statement-history/context';
import { useDebounce } from 'platform-copies/hooks';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { getDateRangeValidationScheme } from 'schemas';
import { statementService } from 'services/admin';
import { COMMON_SCROLLER_NODE, HISTORY_SCROLLER_FILTER_NODE } from 'stream-constants/a11y-nodes';
import { convertTablePaginationToMetaData, getActiveActionButtons } from 'utils/common';
import { useFilter } from '@platform/services';
import { MainLayout, useAuth } from '@platform/services/admin';
import type { IMetaData } from '@platform/services/client/dist-types/interfaces/common';
import { validate } from '@platform/validation';
import { HEADER_ACTIONS } from './action-configs';
import { ADDITIONAL_FORM_FIELDS, AdditionalFilter, FORM_FIELDS, QuickFilter, STORAGE_KEY, fields } from './filter';
import { Table } from './table';

/** Заглушка для панели тегов. */
export const TagsPanel = () => null;

/** Схема валидации формы фильтра скроллера. */
const validationSchema = getDateRangeValidationScheme({ dateFrom: FORM_FIELDS.DATE_FROM, dateTo: FORM_FIELDS.DATE_TO });

/**
 * [Выписки_ЗВ] ЭФ Банка "Журнал запросов выписки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32247657
 */
export const StatementHistoryScrollerPage = () => {
  const [_, setLoading] = useState(false);
  const [totalStatements, setTotalStatements] = useState(0);

  const { filterPanel, filterValues, tagsPanel } = useFilter({ fields, labels: {}, storageKey: STORAGE_KEY });

  const filterValuesDebounced = useDebounce(filterValues, 200);

  /** Метод делает запрос выписок на сервер. */
  const fetchStatements = useCallback(
    async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<IFetchDataResponse<StatementHistoryRow>> => {
      const metaData: IMetaData = {
        filters: {
          [FORM_FIELDS.PERIOD_TYPE]: filterValuesDebounced[FORM_FIELDS.PERIOD_TYPE],
        },
        multiSort,
        ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
      };

      const { data: rows, total } = await statementService.getStatementList(metaData);

      setTotalStatements(total);

      return { rows, pageCount: Math.ceil(total / pageSize) };
    },
    [filterValuesDebounced]
  );

  // Эти данные будут приходить с сервера.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const accounts = [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const organizations = [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const serviceBranch = [];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const users = [];

  const { getAvailableActions } = useAuth();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(HEADER_ACTIONS), executor, [{ id: '#' }]), [
    getAvailableActions,
  ]);

  const headerProps = {
    actions,
    header: locale.admin.historyScroller.pageTitle,
  };

  const contextValue: StatementHistoryScrollerContextProps = useMemo(
    () => ({
      accounts,
      fetchStatements,
      organizations,
      serviceBranch,
      setLoading,
      totalStatements,
      users,
    }),
    [accounts, fetchStatements, organizations, serviceBranch, totalStatements, users]
  );

  return (
    <StatementHistoryScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <FocusLock>
          <FocusTree treeId={COMMON_SCROLLER_NODE}>
            <ScrollerPageLayout headerProps={headerProps} loading={false}>
              <FocusNode hidden nodeId={HISTORY_SCROLLER_FILTER_NODE} parentId={COMMON_SCROLLER_NODE}>
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
              </FocusNode>
              <Table />
            </ScrollerPageLayout>
          </FocusTree>
        </FocusLock>
      </MainLayout>
    </StatementHistoryScrollerContext.Provider>
  );
};
