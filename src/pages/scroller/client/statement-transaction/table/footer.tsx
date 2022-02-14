import type { FC } from 'react';
import React, { useContext, useMemo } from 'react';
import { executor } from 'actions/client';
import cn from 'classnames';
import { locale } from 'localization';
import { getActiveActionButtons } from 'utils';
import { useAuth } from '@platform/services/client';
import { bigNumber } from '@platform/tools/big-number';
import { Typography, WithDropDown, Box, Horizon, Gap, RegularButton, PrimaryButton, ServiceIcons, ACTIONS } from '@platform/ui';
import { FOOTER_DROPDOWN_ACTIONS, FOOTER_ACTIONS } from '../action-configs';
import type { ITransactionScrollerContext } from '../transaction-scroller-context';
import { TransactionScrollerContext } from '../transaction-scroller-context';
import css from './styles.scss';

/** Суммарная информация о выбранных строках таблицы. */
export const Footer: FC = () => {
  const { selectedRows, statementSummaryInfo: { currencyCode = '' } = {} } = useContext<ITransactionScrollerContext>(
    TransactionScrollerContext
  );

  const totalIncome = useMemo(() => selectedRows.reduce((acc, item) => acc.plus(item.income ?? 0), bigNumber(0)).toString(), [
    selectedRows,
  ]);

  const totalOutcome = useMemo(() => selectedRows.reduce((acc, item) => acc.plus(item.outcome ?? 0), bigNumber(0)).toString(), [
    selectedRows,
  ]);

  const { getAvailableActions } = useAuth();

  const [action] = useMemo(() => getActiveActionButtons(getAvailableActions(FOOTER_ACTIONS), executor, []), [getAvailableActions]);

  const dropDownActions = useMemo(() => getActiveActionButtons(getAvailableActions(FOOTER_DROPDOWN_ACTIONS), executor, []), [
    getAvailableActions,
  ]);

  return (
    <Box className={cn(css.footer)} fill={'BASE'}>
      <Horizon>
        {/* Выбрано */}
        <Typography.P>{locale.transactionsScroller.footer.selected}</Typography.P>
        <Gap.XS />
        <Typography.PBold>{selectedRows.length}</Typography.PBold>
        <Gap.XL />
        {/* Списания */}
        <Typography.P>{locale.transactionsScroller.footer.outcome}</Typography.P>
        <Gap.XS />
        <Typography.PBold>{locale.moneyString.unsigned({ amount: totalOutcome, currencyCode })}</Typography.PBold>
        <Gap.XL />
        {/* Поступления */}
        <Typography.P>{locale.transactionsScroller.footer.income}</Typography.P>
        <Gap.XS />
        <Typography.PBold>{locale.moneyString.unsigned({ amount: totalIncome, currencyCode })}</Typography.PBold>
        <Horizon.Spacer />
        {action && (
          <PrimaryButton extraSmall data-action={action.name} data-name={action.name} dimension="SM" onClick={action.onClick}>
            {action.label}
          </PrimaryButton>
        )}
        {dropDownActions.length > 0 && (
          <>
            <Gap />
            <WithDropDown extraSmall actions={dropDownActions} className={css.footerDropdownActions} offset={10} radius="XS" shadow="LG">
              {(ref, _, toggleOpen) => (
                <RegularButton
                  ref={ref}
                  extraSmall
                  data-action={ACTIONS.MORE}
                  dimension="SM"
                  icon={ServiceIcons.ActionMenuHorizontal}
                  onClick={toggleOpen}
                >
                  {locale.transactionsScroller.footerAction.more}
                </RegularButton>
              )}
            </WithDropDown>
          </>
        )}
      </Horizon>
    </Box>
  );
};

Footer.displayName = 'Footer';
