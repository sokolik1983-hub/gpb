import type { IUserDeviceInfo } from 'interfaces';
import type { TRANSACTION_ATTACHMENT_TYPES } from 'interfaces/client/classificators';

/** ДТО запроса информации по проводке. */
export interface IGetTransactionCardRequestDto {
  /** Идентификатор Проводки. */
  accountingEntryId: string;
  /** Данные устройства пользователя. */
  userDeviceInfo: IUserDeviceInfo;
}

/** Документ вложения. */
export interface IAppendixDocument {
  /** Наименование документа. */
  documentName: string;
  /** Тип документа. */
  documentTypeDto: TRANSACTION_ATTACHMENT_TYPES;
}

/** Приложение к карточке проводки. */
export interface IAppendixDto {
  /** Документы выписки и основания. */
  documents?: IAppendixDocument[];
}

/** Агент (плательщик/получатель) операции списание и поступление. */
export interface IAgent {
  /** Расчётный счёт агента. */
  account: string;
  /** БИК банка получателя. */
  bankBic: string;
  /** Наименование банка получателя. */
  bankName: string;
  /** Корреспондентский счёт банка получателя. */
  corrAccount: string;
  /** ИНН получателя. */
  inn: string;
  /** Наименование получателя. */
  name: string;
}

/** Ответ на запрос проводки. */
export interface IGetTransactionCardResponseDto {
  /** Идентификатор проводки. */
  id: string;
  /** Признак дебетования. */
  debit: boolean;
  /** Наименование типа документа. */
  documentName: string;
  /** Номер документа. */
  documentNumber: string;
  /** Дата операции. */
  entryDate: string;
  /** Дата документа. */
  documentDate: string;
  /** Сумма. */
  amount: number;
  /** Код валюты. */
  currencyCode: string;
  /** Плательщик. */
  payerDto: IAgent;
  /** Плательщик. */
  payeeDto: IAgent;
  /** Назначение платежа. */
  paymentPurpose: string;
  /** Приложение к карточке проводки. */
  appendixDto?: IAppendixDto;
}
