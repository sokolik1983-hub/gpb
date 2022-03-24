import React, { useCallback, useContext } from 'react';
import type { IDialogContext } from 'components/export-params-dialog/dialog-context';
import { DialogContext } from 'components/export-params-dialog/dialog-context';
import { useSeparateAccountFiles } from 'components/form/common/use-separate-account-files';
import { Row } from 'components/form/row';
import { FORMAT } from 'interfaces/client';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { fileFormatOptions } from 'interfaces/form/file-format';
import type { IFormState } from 'interfaces/form/form-state';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { useForm, useFormState } from 'react-final-form';
import { fileFormatShowCases } from 'utils';
import type { OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Компонент выбора формата файла. */
export const FileFormats: React.FC = () => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();
  const { useCase } = useContext<IDialogContext>(DialogContext);

  // встраиваем реакцию на изменение параметров для флага "Отдельный файл по каждому счету"
  useSeparateAccountFiles();

  const onChangeFileFormat: OnChangeType<FORMAT> = useCallback(
    e => {
      const params = [...values.creationParams];
      const format = e.value;
      const isPdf = format === FORMAT.PDF;

      if (!isPdf) {
        change(
          FORM_FIELDS.CREATION_PARAMS,
          params.filter(x => x !== CREATION_PARAMS.WITH_SIGN)
        );
      }
    },
    [change, values.creationParams]
  );

  const visible = !useCase || (useCase && fileFormatShowCases.includes(useCase));

  if (!visible) {
    return null;
  }

  return (
    <Row label={locale.common.fileFormat.label}>
      <Fields.SwitchBar extraSmall name={FORM_FIELDS.FILE_FORMAT} options={fileFormatOptions} onChange={onChangeFileFormat} />
    </Row>
  );
};

FileFormats.displayName = 'FileFormats';
