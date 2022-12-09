import React from 'react';
import { locale } from 'localization';
import { useHistory } from 'react-router-dom';
import { COMMON_STREAM_URL } from 'stream-constants/client';
import { useRedirect } from '@platform/services';
import { Gap, Horizon, PrimaryButton, RegularButton, ACTIONS as DATA_ACTIONS } from '@platform/ui';

/** Компонент футера формы выписки по расписанию. */
export const ScheduleFooter: React.FC = () => {
  const { goBack } = useHistory();
  const redirectToConfirmPage = useRedirect(COMMON_STREAM_URL.STATEMENT_SCHEDULE_CONFIRM);

  return (
    <Horizon>
      <PrimaryButton extraSmall dataAction={DATA_ACTIONS.FORWARD} dimension="SM" onClick={redirectToConfirmPage}>
        {locale.form.buttons.further.label}
      </PrimaryButton>
      <Gap />
      <RegularButton extraSmall data-action={DATA_ACTIONS.BACK} dimension="SM" onClick={goBack}>
        {locale.form.buttons.cancel.label}
      </RegularButton>
    </Horizon>
  );
};

ScheduleFooter.displayName = 'ScheduleFooter';
