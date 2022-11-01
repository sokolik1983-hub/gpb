import type { FC } from 'react';
import React from 'react';
import { LinesEllipsis } from 'components/common';
import { locale } from 'localization';
import { Typography, WithInfoTooltip } from '@platform/ui';

/** Свойства фазы закрытия. */
interface PhaseProps {
  /** Дата записи о закрытии фазы. */
  date: string;
  /** Идентификатор сообщения от Ф1 о закрытии фазы. */
  messageId: string;
  /** Время записи о закрытии фазы. */
  time: string;
}

/** Ячейка таблицы с фазой закрытия. */
export const Phase: FC<PhaseProps> = ({ date, messageId, time }) => (
  <>
    <Typography.P>{locale.admin.closedDaysScroller.table.cell.phase.dateTime({ date, time })}</Typography.P>
    <WithInfoTooltip extraSmall text={messageId}>
      {ref => (
        <Typography.Text fill={'FAINT'} innerRef={ref}>
          <LinesEllipsis maxLines={1}>
            {(elementRef, clamped) => (
              <div ref={elementRef} style={{ textOverflow: clamped ? undefined : 'ellipsis', overflow: 'hidden' }}>
                {messageId}
              </div>
            )}
          </LinesEllipsis>
        </Typography.Text>
      )}
    </WithInfoTooltip>
  </>
);

Phase.displayName = 'Phase';
