import React, { useCallback } from 'react';
import { locale } from 'localization';
import { useForm, useFormState } from 'react-final-form';
import { Gap, Horizon, PrimaryButton, RegularButton, Box } from '@platform/ui';
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
  const { submitting, values } = useFormState();

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
        <PrimaryButton extraSmall dimension="SM" disabled={submitting} onClick={handleApply}>
          {locale.scroller.filter.buttons.applyFilters}
        </PrimaryButton>
        <Gap />

        <RegularButton extraSmall dimension="SM" disabled={submitting} onClick={handleCancel}>
          {locale.scroller.filter.buttons.reset}
        </RegularButton>
      </Horizon>
    </Box>
  );
};

FilterFooter.displayName = 'FilterFooter';