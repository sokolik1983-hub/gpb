import type { DATA_ACTION } from 'interfaces/data-action';
import type { TransfomedAction } from '@platform/core';
import type { IActionWithAuth } from '@platform/services';
import type { IActionWebInfo } from '@platform/services/client';
import type { BUTTON } from '@platform/ui';

/** Дополнительные поля конфигурации действий. */
export interface ActionConfigExtension {
  /** Тип кнопки, которым может быть, если требуется, отрендерена кнопка, выполняющая действие. */
  buttonType?: BUTTON;
  dataAction?: DATA_ACTION;
}

/** Расширенный конфиг действия. */
export interface IExtendedActionWebInfo<TContext = unknown, TResult = unknown>
  extends IActionWebInfo<TContext, TResult>,
    ActionConfigExtension {}

/** Расширенный конфиг действия с авторизацией. */
export interface IExtendedIActionWithAuth extends IActionWithAuth, ActionConfigExtension {}

/** Расширенный преобразованный конфиг действия. (Если будут значительные и бесполезные неудобства с unknown, то заменить на any). */
export type ExtendedTransfomedAction<TContext = unknown, TResult = unknown> = TransfomedAction<IExtendedActionWebInfo<TContext, TResult>>;
