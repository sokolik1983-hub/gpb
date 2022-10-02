/** Свойства просмотра журнала проводок из запроса. */
export interface RequestTransactions {
  /** Идентификатор запроса выписки. */
  id: string;
  /** URL страница, с которой перешли на текущую (referer). */
  refererPage: string;
}
