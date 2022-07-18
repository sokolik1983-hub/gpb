import { useState } from 'react';
import type { IFiltersStorageObject } from '@platform/core';
import { getDefaultValue, getHookValue, useStorageSync } from '@platform/services';

/** Тип настроек скроллера для сохранения в sessionStorage. */
export enum SCROLLER_SETTING_TYPE {
  /** Сортировка. */
  SORT = 'SORT',
  /** Колонки. */
  COLUMNS = 'COLUMNS',
}

/** Тип настроек скроллера для сохранения в sessionStorage. */
export const SETTINGS_NAME: Record<SCROLLER_SETTING_TYPE, keyof IFiltersStorageObject> = {
  /** Сортировка. */
  SORT: 'sort',
  /** Колонки. */
  COLUMNS: 'columns',
};

/** Параметры useStorageSettings. */
interface IParams<T> {
  /** Изначальное значение для сохранения. */
  value: T;
  /** Ключ по которому сохраняется. */
  storageKey?: string;
  /** Тип настроек скроллера для сохранения в sessionStorage. */
  settingsName: SCROLLER_SETTING_TYPE;
}

export const useStorageSettings = <T>({ value, storageKey, settingsName }: IParams<T>) => {
  const [values, setValues] = useState(() => {
    const storageSettings = storageKey
      ? {
          storageKey,
          filterType: SETTINGS_NAME[settingsName],
        }
      : undefined;

    return getDefaultValue(value, storageSettings);
  });

  const useStorageSyncConfig = storageKey ? { filterType: SETTINGS_NAME[settingsName], value: values, storageKey } : undefined;

  getHookValue(useStorageSync, useStorageSyncConfig);

  return { values, setValues };
};
