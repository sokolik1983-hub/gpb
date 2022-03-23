import React, { useContext } from 'react';
import { ACTION } from 'interfaces/client/classificators';
import type { IFormContext } from 'interfaces/form/form-context';
import { FormContext } from 'interfaces/form/form-context';
import { FORM_FIELDS } from 'interfaces/form/form-state';
import type { IFormState } from 'interfaces/form/form-state';
import { locale } from 'localization';
import { useForm, useFormState } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import { Gap, Horizon, PrimaryButton, RegularButton, WithInfoTooltip, Box, ACTIONS as DATA_ACTIONS } from '@platform/ui';

/** Компонент футера. */
export const Footer: React.FC = () => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();
  const { goBack } = useHistory();
  const { isPdf } = useContext<IFormContext>(FormContext);

  const hasOneAccount = values.accountIds.length === 1;

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
      {hasOneAccount ? (
        <RegularButton
          extraSmall
          data-action={DATA_ACTIONS.SUBMIT}
          dimension="SM"
          type={'submit'}
          onClick={() => change(FORM_FIELDS.ACTION, ACTION.VIEW)}
        >
          {locale.form.buttons.show.label}
        </RegularButton>
      ) : (
        <WithInfoTooltip extraSmall text={locale.form.tooltip.hasOneAccount}>
          {ref => (
            // Без обёртки тултип не показывается, когда кнопка задизейблена.
            <Box ref={ref}>
              <RegularButton disabled extraSmall dimension="SM">
                {locale.form.buttons.show.label}
              </RegularButton>
            </Box>
          )}
        </WithInfoTooltip>
      )}
      <Gap />
      <RegularButton
        extraSmall
        data-action={DATA_ACTIONS.SUBMIT}
        dimension="SM"
        disabled={!isPdf}
        type={'submit'}
        onClick={() => change(FORM_FIELDS.ACTION, ACTION.PRINT)}
      >
        {locale.form.buttons.print.label}
      </RegularButton>
      <Gap />
      <RegularButton extraSmall data-action={DATA_ACTIONS.BACK} dimension="SM" onClick={goBack}>
        {locale.form.buttons.cancel.label}
      </RegularButton>
    </Horizon>
  );
};

Footer.displayName = 'Footer';
