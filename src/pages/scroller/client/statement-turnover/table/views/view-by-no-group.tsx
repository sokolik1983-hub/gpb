import React from 'react';
import { AccountList } from '../account-list';
import type { IScrollerView } from '../table-body';

/**
 * Компонент просмотра таблицы без группировки.
 */
export const ViewByNoGroup: React.FC<IScrollerView> = ({ rows, prepareRow }) => (
  <AccountList withoutBtn prepareRow={prepareRow} rows={rows[0].subRows} />
);

ViewByNoGroup.displayName = 'ViewByNoGroup';
