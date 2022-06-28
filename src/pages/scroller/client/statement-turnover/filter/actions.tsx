import React, { useMemo } from 'react';
import { executor } from 'actions/client';
import { ACTION, CREATION_TYPE, OPERATIONS, TYPE } from 'interfaces/client';
import type { ICreateRequestStatementDto } from 'interfaces/dto';
import { EXPORT_ACTION, PRINT_ACTION } from 'pages/scroller/client/statement-turnover/action-configs';
import type { IFormState } from 'pages/scroller/client/statement-turnover/filter/interfaces';
import { useFormState } from 'react-final-form';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { getActiveActionButtons } from 'utils';
import { useAuth } from '@platform/services/client';
import { Box, Gap, Horizon, Link } from '@platform/ui';
import css from './styles.scss';

/** Компонент действий в ОСВ. */
export const Actions = () => {
  const { values } = useFormState<IFormState>();

  const { accounts, dateFrom, dateTo, datePeriod } = values;

  const doc: Partial<ICreateRequestStatementDto> = useMemo(
    () => ({
      accountsIds: accounts,
      creationType: CREATION_TYPE.NEW,
      creationParams: {
        includeCreditOrders: false,
        includeCreditStatements: false,
        includeDebitOrders: false,
        includeDebitStatements: false,
        separateDocumentsFiles: false,
      },
      dateFrom,
      dateTo,
      hideEmptyTurnovers: false,
      operations: OPERATIONS.ALL,
      periodType: datePeriod,
      separateAccountsFiles: false,
      sign: false,
      sourcePage: COMMON_STREAM_URL.STATEMENT_TURNOVER,
      type: TYPE.HIDDEN_PRINT_EXPORT_OSV,
    }),
    [accounts, dateFrom, datePeriod, dateTo]
  );

  const { getAvailableActions } = useAuth();

  const [exportAction] = useMemo(
    () => getActiveActionButtons(getAvailableActions([EXPORT_ACTION]), executor, [[{ ...doc, action: ACTION.DOWNLOAD }]]),
    [getAvailableActions, doc]
  );

  const [printAction] = useMemo(
    () => getActiveActionButtons(getAvailableActions([PRINT_ACTION]), executor, [[{ ...doc, action: ACTION.PRINT }]]),
    [getAvailableActions, doc]
  );

  return (
    <Horizon>
      {[exportAction, printAction]
        .filter(action => action)
        .map(({ disabled, icon, label, name, onClick }, index, actions) => (
          <React.Fragment key={name}>
            <Box className={css.linkFocusable}>
              <Link
                extraSmall
                disabled={disabled}
                href=""
                icon={icon}
                volume="MD"
                onClick={event => {
                  event.preventDefault();
                  void onClick();
                }}
              >
                {label}
              </Link>
            </Box>
            {index < actions.length - 1 && <Gap.XL />}
          </React.Fragment>
        ))}
    </Horizon>
  );
};

Actions.displayName = 'Actions';
