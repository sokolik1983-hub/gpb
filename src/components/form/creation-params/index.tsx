import React, { useContext } from 'react';
import { exportCases } from 'components/export-params-dialog/utils';
import { Row } from 'components/form/row';
import type { IFormContext } from 'interfaces/form/form-context';
import { FormContext } from 'interfaces/form/form-context';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { Fields } from '@platform/ui';
import { useCreationParams } from './use-creation-params';

/** Компонент параметров создания выписки. */
export const CreationParams: React.FC = () => {
  const { useCase } = useContext<IFormContext>(FormContext);
  const isExportOrDefault = !useCase || exportCases.includes(useCase);
  const [options] = useCreationParams();

  return (
    <Row align={'TOP'} label={isExportOrDefault ? locale.common.creationParams.label : locale.exportParamsDialog.creationParams.label}>
      <Fields.CheckboxGroup extraSmall columns={12} indent="MD" name={FORM_FIELDS.CREATION_PARAMS} options={options} />
    </Row>
  );
};

CreationParams.displayName = 'CreationParams';
