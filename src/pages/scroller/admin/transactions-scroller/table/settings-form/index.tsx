import React, { useCallback, useMemo } from 'react';
import cn from 'classnames';
import { locale } from 'localization';
import type { SettingsFormProps } from 'platform-copies/services';
import { Form, useForm, useFormState } from 'react-final-form';

import {
  Box,
  DialogTemplate,
  CheckboxGroup,
  Adjust,
  Horizon,
  Gap,
  ACTIONS,
  PrimaryButton,
  DATA_TYPE,
  RegularButton,
  Font,
} from '@platform/ui';
import { COLUMN_NAMES } from '../../constants';
import type { IFormSettingsState } from './interfaces';
import css from './style.scss';

/** ЭФ настроек колонок скроллера проводок. */
const FormView: React.FC<Pick<SettingsFormProps, 'columns'> & { defaultColumns: string[]; onReset?(): void }> = ({
  columns,
  defaultColumns,
  onReset,
}) => {
  const { values } = useFormState<IFormSettingsState>();
  const { submit, change, reset } = useForm<IFormSettingsState>();

  const isActiveSummaryColumn = useMemo(() => values.columns.includes(COLUMN_NAMES.SUMMARY), [values.columns]);

  const visibleColumns = useMemo(
    () =>
      columns
        .filter(col => !col.value.includes(COLUMN_NAMES.SUMMARY))
        .map(col => {
          if (isActiveSummaryColumn && (col.value === COLUMN_NAMES.INCOME || col.value === COLUMN_NAMES.OUTCOME)) {
            return { ...col, disabled: true };
          }

          return col;
        }),
    [columns, isActiveSummaryColumn]
  );

  const settingsViewColumns = useMemo(() => columns.filter(c => c.value.includes(COLUMN_NAMES.SUMMARY)), [columns]);

  const onChangeVisibleColumns = useCallback(
    (activeCols: string[]) => {
      change('columns', activeCols);
    },
    [change]
  );

  const onChangeViewSettingsColumns = useCallback(
    (activeCols: string[]) => {
      const cols = activeCols.includes(COLUMN_NAMES.SUMMARY)
        ? [...activeCols.filter(c => c !== COLUMN_NAMES.INCOME && c !== COLUMN_NAMES.OUTCOME)]
        : [...activeCols, COLUMN_NAMES.INCOME, COLUMN_NAMES.OUTCOME];

      change('columns', cols);
    },
    [change]
  );

  const onResetHandler = useCallback(() => {
    reset({ columns: defaultColumns });
    onReset?.();
  }, [defaultColumns, onReset, reset]);

  return (
    <Box className={cn(css.container, Adjust.getPadClass([undefined, 'XS']))} data-id="table-columns-settings">
      <Box>
        <Font volume="LG" weight="BOLD">
          {locale.transactionsScroller.settings.columnsHeader}
        </Font>
        <Gap />
      </Box>
      <CheckboxGroup
        extraSmall
        columns={12}
        indent="MD"
        name="settings-form"
        options={visibleColumns}
        value={values.columns}
        onChange={onChangeVisibleColumns}
      />
      <Gap.XL />
      <Box>
        <Font volume="LG" weight="BOLD">
          {locale.transactionsScroller.settings.viewHeader}
        </Font>
        <Gap />
      </Box>
      <CheckboxGroup
        extraSmall
        columns={12}
        indent="MD"
        name="settings-view-form"
        options={settingsViewColumns}
        value={values.columns}
        onChange={onChangeViewSettingsColumns}
      />
      <Gap.XL />
      <Horizon>
        <PrimaryButton extraSmall dataAction={ACTIONS.SUBMIT} dimension="SM" onClick={submit}>
          {locale.transactionsScroller.settings.apply}
        </PrimaryButton>
        <Gap />
        <RegularButton extraSmall dimension="SM" onClick={onResetHandler}>
          {locale.transactionsScroller.settings.byDefault}
        </RegularButton>
      </Horizon>
    </Box>
  );
};

/**
 * Диалог ЭФ настроек колонок скроллера проводок.
 *
 * @example dialog.show('Settings', SettingsForm, { onSubmit: ()=> {}, columns: columns, values: [] }, () => reject(true))
 */
export const SettingsForm: React.FC<SettingsFormProps> = ({ onClose, handleClose, onSubmit, columns, defaultColumns, values }) => {
  const onCloseHandler = useCallback(() => {
    onClose();
    handleClose?.();
  }, [handleClose, onClose]);

  const onSubmitHandler = useCallback(
    data => {
      onSubmit(data.columns);
      onCloseHandler();
    },
    [onCloseHandler, onSubmit]
  );

  const cols = useMemo(() => columns.filter(c => !!c.label && typeof c.label === 'string'), [columns]);

  return (
    <DialogTemplate
      extraSmall
      content={
        <Form<IFormSettingsState>
          initialValues={{ columns: values }}
          render={() => <FormView columns={cols} defaultColumns={defaultColumns} />}
          onSubmit={onSubmitHandler}
        />
      }
      dataType={DATA_TYPE.CONFIRMATION}
      header={null}
      onClose={onCloseHandler}
    />
  );
};

SettingsForm.displayName = 'SettingsForm';
