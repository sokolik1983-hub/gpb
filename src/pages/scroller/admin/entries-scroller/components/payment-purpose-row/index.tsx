import React from 'react';
import { LinesEllipsis } from 'components/common';
import type { BankAccountingEntryTurnoverCard } from 'interfaces/admin/dto/bank-accounting-entry-turnover-card';
import { Box, Typography, WithInfoTooltip, CONTAINER_POSITION } from '@platform/ui';
import css from './styles.scss';

/** Комипонент для отображении строки с назначением платежа. */
export const PaymentPurposeRow: React.FC<{ row: BankAccountingEntryTurnoverCard }> = ({ row }) => {
  const { paymentPurpose } = row;

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
                  {paymentPurpose}
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
