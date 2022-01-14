import { createContext } from 'react';
import { FORMAT } from 'interfaces/client/classificators/format';
import { CREATION_PARAMS } from 'pages/form/client/interfaces/creation-params';
import { DOCUMENTS_SET_PARAMS } from 'pages/form/client/interfaces/documents-set-params';
import { defaultFormState } from 'pages/form/client/interfaces/form-state';

/** Контекст формы. По-сути "шара" с часто используемыми вычисляемыми данными. */
export interface IFormContext {
  /** Отмечен чек-бокс "Только документы выписки". */
  onlyRequestsStatement: boolean;
  /** Отмечен чек-бокс "С электронной подписью банка в формате PDF". */
  withSign: boolean;
  /** Отмечен чек-бокс "PDF". */
  isPdf: boolean;
}

/** Начальное значение контекста формы. */
export const defaultFormContextValue: IFormContext = {
  onlyRequestsStatement: defaultFormState.documentsSetParams.includes(DOCUMENTS_SET_PARAMS.ONLY_REQUEST_STATEMENT_DOCUMENTS),
  withSign: defaultFormState.creationParams.includes(CREATION_PARAMS.WITH_SIGN),
  isPdf: defaultFormState.format === FORMAT.PDF,
};

/** Экземпляр контекста формы. */
export const FormContext = createContext<IFormContext>(defaultFormContextValue);
