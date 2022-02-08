import React from 'react';

import { Row } from 'components/form/row';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { Fields } from '@platform/ui';
import { useCreationParams } from './use-creation-params';

/** Компонент параметров создания выписки. */
export const CreationParams: React.FC = () => {
  const [options] = useCreationParams();

  return (
    <Row align={'TOP'} label={locale.common.creationParams.label}>
      <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FORM_FIELDS.CREATION_PARAMS} options={options} />
    </Row>
  );
};

CreationParams.displayName = 'CreationParams';
