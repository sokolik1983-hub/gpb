import React, { useCallback, useContext } from 'react';
import { Row } from 'components/common/form/row';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { locale } from 'localization';
import { useForm } from 'react-final-form';
import type { IFormContext } from 'stream-constants/form';
import { FormContext, FORM_FIELDS } from 'stream-constants/form';
import type { OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';
import { useCreationParams } from './use-creation-params';

/** Компонент параметров создания выписки. */
export const CreationParams: React.FC = () => {
  const { change, batch } = useForm();
  const [options] = useCreationParams();
  const { withSign } = useContext<IFormContext>(FormContext);

  const onChangeParams: OnChangeType<string[]> = useCallback(
    e => {
      let params = [...e.value];

      if (!withSign && params.includes(CREATION_PARAMS.WITH_PDF_SIGN)) {
        params = [...params, CREATION_PARAMS.WITH_DOCUMENTS_SET];
      }

      if (params.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET)) {
        change(FORM_FIELDS.CREATION_PARAMS, params);
      } else {
        batch(() => {
          change(FORM_FIELDS.CREATION_PARAMS, params);
          // и сбрасываем остальные параметры, если флаг "С комплектом документов не установлен"
          change(FORM_FIELDS.DOCUMENTS_SET_PARAMS, []);
          change(FORM_FIELDS.DEBIT_PARAMS, []);
          change(FORM_FIELDS.CREDIT_PARAMS, []);
        });
      }
    },
    [batch, change, withSign]
  );

  return (
    <Row align={'TOP'} label={locale.common.creationParams.label}>
      <Fields.CheckboxGroup
        extraSmall
        columns={12}
        indent="MD"
        name={FORM_FIELDS.CREATION_PARAMS}
        options={options}
        onChange={onChangeParams}
      />
    </Row>
  );
};

CreationParams.displayName = 'CreationParams';
