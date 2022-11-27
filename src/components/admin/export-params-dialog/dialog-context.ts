import { createContext } from 'react';
import type { ACTION } from 'interfaces/common';
import { noop } from 'utils/common';
import type { IDialogOptions } from './dialog';

/** Контекст ЭФ настройки параметров печати / экспорта. */
export interface IDialogContext {
  /** Обработчик закрытия диалога. */
  onClose(): void;
  /** Вариант вызова диалога. */
  options?: IDialogOptions;
  /** Действие. */
  action?: ACTION;
  /** Идентификатор выписки. */
  statementId?: string;
}

/** Начальное значение контекста. */
const defaultValue: IDialogContext = {
  /** Начальное значение обработчика закрытия диалога. */
  onClose: noop,
};

/** Экземпляр контекста. */
export const DialogContext = createContext<IDialogContext>(defaultValue);
