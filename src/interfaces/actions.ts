import type { TransfomedAction } from '@platform/core';
import type { IActionWithAuth } from '@platform/services';
import type { IActionWebInfo } from '@platform/services/client';
import type { PrimaryButton, RegularButton } from '@platform/ui';

/** Дополнительные поля конфигурации действий. */
export interface ActionConfigExtension {
  /** Компонент, которым может быть, если требуется, отрендерена кнопка, выполняющая действие. */
  buttonType?: typeof PrimaryButton | typeof RegularButton;
}

/** Расширенный конфиг действия. */
export interface IExtendedActionWebInfo<TContext, TResult> extends IActionWebInfo<TContext, TResult>, ActionConfigExtension {}

/** Расширенный конфиг действия с авторизацией. */
export interface IExtendedIActionWithAuth extends IActionWithAuth, ActionConfigExtension {}

/** Расширенный преобразованный конфиг действия. (Если будут значительные и бесполезные неудобства с unknown, то заменить на any). */
export type ExtendedTransfomedAction<TContext = unknown, TResult = unknown> = TransfomedAction<IExtendedActionWebInfo<TContext, TResult>>;
