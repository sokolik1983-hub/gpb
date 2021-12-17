import React from 'react';
import { locale } from 'localization';
import { Row } from 'pages/form/client/components/row';
import { fileFormatOptions } from 'pages/form/client/interfaces/file-format';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { Fields } from '@platform/ui';

export const FileFormats: React.FC = () => (
  <Row label={locale.common.fileFormat.label}>
    <Fields.SwitchBar extraSmall name={FORM_FIELDS.FILE_FORMAT} options={fileFormatOptions} />
  </Row>
);

FileFormats.displayName = 'FileFormats';
