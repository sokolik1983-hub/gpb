import React from 'react';
import { showModalElectronicSignature } from 'components/client';
import { locale } from 'localization';
import { useHistory } from 'react-router-dom';
import { Gap, Horizon, PrimaryButton, RegularButton, ACTIONS as DATA_ACTIONS } from '@platform/ui';

/** Свойства компонента ScheduleConfirmFooter. */
interface IScheduleConfirmFooter {
  /** Значение чекбокса в форме. */
  disabled: boolean;
}

/** Компонент футера формы выписки по расписанию на странице ScheduleConfirmPage. */
export const ScheduleConfirmFooter: React.FC<IScheduleConfirmFooter> = ({ disabled }) => {
  const { goBack } = useHistory();

  return (
    <Horizon>
      <PrimaryButton
        extraSmall
        dataAction={DATA_ACTIONS.FORWARD}
        dimension="SM"
        disabled={!disabled}
        onClick={() => showModalElectronicSignature()}
      >
        {locale.client.scheduleConfirmPage.form.signAndSend}
      </PrimaryButton>
      <Gap />
      <RegularButton extraSmall data-action={DATA_ACTIONS.BACK} dimension="SM" onClick={goBack}>
        {locale.form.buttons.cancel.label}
      </RegularButton>
    </Horizon>
  );
};

ScheduleConfirmFooter.displayName = 'ScheduleConfirmFooter';
