import type { FC } from 'react';
import React, { useState } from 'react';
import type { ITransaction } from 'interfaces/client';
import { locale } from 'localization';
import { AttachmentsTab } from 'pages/scroller/client/statement-transaction/transaction-cardr/attachments-tab';
import { RequisitesTab } from 'pages/scroller/client/statement-transaction/transaction-cardr/requisites-tab';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import { dialog, DialogTemplate, Box, Gap, Typography, Tabs, LayoutScroll } from '@platform/ui';
import { TAB_OPTIONS, TABS } from './constants';
import { Footer } from './footer';
import css from './styles.scss';

/** Свойства компонента TransactionCard. */
export interface ITransactionCardProps {
  /** Проводка. */
  transaction: ITransaction;
  /** Обработчик закрытия диалога. */
  onClose(): void;
}

/**
 * Диалог "Карточка проводки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32245869
 */
export const TransactionCard: FC<ITransactionCardProps> = ({ transaction, onClose }) => {
  const [tab, setTab] = useState<TABS>(TABS.REQUISITES);

  const { isDebit, number, documentName, date } = transaction;

  const header = isDebit ? locale.transactionCard.header.debit : locale.transactionCard.header.credit;

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
              number,
              date: formatDateTime(date, { keepLocalTime: true, format: DATE_FORMAT }),
            })}
          </Typography.P>
          <Tabs className={css.tabs} options={TAB_OPTIONS} value={tab} onChange={setTab} />
          <Box className={css.contentWrapper}>
            <LayoutScroll>
              {tab === TABS.REQUISITES ? <RequisitesTab transaction={transaction} /> : <AttachmentsTab transaction={transaction} />}
            </LayoutScroll>
          </Box>
          <Footer transaction={transaction} />
        </Box>
      }
      header={''}
      onClose={onClose}
    />
  );
};

TransactionCard.displayName = 'TransactionCard';

/**
 * Показывает диалог "Карточка проводки".
 *
 * @param transaction - Проводка.
 */
export const showTransactionCard = (transaction: ITransaction) =>
  new Promise((resolve, reject) =>
    dialog.show(
      'transactionCard',
      TransactionCard,
      {
        transaction,
      },
      () => reject(true)
    )
  );
