/** ДТО ответа получения контрагентов. */
export interface IGetCounterpartiesResponseDto {
  // TODO: Уточнить при подключении реста.
  /** Идентификатор получателя. */
  id: string;
  /** Имя получателя. */
  name: string;
  /** ИНН получателя. */
  inn: string;
}
