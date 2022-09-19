/** Свойства рпосмотра запроса выписки. */
export interface StatementRequest {
  /** Идентификатор запроса выписки. */
  id: string;
  /** URL страница, с которой перешли на текущую (referer). */
  refererPage: string;
}
