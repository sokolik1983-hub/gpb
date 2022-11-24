import type { FC } from 'react';
import React, { useCallback, useContext } from 'react';
import { executor, viewStatementHistoryScroller } from 'actions/admin';
import { ACTION } from 'interfaces/common';
import { locale } from 'localization';
import { useForm, useFormState } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELDS } from 'stream-constants/form';
import { FormContext } from 'stream-constants/form/form-context';
import type { IFormContext } from 'stream-constants/form/form-context';
import { Gap, Horizon, PrimaryButton, RegularButton, ACTIONS as DATA_ACTIONS } from '@platform/ui';

/** Футера формы запроса выписки. */
export const Footer: FC = () => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();
  const { isPdf } = useContext<IFormContext>(FormContext);

  const hasOneAccount = values.accountIds.length === 1;

  /** Обработчик клика кнопки экспорта. */
  const handleClickExport = useCallback(() => change(FORM_FIELDS.ACTION, ACTION.DOWNLOAD), [change]);

  /** Обработчик клика кнопки печати. */
  const handleClickPrint = useCallback(() => change(FORM_FIELDS.ACTION, ACTION.PRINT), [change]);

  /** Обработчик клика кнопки показать на экране. */
  const handleClickShow = useCallback(() => change(FORM_FIELDS.ACTION, ACTION.VIEW), [change]);

  /** Обработчик перехода к запросам выписки. */
  const handleToStatementRequests = useCallback(() => {
    void executor.execute(viewStatementHistoryScroller);
  }, []);

  return (
    <Horizon>
      <PrimaryButton extraSmall dataAction={DATA_ACTIONS.UPLOAD} dimension="SM" type={'submit'} onClick={handleClickExport}>
        {locale.form.buttons.download.label}
      </PrimaryButton>
      <Gap />
      {hasOneAccount && (
        <>
          <RegularButton extraSmall data-action={DATA_ACTIONS.SUBMIT} dimension="SM" type={'submit'} onClick={handleClickShow}>
            {locale.form.buttons.show.label}
          </RegularButton>
          <Gap />
        </>
      )}
      {isPdf && (
        <>
          <RegularButton extraSmall data-action={DATA_ACTIONS.SUBMIT} dimension="SM" type={'submit'} onClick={handleClickPrint}>
            {locale.form.buttons.print.label}
          </RegularButton>
          <Gap />
        </>
      )}
      <RegularButton extraSmall data-action={DATA_ACTIONS.BACK} dimension="SM" onClick={handleToStatementRequests}>
        {locale.form.buttons.cancel.label}
      </RegularButton>
    </Horizon>
  );
};

Footer.displayName = 'Footer';
