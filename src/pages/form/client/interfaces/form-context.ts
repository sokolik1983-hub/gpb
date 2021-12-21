import { createContext } from 'react';

/** Контекст формы. По-сути "шара" с часто используемыми вычисляемыми данными. */
export interface IFormContext {
  /** Отмечен чек-бокс "Только документы выписки". */
  onlyRequestsStatement: boolean;
  /** Отмечен чек-бокс "С электронной подписью банка в формате PDF". */
  withSign: boolean;
}

/** Начальное значение контекста формы. */
export const defaultFormContextValue: IFormContext = {
  onlyRequestsStatement: false,
  withSign: false,
};

/** Экземпляр контекста формы. */
export const FormContext = createContext<IFormContext>(defaultFormContextValue);
