import type { FC } from 'react';
import React from 'react';
import type { IGetTransactionCardResponseDto } from 'interfaces/client';
import { Typography, Gap, Line, Adjust, Horizon, Icons } from '@platform/ui';

/** Свойства компонента AttachmentsTab. */
export interface IAttachmentsTabProps {
  /** Проводка. */
  transaction: IGetTransactionCardResponseDto;
}

/**
 * Вкладка "Вложения" диалога "Карточка проводки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32245869
 */
export const AttachmentsTab: FC<IAttachmentsTabProps> = ({ transaction }) => {
  const { appendixDto: { documents = [] } = {} } = transaction;

  return (
    <>
      {documents.map(({ documentName }) => (
        <React.Fragment key={documentName}>
          <Gap.SM />
          <Horizon className={Adjust.getPadClass([null, 'XS'])}>
            <Typography.Text>{documentName}</Typography.Text>
            <Horizon.Spacer />
            <Icons.Download clickable fill={'FAINT'} scale={'MD'} />
            <Gap />
            <Icons.PrintFile clickable fill={'FAINT'} scale={'MD'} />
          </Horizon>
          <Gap.SM />
          <Line fill="FAINT" />
        </React.Fragment>
      ))}
    </>
  );
};

AttachmentsTab.displayName = 'AttachmentsTab';
