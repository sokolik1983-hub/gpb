import React from 'react';
import { EmailsField } from 'components/client/emails-field';
import { Row } from 'components/common/form/row';
import { useScheduleAccounts } from 'hooks/common';
import { locale } from 'localization';
import { FORM_FIELDS } from 'stream-constants/form/schedule-form-state';
import { Box } from '@platform/ui';
import css from './styles.scss';

/** Компонент поля Адрес электронной почты. */
export const Emails: React.FC = () => {
  const { data: accounts } = useScheduleAccounts();

  return (
    <Row label={locale.turnoverScroller.groupInfo.emails}>
      <Box className={css.emailsType}>
        <EmailsField accounts={accounts} name={FORM_FIELDS.EMAIL} />
      </Box>
    </Row>
  );
};

Emails.displayName = 'Emails';
