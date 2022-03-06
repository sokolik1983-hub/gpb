import type { FC } from 'react';
import React, { useMemo } from 'react';
import { executor } from 'actions/client/executor';
import type { IGetTransactionCardResponseDto } from 'interfaces/client';
import { CARD_ROW_ACTIONS } from 'pages/scroller/client/statement-transaction/action-configs';
import { getActiveActionButtons } from 'utils';
import { useAuth } from '@platform/services/client';
import { Typography, Gap, Line, Adjust, Horizon } from '@platform/ui';

/** Свойства компонента AttachmentsTab. */
export interface IAttachmentsTabProps {
  /** Проводка. */
  transaction: IGetTransactionCardResponseDto;
  /** Id запроса на выписку. */
  statementId: string;
}

/**
 * Вкладка "Вложения" диалога "Карточка проводки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32245869
 */
export const AttachmentsTab: FC<IAttachmentsTabProps> = ({ transaction, statementId }) => {
  const { appendixDto: { documents: docs = [] } = {} } = transaction;

  const { getAvailableActions } = useAuth();

  const actions = useMemo(() => getActiveActionButtons(getAvailableActions(CARD_ROW_ACTIONS), executor, [docs, statementId]), [
    docs,
    getAvailableActions,
    statementId,
  ]);

  return (
    <>
      {docs.map(({ documentName }) => (
        <React.Fragment key={documentName}>
          <Gap.SM />
          <Horizon className={Adjust.getPadClass([null, 'XS'])}>
            <Typography.Text>{documentName}</Typography.Text>
            <Horizon.Spacer />
            {actions.map(({ icon: Icon, onClick, name }) => (
              <>
                <Gap />
                <Icon clickable data-action={name} data-name={name} fill={'FAINT'} scale={'MD'} onClick={onClick} />
              </>
            ))}
          </Horizon>
          <Gap.SM />
          <Line fill="FAINT" />
        </React.Fragment>
      ))}
    </>
  );
};

AttachmentsTab.displayName = 'AttachmentsTab';
