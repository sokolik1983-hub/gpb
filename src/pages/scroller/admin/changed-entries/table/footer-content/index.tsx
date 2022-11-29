import React, { useMemo } from 'react';
import { executor } from 'actions/admin';
import type { BankAccountingEntryTurnoverCard } from 'interfaces/admin/dto/bank-accounting-entry-turnover-card';
import { getActiveActionButtons } from 'utils/common';
import { useAuth } from '@platform/services/admin';
import { Box, Horizon, FILL, SHADOW, Adjust, SIZE } from '@platform/ui';
import { FOOTER_ACTIONS } from '../../action-configs';
import { Actions } from './actions';
import { Content } from './content';
import css from './styles.scss';

/** Свойства компонета с футером ЭФ Банка "Журнал проводок удаленных/добавленных". */
interface FooterProps {
  /** Набор выбранных проводок. */
  selectedRows: BankAccountingEntryTurnoverCard[];
}

/** Компонент для вывода футера ЭФ Банка "Журнал проводок удаленных/добавленных". */
export const Footer: React.FC<FooterProps> = ({ selectedRows }) => {
  const { getAvailableActions } = useAuth();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(FOOTER_ACTIONS), executor, [selectedRows]), [
    getAvailableActions,
    selectedRows,
  ]);

  return (
    <Box className={css.footer} role="footer">
      <Box className={css.container} fill={FILL.BASE} shadow={SHADOW.MD}>
        <Adjust pad={[null, SIZE.XL]} vert={'CENTER'}>
          <Horizon>
            <Content selectedRows={selectedRows} />
            <Horizon.Spacer />
            <Actions actions={actions} />
          </Horizon>
        </Adjust>
      </Box>
    </Box>
  );
};

Footer.displayName = 'Footer';
