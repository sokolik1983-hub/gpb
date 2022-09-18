import type { IFormState } from 'stream-constants/form';

/** Свойства запроса выписки с других сервисов. */
export interface ExternalStatementRequest {
  /** Предзаполненные поля формы запроса выписки. */
  formValues: IFormState;
  /** URL страница, с которой перешли на текущую (referer). */
  refererPage: string;
}
