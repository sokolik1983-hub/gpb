import React from 'react';
import { fileFormatOptions } from 'pages/form/client/interfaces/file-format';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { noop } from 'utils';
import { Fields } from '@platform/ui';

export const FileFormats: React.FC = () => {
  const handleChangeFileFormat = noop;

  return <Fields.SwitchBar extraSmall name={FORM_FIELDS.FILE_FORMAT} options={fileFormatOptions} onChange={handleChangeFileFormat} />;
};

FileFormats.displayName = 'FileFormats';
