import React, { useContext } from 'react';
import { HightlightText } from 'components';
import type { IStatementTransactionRow } from 'interfaces/client';
import { LinesEllipsis } from 'pages/scroller/client/statement-transaction/table/lines-ellipsis';
import { TransactionScrollerContext } from 'pages/scroller/client/statement-transaction/transaction-scroller-context';
import { Box, Typography, WithInfoTooltip, CONTAINER_POSITION } from '@platform/ui';
import css from './styles.scss';

/** Свойства компонента подписи к строке. */
interface CaptionRowProps {
  /** Данные строки таблицы. */
  row: IStatementTransactionRow;
}

/** Компонент подписи к строке. */
export const CaptionRow: React.FC<CaptionRowProps> = ({ row: { purpose } }) => {
  const { filterPanel } = useContext(TransactionScrollerContext);
  const { queryString } = filterPanel.values;

  return (
    <Box className={css.captionRow}>
      <WithInfoTooltip
        extraSmall
        positioningOrder={[
          CONTAINER_POSITION.BOTTOM_CENTER,
          CONTAINER_POSITION.LEFT_CENTER,
          CONTAINER_POSITION.RIGHT_CENTER,
          CONTAINER_POSITION.TOP_CENTER,
        ]}
        text={purpose}
      >
        {ref => (
          <Typography.P className={css.captionRowText} innerRef={ref}>
            <LinesEllipsis maxLines={1}>
              {(elementRef, clamped) => (
                <div ref={elementRef} style={{ textOverflow: clamped ? undefined : 'ellipsis', overflow: 'hidden' }}>
                  <HightlightText searchWords={queryString} textToHightlight={purpose} />
                </div>
              )}
            </LinesEllipsis>
          </Typography.P>
        )}
      </WithInfoTooltip>
    </Box>
  );
};

CaptionRow.displayName = 'CaptionRow';
