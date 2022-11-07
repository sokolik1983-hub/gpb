import React, { useMemo } from 'react';
import { executor } from 'actions/admin/executor';
import { StopPropagation } from 'components/common';
import type { IUrlParams } from 'interfaces';
import type { BankAccountingEntryCard } from 'interfaces/admin/dto/bank-accounting-entry-card';
import { DATA_ACTION } from 'interfaces/data-action';
import { useParams } from 'react-router-dom';
import type { CellProps } from 'react-table';
import { getActiveActionButtons } from 'utils/common';
import { useAuth } from '@platform/services/admin';
import { Gap, Horizon, RegularButton, ServiceIcons, WithDropDown } from '@platform/ui';
import { ROW_ACTIONS } from '../action-configs';
import css from './styles.scss';

/** Компонент с ячейкой с действиями для строки скроллера. */
export const ActionsCell: React.FC<CellProps<BankAccountingEntryCard>> = ({ value }) => {
  const { getAvailableActions } = useAuth();
  const { id } = useParams<IUrlParams>();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(ROW_ACTIONS), executor, [[value], id]), [
    getAvailableActions,
    value,
    id,
  ]);

  if (actions.length === 0) {
    return null;
  }

  const visibleActions = actions.slice(0, 2);
  const dropDownActions = actions.slice(2);

  return (
    <StopPropagation>
      <Horizon allHeight={false}>
        {visibleActions.map(({ icon, name, onClick }) => (
          <RegularButton
            key={name}
            extraSmall
            className={css['row__action-button']}
            data-action={name}
            dimension={'MC'}
            icon={icon}
            onClick={onClick}
          />
        ))}

        {dropDownActions.length > 0 && (
          <>
            <Gap.XS />
            <WithDropDown extraSmall actions={dropDownActions} offset={6} radius="XS" shadow="LG">
              {(ref, _, toggleOpen) => (
                <RegularButton
                  ref={ref}
                  extraSmall
                  className={css['row__action-button']}
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

ActionsCell.displayName = 'ActionsCell';
