import { createContext } from 'react';
import type { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { FORMAT } from 'interfaces/client/classificators/format';
import { CREATION_PARAMS } from './creation-params';
import { DETAIL_DOCUMENT_PARAMS } from './detail-document-params';
import { defaultFormState } from './form-state';

/** Контекст формы. По-сути "шара" с часто используемыми вычисляемыми данными. */
export interface IFormContext {
  /** Отмечен чек-бокс "Только документы выписки". */
  onlyRequestsStatement: boolean;
  /** Отмечен чек-бокс "С электронной подписью банка в формате PDF". */
  withSign: boolean;
  /** Отмечен чек-бокс "С комплектом документов". */
  withDocumentsSet: boolean;
  /** Отмечен чек-бокс "PDF". */
  isPdf: boolean;
  /** Вариант вызова диалога. */
  useCase?: EXPORT_PARAMS_USE_CASES;
}

/** Начальное значение контекста формы. */
export const defaultFormContextValue: IFormContext = {
  onlyRequestsStatement: defaultFormState.documentsSetParams.includes(DETAIL_DOCUMENT_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS),
  withSign: defaultFormState.creationParams.includes(CREATION_PARAMS.WITH_SIGN),
  withDocumentsSet: defaultFormState.creationParams.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET),
  isPdf: defaultFormState.format === FORMAT.PDF,
};

/** Экземпляр контекста формы. */
export const FormContext = createContext<IFormContext>(defaultFormContextValue);
