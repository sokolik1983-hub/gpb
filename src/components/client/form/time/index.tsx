import React from 'react';
import { Row } from 'components/common/form/row';
import { FORM_FIELD_LABELS, FORM_FIELDS } from 'stream-constants/form/schedule-form-state';
import { Fields } from '@platform/ui';

/** Компонент задания времени отправки выписки по расписанию. */
export const Time: React.FC = () => (
  <Row label={FORM_FIELD_LABELS[FORM_FIELDS.TIME]}>
    <Fields.Time extraSmall name={FORM_FIELDS.TIME} placeholder="09:00" width={178} />
  </Row>
);

Time.displayName = 'Time';
