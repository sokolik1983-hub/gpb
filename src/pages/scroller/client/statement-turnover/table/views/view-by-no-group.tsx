import React from 'react';
import { COMMON_SCROLLER_NODE, TURNOVERS_SCROLLER_ROW_CATEGORY_NODE } from 'stream-constants/a11y-nodes';
import { AccountList } from '../account-list';
import type { IScrollerView } from '../table-body';

/**
 * Компонент просмотра таблицы без группировки.
 */
export const ViewByNoGroup: React.FC<IScrollerView> = ({ rows, prepareRow }) => (
  <AccountList
    hidden
    withoutBtn
    nodesIds={[`${TURNOVERS_SCROLLER_ROW_CATEGORY_NODE}-${rows[0].id}`, COMMON_SCROLLER_NODE]}
    prepareRow={prepareRow}
    rows={rows[0].subRows}
  />
);

ViewByNoGroup.displayName = 'ViewByNoGroup';
