import React, { useMemo } from 'react';
import { executor } from 'actions/admin';
import { ScrollerPageLayout } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { locale } from 'localization';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import { getActiveActionButtons } from 'utils/common';
import { MainLayout, useAuth } from '@platform/services/admin';
import { HEADER_ACTIONS } from './action-config';
import { ScrollerContext } from './context';
import { Table } from './table';

/** Скроллер остатков и оборотов. */
export const TurnoversScrollerPage: React.FC = () => {
  const { getAvailableActions } = useAuth();

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const contextValue = {};

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(HEADER_ACTIONS), executor, []), [getAvailableActions]);

  const headerProps = {
    actions,
    header: locale.admin.historyScroller.pageTitle,
  };

  return (
    <ScrollerContext.Provider value={contextValue}>
      <MainLayout>
        <FocusLock>
          <FocusTree treeId={COMMON_SCROLLER_NODE}>
            <ScrollerPageLayout headerProps={headerProps}>
              <Table />
            </ScrollerPageLayout>
          </FocusTree>
        </FocusLock>
      </MainLayout>
    </ScrollerContext.Provider>
  );
};

TurnoversScrollerPage.displayName = 'TurnoversScrollerPage';
