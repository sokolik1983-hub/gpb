import type { FC } from 'react';
import React, { useState } from 'react';
import { FocusLock } from 'components/common/focus-lock';
import type { IExtendedActionWebInfo } from 'interfaces';
import type { IGetTransactionCardResponseDto } from 'interfaces/dto';
import { locale } from 'localization';
import type { TransfomedAction } from '@platform/core';
import { DATE_FORMAT } from '@platform/services';
import { formatDateTime } from '@platform/tools/date-time';
import type { IButtonAction } from '@platform/ui';
import { Box, DATA_TYPE, DialogTemplate, Gap, Tabs, Typography, LayoutScroll } from '@platform/ui';
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
  /** Действия кнопок. */
  actions: Array<TransfomedAction<IExtendedActionWebInfo>>;
  /** Действия кнопок в DropDown. */
  dropdownActions: IButtonAction[];
  /** Обработчик закрытия диалога. */
  onClose(): void;
}

/**
 * Диалог "Карточка проводки".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=32245869
 */
export const TransactionCard: FC<ITransactionCardProps> = ({ transaction: doc, statementId, actions, dropdownActions, onClose }) => {
  const [tab, setTab] = useState<TABS>(TABS.REQUISITES);

  const { debit, documentNumber, documentName, documentDate } = doc;

  return (
    <FocusLock>
      <Box style={{ outline: 'none' }} tabIndex={0}>
        <DialogTemplate
          extraSmall
          content={
            <Box className={css.transactionCard}>
              <LayoutScroll>
                <Box className={css.transactionCardInsideScroll}>
                  <Box>
                    <Typography.H3>{debit ? locale.transactionCard.header.debit : locale.transactionCard.header.credit}</Typography.H3>
                    <Gap.LG />
                    <Typography.P>
                      {locale.transactionCard.subHeader({
                        documentName,
                        number: documentNumber,
                        date: formatDateTime(documentDate, { keepLocalTime: true, format: DATE_FORMAT }),
                      })}
                    </Typography.P>
                    <Tabs className={css.tabs} options={TAB_OPTIONS} value={tab} onChange={setTab} />
                    {tab === TABS.REQUISITES ? (
                      <RequisitesTab transaction={doc} />
                    ) : (
                      <AttachmentsTab statementId={statementId} transaction={doc} />
                    )}
                  </Box>
                  <Footer actions={actions} dropdownActions={dropdownActions} />
                </Box>
              </LayoutScroll>
            </Box>
          }
          dataType={DATA_TYPE.CONFIRMATION}
          header={''}
          onClose={onClose}
        />
      </Box>
    </FocusLock>
  );
};

TransactionCard.displayName = 'TransactionCard';
