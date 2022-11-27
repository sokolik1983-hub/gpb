import React, { useMemo, useState } from 'react';
import { executor } from 'actions/admin';
import { ScrollerPageLayout } from 'components/admin';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import type { TurnoverCard } from 'interfaces/admin/dto/turnover';
import { locale } from 'localization';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import { getActiveActionButtons } from 'utils/common';
import type { IFilters } from '@platform/core';
import { MainLayout, useAuth } from '@platform/services/admin';
import { HEADER_ACTIONS } from './action-config';
import type { ScrollerContextProps } from './context';
import { defaultValue, ScrollerContext } from './context';
import { Filter } from './filter';
import { FORM_FIELDS } from './filter/constants';
import { Table } from './table';

/** Скроллер остатков и оборотов. */
export const TurnoverScrollerPage: React.FC = () => {
  const { getAvailableActions } = useAuth();
  const [filters, setFilters] = useState<IFilters>(defaultValue.filters);

  const [selectedRows, setSelectedRows] = useState<TurnoverCard[]>(defaultValue.selectedRows);
  const contextValue: ScrollerContextProps = useMemo(
    () => ({
      selectedRows,
      setSelectedRows,
      filters,
      setFilters,
    }),
    [filters, selectedRows]
  );

  const params = useMemo(() => [selectedRows, filters[FORM_FIELDS.DATE_FROM]?.value, filters[FORM_FIELDS.DATE_TO]?.value], [
    filters,
    selectedRows,
  ]);

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(HEADER_ACTIONS), executor, params), [
    getAvailableActions,
    params,
  ]);
  const headerProps = {
    actions,
    header: locale.admin.turnoverScroller.title,
  };

  return (
    <ScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <FocusLock>
          <FocusTree treeId={COMMON_SCROLLER_NODE}>
            <ScrollerPageLayout headerProps={headerProps}>
              <Filter setFilter={setFilters} />
              <Table />
            </ScrollerPageLayout>
          </FocusTree>
        </FocusLock>
      </MainLayout>
    </ScrollerContext.Provider>
  );
};

TurnoverScrollerPage.displayName = 'TurnoverScrollerPage';
