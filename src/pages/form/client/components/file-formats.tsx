import React from 'react';
import { locale } from 'localization';
import { Row } from 'pages/form/client/components/row';
import { useFileFormats } from 'pages/form/client/hooks/use-file-formats';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { Fields } from '@platform/ui';

export const FileFormats: React.FC = () => {
  const [options] = useFileFormats();

  return (
    <Row label={locale.common.fileFormat.label}>
      <Fields.SwitchBar extraSmall name={FORM_FIELDS.FILE_FORMAT} options={options} />
    </Row>
  );
};

FileFormats.displayName = 'FileFormats';
