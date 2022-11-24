import type { FC } from 'react';
import React, { useMemo } from 'react';
import { executor } from 'actions/admin/executor';
import type { IGetTransactionCardResponseDto } from 'interfaces/dto';
import { CARD_FOOTER_ACTIONS, CARD_FOOTER_DROPDOWN_ACTIONS, CARD_ROW_ACTIONS } from 'pages/scroller/admin/entries-scroller/action-configs';
import { getActiveActionButtons } from 'utils/common';
import { useAuth } from '@platform/services/admin';
import { dialog } from '@platform/ui';
import { TransactionCard as TransactionCardContent } from './transaction-card';

/** Свойства компонента TransactionCard. */
export interface ITransactionCardProps {
  /** Проводка. */
  transaction: IGetTransactionCardResponseDto;
  /** Обработчик закрытия диалога. */
  onClose(): void;
}

/**
 * Диалог "Карточка проводки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32245869
 */
export const TransactionCard: FC<ITransactionCardProps> = ({ transaction: doc, onClose }) => {
  const { getAvailableActions } = useAuth();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(CARD_FOOTER_ACTIONS), executor, [[doc]]), [
    getAvailableActions,
    doc,
  ]);

  const otherActions = useMemo(() => {
    const activeActionButtons = getActiveActionButtons(getAvailableActions(CARD_FOOTER_DROPDOWN_ACTIONS), executor, [[doc]]);

    return activeActionButtons.map(({ icon, ...restButtonProps }) => ({ ...restButtonProps }));
  }, [getAvailableActions, doc]);

  return (
    <TransactionCardContent
      actions={actions}
      attachmentActions={CARD_ROW_ACTIONS}
      dropdownActions={otherActions}
      transaction={doc}
      onClose={onClose}
    />
  );
};

TransactionCard.displayName = 'TransactionCard';

/**
 * Показывает диалог "Карточка проводки".
 *
 * @param doc - Проводка.
 */
export const showTransactionCard = (doc: IGetTransactionCardResponseDto) =>
  new Promise((resolve, reject) =>
    dialog.show(
      'transactionCard',
      TransactionCard,
      {
        transaction: doc,
      },
      () => reject(true)
    )
  );
