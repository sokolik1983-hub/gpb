import React from 'react';
import { locale } from 'localization';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { useForm, useFormState } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import { Gap, Horizon, PrimaryButton, RegularButton, WithInfoTooltip, Box } from '@platform/ui';

/** Компонент футера. */
export const Footer: React.FC = () => {
  const { submit } = useForm();
  const { values } = useFormState<IFormState>();
  const { goBack } = useHistory();
  const hasOneAccount = values.accountIds.length === 1;

  return (
    <Horizon>
      <PrimaryButton extraSmall dimension="SM">
        {locale.form.buttons.download.label}
      </PrimaryButton>
      <Gap />
      {hasOneAccount ? (
        <RegularButton extraSmall dimension="SM" onClick={submit}>
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
      <RegularButton extraSmall dimension="SM">
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
