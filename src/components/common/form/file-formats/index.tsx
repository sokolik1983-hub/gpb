import React, { useCallback, useContext } from 'react';
import { useSeparateAccountFiles } from 'components/common/form/common/use-separate-account-files';
import { Row } from 'components/common/form/row';
import { useAccounts } from 'hooks/common/use-accounts';
import { FORMAT } from 'interfaces/common';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { locale } from 'localization';
import { useForm, useFormState } from 'react-final-form';
import { RUB_CURRENCY } from 'stream-constants';
import type { IFormState } from 'stream-constants/form';
import { fileFormatOptions, FORM_FIELDS } from 'stream-constants/form';
import { FormContext } from 'stream-constants/form/form-context';
import { isNeedTotalsOfDay } from 'utils/common';
import type { OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Cвойства компонента выбора формата файла. */
interface FileFormatsProps {
  /** Блокировка редактирования значений. */
  disabled?: boolean;
}

/** Компонент выбора формата файла. */
export const FileFormats: React.FC<FileFormatsProps> = ({ disabled }) => {
  const { data: accounts } = useAccounts();
  const { change } = useForm();
  const { values } = useFormState<IFormState>();
  const { accountIds, creationParams } = values;
  const { withSign } = useContext(FormContext);

  // встраиваем реакцию на изменение параметров для флага "Отдельный файл по каждому счету"
  useSeparateAccountFiles();

  const onChangeFileFormat: OnChangeType<FORMAT> = useCallback(
    e => {
      const hasAccounts = accountIds.length > 0;
      const hasForeignCurrency = accounts.filter(x => accountIds.includes(x.id)).some(x => x.currency.code !== RUB_CURRENCY);

      let params = [...creationParams];

      const format = e.value;
      const isPdf = format === FORMAT.PDF;
      const isC1 = format === FORMAT.C1;
      const isText = format === FORMAT.TXT;

      if (!hasForeignCurrency || !hasAccounts || isC1 || isText) {
        params = params.filter(x => x !== CREATION_PARAMS.NATIONAL_CURRENCY);
      }

      if (!isPdf && withSign) {
        params = params.filter(x => x !== CREATION_PARAMS.WITH_PDF_SIGN);
      }

      if (isPdf && params.includes(CREATION_PARAMS.WITH_DOCUMENTS_SET)) {
        params = params.filter(x => x !== CREATION_PARAMS.WITH_DOCUMENTS_SET);
      }

      if (!isNeedTotalsOfDay({ ...values, format }) && params.includes(CREATION_PARAMS.TOTALS_OF_DAY)) {
        params = params.filter(x => x !== CREATION_PARAMS.TOTALS_OF_DAY);
      }

      change(FORM_FIELDS.CREATION_PARAMS, params);
    },
    [accountIds, accounts, creationParams, withSign, values, change]
  );

  return (
    <Row label={locale.common.fileFormat.label}>
      <Fields.SwitchBar
        extraSmall
        disabled={disabled}
        name={FORM_FIELDS.FILE_FORMAT}
        options={fileFormatOptions}
        onChange={onChangeFileFormat}
      />
    </Row>
  );
};

FileFormats.displayName = 'FileFormats';
