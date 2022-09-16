import React, { useContext } from 'react';
import { ACTION } from 'interfaces/client/classificators';
import { locale } from 'localization';
import { useForm } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import { FORM_FIELDS } from 'stream-constants/form';
import { FormContext } from 'stream-constants/form/form-context';
import type { IFormContext } from 'stream-constants/form/form-context';
import { Gap, Horizon, PrimaryButton, RegularButton, ACTIONS as DATA_ACTIONS } from '@platform/ui';

/** Компонент футера. */
export const Footer: React.FC = () => {
  const { change } = useForm();
  const { goBack } = useHistory();
  const { isPdf } = useContext<IFormContext>(FormContext);

  return (
    <Horizon>
      <PrimaryButton
        extraSmall
        dataAction={DATA_ACTIONS.UPLOAD}
        dimension="SM"
        type={'submit'}
        onClick={() => change(FORM_FIELDS.ACTION, ACTION.DOWNLOAD)}
      >
        {locale.form.buttons.download.label}
      </PrimaryButton>
      <Gap />
      <RegularButton
        extraSmall
        data-action={DATA_ACTIONS.SUBMIT}
        dimension="SM"
        type={'submit'}
        onClick={() => change(FORM_FIELDS.ACTION, ACTION.VIEW)}
      >
        {locale.form.buttons.show.label}
      </RegularButton>
      <Gap />
      {isPdf && (
        <>
          <RegularButton
            extraSmall
            data-action={DATA_ACTIONS.SUBMIT}
            dimension="SM"
            type={'submit'}
            onClick={() => change(FORM_FIELDS.ACTION, ACTION.PRINT)}
          >
            {locale.form.buttons.print.label}
          </RegularButton>
          <Gap />
        </>
      )}
      <RegularButton extraSmall data-action={DATA_ACTIONS.BACK} dimension="SM" onClick={goBack}>
        {locale.form.buttons.cancel.label}
      </RegularButton>
    </Horizon>
  );
};

Footer.displayName = 'Footer';
