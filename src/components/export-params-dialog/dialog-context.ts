import { createContext } from 'react';
import { EXPORT_PARAMS_USE_CASES } from 'interfaces/client';
import { noop } from 'utils';

/** Контекст ЭФ настройки параметров печати / экспорта. */
export interface IDialogContext {
  /** Обработчик закрытия диалога. */
  onClose(): void;
  /** Вариант вызова диалога. */
  useCase: EXPORT_PARAMS_USE_CASES;
}

/** Начальное значение контекста. */
const defaultValue: IDialogContext = {
  /** Начальное значение обработчика закрытия диалога. */
  onClose: noop,
  /** Начальное значение варианта вызова диалога. */
  useCase: EXPORT_PARAMS_USE_CASES.ONE,
};

/** Экземпляр контекста. */
export const DialogContext = createContext<IDialogContext>(defaultValue);
