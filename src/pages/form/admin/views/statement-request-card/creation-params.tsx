import React, { useMemo } from 'react';
import { Row } from 'components/common/form/row';
import { locale } from 'localization';
import { useFormState } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELDS } from 'stream-constants/form';
import { defaultCreationParamsOptions } from 'utils/common';
import type { ICheckboxOption } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Компонент параметров создания выписки. */
export const CreationParams: React.FC = () => {
  const { values } = useFormState<IFormState>();
  const options = useMemo(
    () =>
      defaultCreationParamsOptions.reduce<ICheckboxOption[]>((optionsArray, option) => {
        const value = values.creationParams.includes(option.value);

        if (value) {
          optionsArray.push(option);
        }

        return optionsArray;
      }, []),
    [values]
  );

  return (
    <Row align={'TOP'} label={locale.common.creationParams.label}>
      <Fields.CheckboxGroup disabled extraSmall columns={12} indent="MD" name={FORM_FIELDS.CREATION_PARAMS} options={options} />
    </Row>
  );
};

CreationParams.displayName = 'CreationParams';
