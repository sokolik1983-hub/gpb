import type { FC } from 'react';
import React, { useMemo } from 'react';
import { executor } from 'actions/admin';
import { TransactionCard as TransactionCardContent } from 'components/common/transaction-card';
import type { IGetTransactionCardResponseDto } from 'interfaces/dto';
import { CARD_FOOTER_ACTIONS, CARD_FOOTER_DROPDOWN_ACTIONS } from 'pages/scroller/admin/statement-transaction/action-configs';
import { getActiveActionButtons } from 'utils/common';
import { useAuth } from '@platform/services/admin';
import { dialog } from '@platform/ui';

/** Свойства компонента TransactionCard. */
export interface ITransactionCardProps {
  /** Проводка. */
  transaction: IGetTransactionCardResponseDto;
  /** Id запроса на выписку. */
  statementId: string;
  /** Обработчик закрытия диалога. */
  onClose(): void;
}

/**
 * Диалог "Карточка проводки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32245869
 */
export const TransactionCard: FC<ITransactionCardProps> = ({ transaction: doc, statementId, onClose }) => {
  const { getAvailableActions } = useAuth();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(CARD_FOOTER_ACTIONS), executor, [[doc], statementId]), [
    getAvailableActions,
    doc,
    statementId,
  ]);

  const otherActions = useMemo(() => {
    const activeActionButtons = getActiveActionButtons(getAvailableActions(CARD_FOOTER_DROPDOWN_ACTIONS), executor, [[doc], statementId]);

    return activeActionButtons.map(({ icon, ...restButtonProps }) => ({ ...restButtonProps }));
  }, [getAvailableActions, doc, statementId]);

  return (
    <TransactionCardContent
      actions={actions}
      attachmentActions={[]}
      dropdownActions={otherActions}
      statementId={statementId}
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
 * @param statementId Id запроса на выписку.
 */
export const showTransactionCard = (doc: IGetTransactionCardResponseDto, statementId: string) =>
  new Promise((resolve, reject) =>
    dialog.show(
      'transactionCard',
      TransactionCard,
      {
        transaction: doc,
        statementId,
      },
      () => reject(true)
    )
  );
