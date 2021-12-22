import React, { useContext, useEffect } from 'react';
import { locale } from 'localization';
import { Row } from 'pages/form/client/components/row';
import { CREATION_PARAMS } from 'pages/form/client/interfaces/creation-params';
import { fileFormatOptions } from 'pages/form/client/interfaces/file-format';
import type { IFormContext } from 'pages/form/client/interfaces/form-context';
import { FormContext } from 'pages/form/client/interfaces/form-context';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { useForm, useFormState } from 'react-final-form';
import { Fields } from '@platform/ui';

export const FileFormats: React.FC = () => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();
  const { isPdf } = useContext<IFormContext>(FormContext);

  useEffect(() => {
    if (!isPdf) {
      const params = values.creationParams.filter(x => x !== CREATION_PARAMS.WITH_SIGN);

      change(FORM_FIELDS.CREATION_PARAMS, params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, isPdf]);

  return (
    <Row label={locale.common.fileFormat.label}>
      <Fields.SwitchBar extraSmall name={FORM_FIELDS.FILE_FORMAT} options={fileFormatOptions} />
    </Row>
  );
};

FileFormats.displayName = 'FileFormats';
