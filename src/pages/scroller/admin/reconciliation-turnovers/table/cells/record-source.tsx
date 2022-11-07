import type { FC } from 'react';
import React from 'react';
import { LinesEllipsis } from 'components/common';
import { TURNOVER_RECONCILIATION_RECORD_SOURCE_LABEL } from 'stream-constants/admin';
import { Typography, WithInfoTooltip } from '@platform/ui';
import type { ReconciliationTurnoverCellProps } from './types';

/** Ячейка таблицы с источником записи сверки остатков/оборотов. */
export const RecordSource: FC<ReconciliationTurnoverCellProps> = ({ value: { recordSource } }) => {
  const text = TURNOVER_RECONCILIATION_RECORD_SOURCE_LABEL[recordSource];

  return (
    <WithInfoTooltip extraSmall text={text}>
      {ref => (
        <Typography.P innerRef={ref}>
          <LinesEllipsis maxLines={1}>
            {(elementRef, clamped) => (
              <div ref={elementRef} style={{ textOverflow: clamped ? undefined : 'ellipsis', overflow: 'hidden' }}>
                {text}
              </div>
            )}
          </LinesEllipsis>
        </Typography.P>
      )}
    </WithInfoTooltip>
  );
};

RecordSource.displayName = 'RecordSource';
