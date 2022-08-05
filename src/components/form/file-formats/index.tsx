import React, { useCallback, useContext } from 'react';
import type { IDialogContext } from 'components/export-params-dialog/dialog-context';
import { DialogContext } from 'components/export-params-dialog/dialog-context';
import { useSeparateAccountFiles } from 'components/form/common/use-separate-account-files';
import { Row } from 'components/form/row';
import { FORMAT } from 'interfaces/client';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { locale } from 'localization';
import { useForm, useFormState } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { fileFormatOptions, FORM_FIELDS } from 'stream-constants/form';
import { FormContext } from 'stream-constants/form/form-context';
import { fileFormatShowCases } from 'utils';
import type { OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Компонент выбора формата файла. */
export const FileFormats: React.FC = () => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();
  const { useCase } = useContext<IDialogContext>(DialogContext);
  const { withSign, hasForeignCurrency } = useContext(FormContext);

  // встраиваем реакцию на изменение параметров для флага "Отдельный файл по каждому счету"
  useSeparateAccountFiles();

  const onChangeFileFormat: OnChangeType<FORMAT> = useCallback(
    e => {
      let params = [...values.creationParams];
      const format = e.value;
      const isPdf = format === FORMAT.PDF;
      const isC1 = format === FORMAT.C1;
      const isText = format === FORMAT.TXT;

      if (!hasForeignCurrency || isC1 || isText) {
        params = params.filter(x => x !== CREATION_PARAMS.NATIONAL_CURRENCY);
      }

      if (!isPdf && withSign) {
        params = params.filter(x => x !== CREATION_PARAMS.WITH_PDF_SIGN);
      }

      change(FORM_FIELDS.CREATION_PARAMS, params);
    },
    [change, hasForeignCurrency, values.creationParams, withSign]
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
