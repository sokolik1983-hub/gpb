import type { ClientExecutorContext } from 'actions/client';
import type { TransfomedAction } from '@platform/core';
import type { IActionWebInfo } from '@platform/services/client';

/** Преобразованный конфиг действия клиента. */
export type ClientTransfomedAction<T = unknown> = TransfomedAction<IActionWebInfo<ClientExecutorContext, T>>;
