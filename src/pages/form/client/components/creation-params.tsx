import React, { useCallback } from 'react';
import { locale } from 'localization';
import { Row } from 'pages/form/client/components/row';
import { useCreationParams } from 'pages/form/client/hooks/use-creation-params';
import { CREATION_PARAMS } from 'pages/form/client/interfaces/creation-params';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import type { OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Компонент параметров создания выписки. */
export const CreationParams: React.FC = () => {
  const [value, options] = useCreationParams();

  const onParamsChange: OnChangeType<string[]> = useCallback(e => {
    if (e.value.includes(CREATION_PARAMS.WITH_SIGN) && !e.value.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET)) {
      e.value.push(CREATION_PARAMS.WITH_DOCUMENTS_SET);
    }
  }, []);

  return (
    <Row label={locale.common.creationParams.label}>
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
