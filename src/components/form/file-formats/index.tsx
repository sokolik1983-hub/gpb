import React from 'react';
import { Row } from 'components/form/row';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { Fields } from '@platform/ui';
import { useFileFormats } from './use-file-formats';

/** Компонент выбора формата файла. */
export const FileFormats: React.FC = () => {
  const [options] = useFileFormats();

  return (
    <Row label={locale.common.fileFormat.label}>
      <Fields.SwitchBar extraSmall name={FORM_FIELDS.FILE_FORMAT} options={options} />
    </Row>
  );
};

FileFormats.displayName = 'FileFormats';
