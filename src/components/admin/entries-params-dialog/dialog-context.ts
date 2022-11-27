import { createContext } from 'react';
import { ACTION } from 'interfaces/common';
import { noop } from 'utils/common';

/** Контекст ЭФ настройки параметров печати / экспорта. */
export interface IDialogContext {
  /** Обработчик закрытия диалога. */
  onClose(): void;
  /** Действие. */
  action: ACTION;
  /** Количество выгружаемых выписок. */
  amount: number;
}

/** Начальное значение контекста. */
const defaultValue: IDialogContext = {
  /** Начальное значение обработчика закрытия диалога. */
  onClose: noop,
  action: ACTION.DOWNLOAD,
  amount: 1,
};

/** Экземпляр контекста. */
export const DialogContext = createContext<IDialogContext>(defaultValue);
