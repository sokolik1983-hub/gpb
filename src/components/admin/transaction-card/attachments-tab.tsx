import type { FC } from 'react';
import React, { useCallback } from 'react';
import { executor } from 'actions/admin/executor';
import type { IExtendedIActionWithAuth } from 'interfaces';
import type { IGetTransactionCardResponseDto } from 'interfaces/dto';
import { getActiveActionButtons } from 'utils/common';
import { useAuth } from '@platform/services/client';
import { Typography, Gap, Line, Adjust, Horizon } from '@platform/ui';

/** Свойства компонента AttachmentsTab. */
export interface IAttachmentsTabProps {
  /** Возможные действия над приложенными файлами. */
  attachmentActions: IExtendedIActionWithAuth[];
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
export const AttachmentsTab: FC<IAttachmentsTabProps> = ({ transaction: doc, statementId, attachmentActions }) => {
  const { appendixDto: { documents: docs = [] } = {} } = doc;

  const { getAvailableActions } = useAuth();

  const getActions = useCallback(
    documentType => getActiveActionButtons(getAvailableActions(attachmentActions), executor, [[doc], statementId, documentType]),
    [doc, getAvailableActions, statementId, attachmentActions]
  );

  return (
    <>
      {docs.map(({ documentName, documentTypeDto }) => (
        <React.Fragment key={documentName}>
          <Gap.SM />
          <Horizon className={Adjust.getPadClass([null, 'XS'])}>
            <Typography.Text>{documentName}</Typography.Text>
            <Horizon.Spacer />
            {getActions(documentTypeDto).map(({ icon: Icon, onClick, name }) => (
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
