import type { FC } from 'react';
import React from 'react';
import { Phase } from 'pages/scroller/admin/closed-days/table/cells/phase/phase';
import type { ClosedDayCellProps } from 'pages/scroller/admin/closed-days/table/cells/types';

/** Ячейка таблицы с записью о закрытии третей фазы. */
export const ThirdPhase: FC<ClosedDayCellProps> = ({ value: { thirdPhase } }) =>
  thirdPhase ? <Phase date={thirdPhase.date} messageId={thirdPhase.messageId} time={thirdPhase.time} /> : null;

ThirdPhase.displayName = 'ThirdPhase';
