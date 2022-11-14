import type { FC } from 'react';
import React from 'react';
import type { StatementHistoryCellProps } from 'pages/scroller/admin/statements/components/table/cells/types';
import { STATEMENT_REQUEST_STATUS_COLOR, STATEMENT_REQUEST_STATUS_LABEL } from 'stream-constants/admin';
import { Horizon, Typography } from '@platform/ui';
import { Status as StatusMarker } from '@platform/ui/dist-types/status/status';

/** Ячейка таблицы со статусом запроса выписки. */
export const RequestStatus: FC<StatementHistoryCellProps> = ({ value: { requestStatus } }) => (
  <Horizon align="CENTER">
    <StatusMarker type={STATEMENT_REQUEST_STATUS_COLOR[requestStatus]} />
    <Typography.P data-field={'requestStatus'} line="BREAK">
      {STATEMENT_REQUEST_STATUS_LABEL[requestStatus]}
    </Typography.P>
  </Horizon>
);

RequestStatus.displayName = 'RequestStatus';
