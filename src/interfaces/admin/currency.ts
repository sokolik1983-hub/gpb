/** Курс валюты. */
import type { IBaseEntity } from '@platform/services/admin';

/** Дто ответа сервера курса валют. */
export interface CurrencyRateDto extends IBaseEntity {
  /** Код валюты. */
  letterCode: string;
  /** Дата курса. */
  rateDate: string;
  /** Значение курса. */
  rateValue: number;
  /** Единиц. */
  units: number;
}

/** Свойства строки таблицы курса валют. */
export interface CurrencyRateRow extends Omit<CurrencyRateDto, 'rateValue'> {
  /** Значение курса. */
  rateValue: string;
}

/** Свойства валюты. */
export interface Currency {
  /** Буквенный код валюты. */
  code: string;
  /** Идентификатор записи (ЭКО). */
  id: string;
}
