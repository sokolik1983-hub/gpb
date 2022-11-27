import type { FC } from 'react';
import React from 'react';
import { LinesEllipsis } from 'components/common';
import type { ClosedDayCellProps } from 'pages/scroller/admin/closed-days/table/cells/types';
import { Typography, WithInfoTooltip } from '@platform/ui';

/** Ячейка таблицы с филиалом. */
export const Branch: FC<ClosedDayCellProps> = ({
  value: {
    branch: { code, name },
  },
}) => (
  <>
    <Typography.P>{code}</Typography.P>
    <WithInfoTooltip extraSmall text={name}>
      {ref => (
        <Typography.SmallText fill={'FAINT'} innerRef={ref}>
          <LinesEllipsis maxLines={1}>
            {(elementRef, clamped) => (
              <div ref={elementRef} style={{ textOverflow: clamped ? undefined : 'ellipsis', overflow: 'hidden' }}>
                {name}
              </div>
            )}
          </LinesEllipsis>
        </Typography.SmallText>
      )}
    </WithInfoTooltip>
  </>
);

Branch.displayName = 'Branch';
