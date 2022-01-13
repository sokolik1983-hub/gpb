import type { FC } from 'react';
import React, { useCallback } from 'react';
import type { ITransaction } from 'interfaces/client';
import { Pattern, Typography, Gap, Line, Box, Adjust, Horizon, Icons } from '@platform/ui';

/** Свойства компонента AttachmentsTab. */
export interface IAttachmentsTabProps {
  /** Проводка. */
  transaction: ITransaction;
}

/**
 * Вкладка "Вложения" диалога "Карточка проводки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32245869
 */
export const AttachmentsTab: FC<IAttachmentsTabProps> = ({ transaction }) => {
  const { attachments = [] } = transaction;

  const handleDownload = useCallback(() => {}, []);

  const handlePrint = useCallback(() => {}, []);

  return (
    <>
      {attachments.map(({ name, size }) => (
        <>
          <Gap.SM />
          <Box key={name} className={Adjust.getPadClass([null, 'XS'])}>
            <Pattern>
              <Pattern.Span size={8}>
                <Typography.Text>{name}</Typography.Text>
              </Pattern.Span>
              <Pattern.Span size={2}>
                <Typography.Text>{size}</Typography.Text>
              </Pattern.Span>
              <Pattern.Span size={2}>
                <Horizon>
                  <Horizon.Spacer />
                  <Icons.Download clickable fill={'FAINT'} scale={'MD'} onClick={handleDownload} />
                  <Gap />
                  <Icons.PrintFile clickable fill={'FAINT'} scale={'MD'} onClick={handlePrint} />
                </Horizon>
              </Pattern.Span>
            </Pattern>
          </Box>
          <Gap.SM />
          <Line fill="FAINT" />
        </>
      ))}
    </>
  );
};

AttachmentsTab.displayName = 'AttachmentsTab';
