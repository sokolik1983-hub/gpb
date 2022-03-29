import React, { useCallback } from 'react';
import { locale } from 'localization';
import { useForm, useFormState } from 'react-final-form';
import { Gap, Horizon, PrimaryButton, RegularButton, Box, ACTIONS } from '@platform/ui';
import css from './styles.scss';

/** Интерфейс футера фильтра. */
interface IFooterProps {
  /** Обработчик клика по кнопке "сбросить". */
  onReset(): void;
  /** Обработчик клика по кнопке "применить фильтры". */
  onApply(formValues): void;
}

/** Футер фильтра скроллера. */
export const FilterFooter: React.FC<IFooterProps> = ({ onReset, onApply }) => {
  const { restart } = useForm();
  const { invalid, values } = useFormState();

  const handleCancel = useCallback(() => {
    onReset();
    restart({});
  }, [onReset, restart]);

  const handleApply = useCallback(() => {
    onApply(values);
  }, [onApply, values]);

  return (
    <Box className={css.footerWrapper}>
      <Horizon>
        <PrimaryButton extraSmall dataAction={ACTIONS.SUBMIT} dimension="SM" disabled={invalid} onClick={handleApply}>
          {locale.scroller.filter.buttons.applyFilters}
        </PrimaryButton>
        <Gap />

        <RegularButton extraSmall data-action={ACTIONS.CANCEL} dimension="SM" disabled={invalid} onClick={handleCancel}>
          {locale.scroller.filter.buttons.reset}
        </RegularButton>
      </Horizon>
    </Box>
  );
};

FilterFooter.displayName = 'FilterFooter';
