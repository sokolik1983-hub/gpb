import React, { useCallback } from 'react';
import { Row } from 'components/form/row';
import { FORMAT } from 'interfaces/client';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { fileFormatOptions } from 'interfaces/form/file-format';
import type { IFormState } from 'interfaces/form/form-state';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { useForm, useFormState } from 'react-final-form';
import type { OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Компонент выбора формата файла. */
export const FileFormats: React.FC = () => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();

  const onFileFormatChange: OnChangeType<FORMAT> = useCallback(
    e => {
      const isPdf = e.value === FORMAT.PDF;

      if (!isPdf) {
        const params = values.creationParams.filter(x => x !== CREATION_PARAMS.WITH_SIGN);

        change(FORM_FIELDS.CREATION_PARAMS, params);
      }
    },
    [change, values.creationParams]
  );

  return (
    <Row label={locale.common.fileFormat.label}>
      <Fields.SwitchBar extraSmall name={FORM_FIELDS.FILE_FORMAT} options={fileFormatOptions} onChange={onFileFormatChange} />
    </Row>
  );
};

FileFormats.displayName = 'FileFormats';
