import type { IExtendedActionWebInfo } from 'interfaces';
import { HTTP_STATUS_CODE } from 'interfaces';
import { locale } from 'localization';
import type { IExecuter } from '@platform/core';
import { getActionButtons } from '@platform/core';
import type { IBaseContext } from '@platform/services';
import { dialog } from '@platform/ui';

/** Типизированная noop-функция. */
export const noop = <T = unknown>() => (({} as unknown) as T);

/** Асинхронная noop-функция. */
export const asyncNoop = <T = unknown>() => Promise.resolve(noop<T>());

/**
 * Используется в предикате для Array.sort, для сортировки строк по возрастанию.
 *
 * @param a - Строка для сравнения.
 * @param b - Строка для сравнения.
 */
export const compareStrings = (a: string, b: string): -1 | 0 | 1 => {
  if (a < b) {
    return -1;
  }

  if (a > b) {
    return 1;
  }

  return 0;
};

/** Кастомный обработчик фатальной ошибки. */
export const fatalHandler = ({ showError }: IBaseContext, { error }: { error?: Error }) => {
  if ((error as any)?.response?.status === HTTP_STATUS_CODE.FORBIDDEN) {
    showError(locale.errors.progressError, locale.common.checkAuthority.error);

    return;
  }

  showError(locale.errors.progressErrorHeader, locale.errors.progressError);
};

/**
 * Отображает общую техническую ошибку.
 * В аналитике часто, не учитываются все возможные места где приложение может упасть,
 * при выполнении запросов. Но по коду и по типам, в этих местах должен быть обработчик.
 * В таких случаях отображается диалог с сообщением о технической ошибке.
 */
export const showCommonErrorMessage = () => {
  dialog.showAlert(locale.errors.progressError, { header: locale.errors.progressErrorHeader });
};

/**
 * Возвращает только активные конфиги кнопок (оставляет только с disabled: true). Типизация с any как в платформе.
 *
 * @param actions - Массив экшн конфигов.
 * @param executor - Экзекутор, которым будут исполнены экшны.
 * @param params - Аргументы, которые получит экшн.
 * @returns Массив трансформированных экшнов.
 */
export const getActiveActionButtons = (actions: IExtendedActionWebInfo[], executor: IExecuter<any>, params: any[]) =>
  getActionButtons(actions, executor, params).filter(item => !item.disabled);

/**
 * Возвращает уникальные значения массива по переданному полю.
 *
 * @param values - Входящий массив значений.
 * @param prop - Поле, по которому произойдет фильтрация на уникальность.
 */
export const uniqBy = <T>(values: T[], prop: keyof T): T[] => {
  const set = new Set();

  values.forEach(item => set.add(item[prop]));

  return Array.from(set).map(item => values.find(value => value[prop] === item) as T);
};
