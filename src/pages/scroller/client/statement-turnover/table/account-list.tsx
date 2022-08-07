import React, { useState, useCallback, useContext } from 'react';
import cn from 'classnames';
import type { IFocusParentNodeProps } from 'components/focus-tree';
import { FocusNode } from 'components/focus-tree';
import type { IAccountTurnoversInfo, IGroupedAccounts } from 'interfaces/dto';
import { GROUPING_VALUES } from 'interfaces/dto';
import type { Row } from 'react-table';
import { TURNOVERS_SCROLLER_ROW_NODE } from 'stream-constants/a11y-nodes';
import { Box } from '@platform/ui';
import type { ITurnoverScrollerContext } from '../turnover-scroller-context';
import { TurnoverScrollerContext } from '../turnover-scroller-context';
import { AccountInfoRow } from './account-row';
import css from './styles.scss';
import { ToggleRowsVisibilityButton } from './toggle-rows-visibility-button';

/**
 * Свойства компонента "Список счетов".
 */
interface IAccountList extends IFocusParentNodeProps {
  /**
   * Строки счетов.
   */
  rows: Array<Row<IGroupedAccounts>>;
  /**
   * Функция подготовки строк из react-table.
   */
  prepareRow(row: Row<IGroupedAccounts>): void;
  /**
   * Флаг, определяющий отображение кнопки раскрытия/скрытия счетов.
   */
  withoutBtn?: boolean;
}

/**
 * Компонент "Список счетов".
 */
export const AccountList = ({ rows, prepareRow, withoutBtn = false, nodesIds: [nodeId, parentId], hidden }: IAccountList) => {
  const [maxVisibleSize, setMaxVisibleSize] = useState(withoutBtn ? rows.length : 3);
  const { groupByForRender } = useContext<ITurnoverScrollerContext>(TurnoverScrollerContext);

  const handleBtnClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      setMaxVisibleSize(size => (size === 3 ? rows.length : 3));
    },
    [rows.length]
  );

  const hasThirdLevelMargin = groupByForRender === GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES;
  const hasSecondLevelMargin = ![GROUPING_VALUES.NO_GROUPING, GROUPING_VALUES.ORGANIZATIONS_AND_CURRENCIES].includes(groupByForRender);

  const list = rows.slice(0, maxVisibleSize).map(accountRow => {
    prepareRow(accountRow);

    const { key } = accountRow.getRowProps();

    return (
      <AccountInfoRow
        key={key}
        accountInfoRow={(accountRow as unknown) as Row<IAccountTurnoversInfo>}
        nodesIds={[`${TURNOVERS_SCROLLER_ROW_NODE}-${key}`, nodeId]}
      />
    );
  });

  return (
    <FocusNode preferBorder hidden={hidden} nodeId={nodeId} parentId={parentId}>
      {list}
      {!withoutBtn && rows.length > 3 && (
        <Box className={cn({ [css.secondLevelCell]: hasSecondLevelMargin, [css.thirdLevelCell]: hasThirdLevelMargin })}>
          <ToggleRowsVisibilityButton maxVisibleSize={maxVisibleSize} totalSize={rows.length} onClick={handleBtnClick} />
        </Box>
      )}
    </FocusNode>
  );
};
