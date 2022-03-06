import type { FC } from 'react';
import React, { useState } from 'react';
import type { IGetTransactionCardResponseDto } from 'interfaces/client';
import { locale } from 'localization';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { dialog, DialogTemplate, Box, Gap, Typography, Tabs, LayoutScroll, DATA_TYPE } from '@platform/ui';
import { AttachmentsTab } from './attachments-tab';
import { TAB_OPTIONS, TABS } from './constants';
import { Footer } from './footer';
import { RequisitesTab } from './requisites-tab';
import css from './styles.scss';

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
  const [tab, setTab] = useState<TABS>(TABS.REQUISITES);

  const { debit, documentNumber, documentName, documentDate } = doc;

  const header = debit ? locale.transactionCard.header.debit : locale.transactionCard.header.credit;

  return (
    <DialogTemplate
      extraSmall
      content={
        <Box className={css.wrapper}>
          <Typography.H3>{header}</Typography.H3>
          <Gap.LG />
          <Typography.P>
            {locale.transactionCard.subHeader({
              documentName,
              number: documentNumber,
              date: formatDateTime(documentDate, { keepLocalTime: true, format: DATE_FORMAT }),
            })}
          </Typography.P>
          <Tabs className={css.tabs} options={TAB_OPTIONS} value={tab} onChange={setTab} />
          <Box className={css.contentWrapper}>
            <LayoutScroll>
              {tab === TABS.REQUISITES ? (
                <RequisitesTab transaction={doc} />
              ) : (
                <AttachmentsTab statementId={statementId} transaction={doc} />
              )}
            </LayoutScroll>
          </Box>
          <Footer statementId={statementId} transaction={doc} />
        </Box>
      }
      dataType={DATA_TYPE.CONFIRMATION}
      header={''}
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
