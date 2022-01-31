import React, { useCallback, useContext, useEffect } from 'react';
import { exportCases } from 'components/export-params-dialog/utils';
import { Row } from 'components/form/row';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import type { IFormContext } from 'interfaces/form/form-context';
import { FormContext } from 'interfaces/form/form-context';
import type { IFormState } from 'interfaces/form/form-state';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { useForm, useFormState } from 'react-final-form';
import type { OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';
import { useCreationParams } from './use-creation-params';

/** Компонент параметров создания выписки. */
export const CreationParams: React.FC = () => {
  const { change } = useForm();
  const { useCase } = useContext<IFormContext>(FormContext);
  const isExport = exportCases.includes(useCase!);
  const [value, options] = useCreationParams();
  const { values } = useFormState<IFormState>();

  const onParamsChange: OnChangeType<string[]> = useCallback(e => {
    if (e.value.includes(CREATION_PARAMS.WITH_SIGN) && !e.value.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET)) {
      e.value.push(CREATION_PARAMS.WITH_DOCUMENTS_SET);
    }
  }, []);

  useEffect(() => {
    if (!values.creationParams.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET)) {
      const params = values.creationParams;

      change(FORM_FIELDS.CREATION_PARAMS, [...params, CREATION_PARAMS.WITH_DOCUMENTS_SET]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row label={isExport ? locale.common.creationParams.label : locale.exportParamsDialog.creationParams.label}>
      <Fields.CheckboxGroup
        extraSmall
        columns={12}
        indent="MD"
        name={FORM_FIELDS.CREATION_PARAMS}
        options={options}
        value={value}
        onChange={onParamsChange}
      />
    </Row>
  );
};

CreationParams.displayName = 'CreationParams';
