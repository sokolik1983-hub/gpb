import React from 'react';
import { locale } from 'localization';
import { Gap, Horizon, PrimaryButton, RegularButton, Box, ACTIONS } from '@platform/ui';
import css from './styles.scss';

/** Интерфейс футера фильтра. */
interface IFooterProps {
  /** Обработчик клика по кнопке "сбросить". */
  onReset(): void;
  /** Обработчик клика по кнопке "применить фильтры". */
  onApply(formValues): void;
  /** Признак недоступности кнопок. */
  disabled: boolean;
}

/** Футер фильтра скроллера. */
export const FilterFooter: React.FC<IFooterProps> = ({ onReset, onApply, disabled }) => (
  <Box className={css.footerWrapper}>
    <Horizon>
      <PrimaryButton extraSmall dataAction={ACTIONS.SUBMIT} dimension="SM" disabled={disabled} onClick={onApply}>
        {locale.scroller.filter.buttons.applyFilters}
      </PrimaryButton>
      <Gap />

      <RegularButton extraSmall data-action={ACTIONS.CANCEL} dimension="SM" disabled={disabled} onClick={onReset}>
        {locale.scroller.filter.buttons.reset}
      </RegularButton>
    </Horizon>
  </Box>
);

FilterFooter.displayName = 'FilterFooter';
