import type { FC } from 'react';
import React, { useCallback, useMemo } from 'react';
import { locale } from 'localization';
import { useForm } from 'react-final-form';
import { ALL_VALUE } from 'stream-constants';
import type { IOption } from '@platform/ui';
import { Fields } from '@platform/ui';
import type { OnChangeType } from '@platform/ui/dist-types/form/interfaces';

/** Свойства мультиселекта с опцией "Все". */
interface MultiselectWithOptionAllFieldProps {
  /** Название поля. */
  name: string;
  /** Опции. */
  options: IOption[];
}

/** Мультиселект с опцией "Все". */
export const MultiselectWithOptionAllField: FC<MultiselectWithOptionAllFieldProps> = ({ name, options }) => {
  const optionsWithAllValue = useMemo(() => [{ value: ALL_VALUE, label: locale.form.labels.selectAll }, ...options], [options]);

  const { change } = useForm();

  /** Обработчик изменения опций. */
  const handleChange: OnChangeType<string[]> = useCallback(
    ({ event, value: selectedOptions }) => {
      const currentOption = (event as unknown) as IOption | undefined;

      if ((!currentOption && selectedOptions.length > 0) || currentOption?.value === ALL_VALUE) {
        change(name, [ALL_VALUE]);

        return;
      }

      if (selectedOptions.includes(ALL_VALUE)) {
        change(
          name,
          selectedOptions.filter(item => item !== ALL_VALUE)
        );
      }
    },
    [change, name]
  );

  return <Fields.MultiSelect extraSmall name={name} options={optionsWithAllValue} onChange={handleChange} />;
};
