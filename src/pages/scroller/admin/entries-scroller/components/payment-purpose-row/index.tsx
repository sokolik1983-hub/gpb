import React from 'react';
import { HightlightText, LinesEllipsis } from 'components/common';
import type { BankAccountingEntryTurnoverCard } from 'interfaces/admin/dto/bank-accounting-entry-turnover-card';
import { useQueryString } from 'pages/scroller/admin/entries-scroller/hooks';
import { Box, Typography, WithInfoTooltip, CONTAINER_POSITION } from '@platform/ui';
import css from './styles.scss';

/** Компонент для отображения строки с назначением платежа. */
export const PaymentPurposeRow: React.FC<{ row: BankAccountingEntryTurnoverCard }> = ({ row }) => {
  const { paymentPurpose } = row;
  const queryString = useQueryString();

  return (
    <Box className={css.row}>
      <WithInfoTooltip
        extraSmall
        positioningOrder={[
          CONTAINER_POSITION.BOTTOM_CENTER,
          CONTAINER_POSITION.LEFT_CENTER,
          CONTAINER_POSITION.RIGHT_CENTER,
          CONTAINER_POSITION.TOP_CENTER,
        ]}
        text={paymentPurpose}
      >
        {ref => (
          <Typography.P className={css['row--text']} innerRef={ref}>
            <LinesEllipsis maxLines={1}>
              {(elementRef, clamped) => (
                <div ref={elementRef} style={{ textOverflow: clamped ? undefined : 'ellipsis', overflow: 'hidden' }}>
                  <HightlightText searchWords={queryString} textToHightlight={paymentPurpose} />
                </div>
              )}
            </LinesEllipsis>
          </Typography.P>
        )}
      </WithInfoTooltip>
    </Box>
  );
};

PaymentPurposeRow.displayName = 'PaymentPurposeRow';
