import React from 'react';
import css from 'common.scss';
import { Row } from 'components/common/form/row';
import { useScheduleAccounts } from 'hooks/client';
import { locale } from 'localization';
import { EmailsField } from 'pages/form/client/components/emails-field';
import { FORM_FIELDS } from 'stream-constants/form/schedule-form-state';
import { Box } from '@platform/ui';

/** Компонент поля Адрес электронной почты. */
export const Emails: React.FC = () => {
  const { data: accounts } = useScheduleAccounts();

  return (
    <Row label={locale.turnoverScroller.groupInfo.emails}>
      <Box className={css.inputWidth}>
        <EmailsField
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          accounts={accounts}
          name={FORM_FIELDS.EMAIL}
        />
      </Box>
    </Row>
  );
};

Emails.displayName = 'Emails';
