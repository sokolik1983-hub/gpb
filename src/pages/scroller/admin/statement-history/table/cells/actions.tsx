import type { FC } from 'react';
import React, { useMemo } from 'react';
import { executor } from 'actions/admin';
import { StopPropagation } from 'components/common';
import { FORMAT } from 'interfaces';
import { DATA_ACTION } from 'interfaces/data-action';
import { getActiveActionButtons } from 'utils/common';
import { useAuth } from '@platform/services';
import type { IActionWithAuth } from '@platform/services/common/dist-types/interfaces';
import { Gap, Horizon, RegularButton, ServiceIcons, WithDropDown } from '@platform/ui';
import { ACTION_NAME, ROW_ACTIONS } from '../../action-configs';
import css from './styles.scss';
import type { StatementHistoryCellProps } from './types';

/** Доступные форматы выписки для экспорта. */
const availableStatementFormats = [FORMAT.C1, FORMAT.TXT, FORMAT.EXCEL, FORMAT.PDF];

/**
 * Метод получения экшенов.
 *
 * @param statementFormat - Формат выписки.
 */
const getActions = (statementFormat: FORMAT): IActionWithAuth[] =>
  ROW_ACTIONS.filter(({ name }) => !(name === ACTION_NAME.EXPORT_STATEMENT && !availableStatementFormats.includes(statementFormat)));

/** Ячейка таблицы с экшенами выписки. */
export const Actions: FC<StatementHistoryCellProps> = ({ value }) => {
  const { getAvailableActions } = useAuth();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(getActions(value.format)), executor, [value]), [
    getAvailableActions,
    value,
  ]);

  if (actions.length === 0) {
    return null;
  }

  const visibleActions = actions.slice(0, 1);
  const dropDownActions = actions.slice(1);

  return (
    <StopPropagation>
      <Horizon allHeight={false}>
        {visibleActions.map(({ icon, name, onClick }) => (
          <RegularButton key={name} extraSmall className={css.action} data-action={name} dimension={'MC'} icon={icon} onClick={onClick} />
        ))}

        {dropDownActions.length > 0 && (
          <>
            <Gap.XS />
            <WithDropDown extraSmall actions={dropDownActions} offset={6} radius="XS" shadow="LG">
              {(ref, _, toggleOpen) => (
                <RegularButton
                  ref={ref}
                  extraSmall
                  className={css.action}
                  data-action={DATA_ACTION.MORE}
                  dimension={'MC'}
                  icon={ServiceIcons.ActionMenuHorizontal}
                  onClick={toggleOpen}
                />
              )}
            </WithDropDown>
          </>
        )}
      </Horizon>
    </StopPropagation>
  );
};

Actions.displayName = 'Actions';
