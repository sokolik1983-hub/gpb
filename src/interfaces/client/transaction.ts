import type { TRANSACTION_ATTACHMENT_TYPES } from 'interfaces/client/classificators';

/** Проводка. */
export interface ITransaction {
  // TODO: Уточнить ДТО после готовности рестов
  /** Идентификатор проводки. */
  id: string;
  /** Признак дебетования. */
  isDebit: boolean;
  /** Наименование типа документа. */
  documentName: string;
  /** Номер документа. */
  number: string;
  /** Дата документа. */
  date: string;
  /** Сумма. */
  amount: number;
  /** Код валюты. */
  currencyCode: string;
  /** Наименование плательщика. */
  payerOrgName: string;
  /** ИНН плательщика. */
  payerInn: string;
  /** Номер счета плательщика. */
  payerAccountNumber: string;
  /** Наименование банка плательщика. */
  payerBankName: string;
  /** БИК банка плательщика. */
  payerBankBic: string;
  /** Номер счета банка плательщика (корреспондентский счёт Банка плательщика). */
  payerBankCorrAccount: string;
  /** Наименование получателя. */
  receiverOrgName: string;
  /** ИНН получателя. */
  receiverInn: string;
  /** Номер счета получателя. */
  receiverAccountNumber: string;
  /** Наименование банка получателя. */
  receiverBankName: string;
  /** БИК банка получателя. */
  receiverBankBic: string;
  /** Номер счета банка получателя (корреспондентский счёт Банка получателя). */
  receiverBankCorrAccount: string;
  /** Назначение платежа. */
  paymentPurpose: string;
  /** Приложения. */
  attachments?: Array<{
    /** Наименование документа. */
    name: string;
    /** Размер документа. */
    size: string;
    /** Тип документа. */
    documentType: TRANSACTION_ATTACHMENT_TYPES;
  }>;
}
