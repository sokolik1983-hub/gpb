import React, { useEffect, useMemo, useState } from 'react';
import type { TableInstance } from 'react-table';
import type { IColumnsStorageObject } from '@platform/core';
import type { IBaseEntity } from '@platform/services';
import type { ICheckboxOption } from '@platform/ui';
import { ACTIONS, Box, dialog, IconButton, Icons, SettingsForm } from '@platform/ui';
import css from '../styles.scss';
import type { RecordCell, TableColumn } from '../types';

/** Свойства компонента кнопки для настройки колонок таблицы. */
interface SettingsButtonProps {
  /** Функция изменения настроек для колонок. */
  setSettingsColumns(value: IColumnsStorageObject[]): void;
  /** Настройки для колонок. */
  settingColumns: IColumnsStorageObject[];
  /** Экземпляр таблицы. */
  tableInstance: TableInstance<RecordCell>;
}

/** Компонент кнопки для настройки колонок таблицы. */
export const SettingsButton = <T extends IBaseEntity>({ setSettingsColumns, settingColumns, tableInstance }: SettingsButtonProps) => {
  const {
    columns,
    setHiddenColumns,
    state: { columnResizing },
    visibleColumns,
  } = tableInstance;

  const [settingsFormOpen, setSettingsFormOpen] = useState(false);

  useEffect(() => {
    if (columnResizing.isResizingColumn === null) {
      setSettingsColumns(settingColumns.map(item => ({ ...item, width: columnResizing.columnWidths[item.id] || item.width })));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnResizing, setSettingsColumns]);

  /** Список всех колонок скроллера. */
  const columnOptions = React.useMemo(
    () =>
      (columns as TableColumn<T>)
        .map(column => ({ value: column.id, label: column.optionLabel || column.Header }))
        .filter(({ label }) => label),
    [columns]
  );

  /** Список колонок, которые будут выбраны как дефолтные по признаку isVisible. */
  const defaultVisibleColumns = useMemo(
    () =>
      columns.reduce((acc: string[], item) => {
        if (item.id && item.isVisible) {
          acc.push(item.id);
        }

        return acc;
      }, []),
    [columns]
  );

  /** Список id отображаемых на данный момент колонок, за исключением selectionAndExpand. */
  const values = React.useMemo(
    () =>
      visibleColumns.reduce((acc: string[], item) => {
        if (item.id !== 'selectionAndExpand') {
          acc.push(item.id);
        }

        return acc;
      }, []),
    [visibleColumns]
  );

  /** Функция открытия формы настроек колонок таблицы. */
  const openColumnsSettingsForm = React.useCallback(() => {
    const onSubmit = (columnList: string[]) => {
      /**
       * Поскольку в columnList нам приходит массив выбранных для отображения колонок,
       * а в setHiddenColumns надо передать те, которые требуется скрыть, то мы проходимся по всему массиву колонок и
       * извлекаем те, которые не встречаются в columnList.
       */
      const hiddenColumns = columns.reduce((acc: string[], item) => {
        if (item.id && !columnList.includes(item.id)) {
          acc.push(item.id);
        }

        return acc;
      }, []);

      setSettingsColumns(settingColumns.map(item => ({ ...item, isVisible: !!~columnList.indexOf(item.id) })));
      setHiddenColumns(hiddenColumns);
      setSettingsFormOpen(false);
    };

    dialog.show('Settings', SettingsForm, {
      columns: columnOptions as ICheckboxOption[],
      defaultColumns: defaultVisibleColumns,
      values,
      onSubmit,
      handleClose: () => setSettingsFormOpen(false),
    });
  }, [columnOptions, defaultVisibleColumns, values, columns, setSettingsColumns, settingColumns, setHiddenColumns]);

  /** Обработчик клика по кнопке настроек колонок таблицы. */
  const handleOpenSettingsForm = React.useCallback(() => {
    setSettingsFormOpen(true);
    openColumnsSettingsForm();
  }, [openColumnsSettingsForm]);

  return (
    <Box className={css.settingIcon}>
      <IconButton
        data-action={ACTIONS.OPEN}
        data-id="table-settings-button"
        fill={settingsFormOpen ? 'BASE' : 'FAINT'}
        icon={Icons.Gear}
        isActive={settingsFormOpen}
        onClick={handleOpenSettingsForm}
      />
    </Box>
  );
};

SettingsButton.displayName = 'SettingsButton';
