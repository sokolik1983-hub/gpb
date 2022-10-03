import React from 'react';
import { locale } from 'localization';
import { useHistory } from 'react-router-dom';
import { Horizon, RegularButton, ACTIONS as DATA_ACTIONS } from '@platform/ui';

/** Компонент футера. */
export const Footer: React.FC = () => {
  const { goBack } = useHistory();

  return (
    <Horizon>
      <RegularButton extraSmall data-action={DATA_ACTIONS.BACK} dimension="SM" onClick={goBack}>
        {locale.admin.form.buttons.back.label}
      </RegularButton>
    </Horizon>
  );
};

Footer.displayName = 'Footer';
