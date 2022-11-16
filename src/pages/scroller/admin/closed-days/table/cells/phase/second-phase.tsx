import type { FC } from 'react';
import React from 'react';
import { Phase } from 'pages/scroller/admin/closed-days/table/cells/phase/phase';
import type { ClosedDayCellProps } from 'pages/scroller/admin/closed-days/table/cells/types';

/** Ячейка таблицы с записью о закрытии второй фазы. */
export const SecondPhase: FC<ClosedDayCellProps> = ({ value: { secondPhase } }) =>
  secondPhase ? <Phase date={secondPhase.date} messageId={secondPhase.messageId} time={secondPhase.time} /> : null;

SecondPhase.displayName = 'SecondPhase';
