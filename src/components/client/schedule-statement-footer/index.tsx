import React from 'react';
import { locale } from 'localization';
import { useHistory } from 'react-router-dom';
import { Horizon, RegularButton, ACTIONS as DATA_ACTIONS, Gap } from '@platform/ui';

/** Компонент футера формы выписки по расписанию на странице Schedule.Statement. */
export const ScheduleStatementFooter: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <Horizon>
      <RegularButton extraSmall data-action={DATA_ACTIONS.BACK} dimension="SM" onClick={goBack}>
        {locale.client.scheduleStatementPage.testData.buttons.back}
      </RegularButton>
      <Gap />
      <RegularButton extraSmall data-action={DATA_ACTIONS.BACK} dimension="SM">
        {locale.client.scheduleStatementPage.testData.buttons.print}
      </RegularButton>
      <Gap />
      <RegularButton extraSmall data-action={DATA_ACTIONS.BACK} dimension="SM">
        {locale.client.scheduleStatementPage.testData.buttons.export}
      </RegularButton>
    </Horizon>
  );
};

ScheduleStatementFooter.displayName = 'ScheduleStatementFooter';
