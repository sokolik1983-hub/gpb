import React, { useCallback } from 'react';
import { Row } from 'components/form/row';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { useForm } from 'react-final-form';
import type { OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';
import { useCreationParams } from './use-creation-params';

/** Компонент параметров создания выписки. */
export const CreationParams: React.FC = () => {
  const { change, batch } = useForm();
  const [options] = useCreationParams();

  const onParamsChange: OnChangeType<string[]> = useCallback(
    e => {
      const params = e.value;

      if (e.value.includes(CREATION_PARAMS.WITH_SIGN) && !params.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET)) {
        change(FORM_FIELDS.CREATION_PARAMS, [...params, CREATION_PARAMS.WITH_DOCUMENTS_SET]);
      } else if (!params.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET)) {
        batch(() => {
          change(FORM_FIELDS.DOCUMENTS_SET_PARAMS, []);
          change(FORM_FIELDS.DEBIT_PARAMS, []);
          change(FORM_FIELDS.CREDIT_PARAMS, []);
        });
      }
    },
    [batch, change]
  );

  return (
    <Row align={'TOP'} label={locale.common.creationParams.label}>
      <Fields.CheckboxGroup
        extraSmall
        columns={12}
        indent="MD"
        name={FORM_FIELDS.CREATION_PARAMS}
        options={options}
        onChange={onParamsChange}
      />
    </Row>
  );
};

CreationParams.displayName = 'CreationParams';
