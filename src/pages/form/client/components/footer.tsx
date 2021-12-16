import React from 'react';
import { locale } from 'localization';
import { useHistory } from 'react-router-dom';
import { Gap, Horizon, PrimaryButton, RegularButton } from '@platform/ui';

export const Footer: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <Horizon>
      <PrimaryButton disabled extraSmall dimension="SM">
        {locale.form.buttons.download.label}
      </PrimaryButton>
      <Gap />
      <RegularButton disabled extraSmall dimension="SM">
        {locale.form.buttons.sendToEmail.label}
      </RegularButton>
      <Gap />
      <RegularButton disabled extraSmall dimension="SM">
        {locale.form.buttons.show.label}
      </RegularButton>
      <Gap />
      <RegularButton disabled extraSmall dimension="SM">
        {locale.form.buttons.print.label}
      </RegularButton>
      <Gap />
      <RegularButton extraSmall dimension="SM" onClick={goBack}>
        {locale.form.buttons.cancel.label}
      </RegularButton>
    </Horizon>
  );
};

Footer.displayName = 'Footer';
