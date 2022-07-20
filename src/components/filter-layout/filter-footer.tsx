import React, { useCallback } from 'react';
import { locale } from 'localization';
import { Gap, Horizon, PrimaryButton, RegularButton, Box, ACTIONS } from '@platform/ui';
import css from './styles.scss';

/** Интерфейс футера фильтра. */
interface IFooterProps {
  /** Обработчик клика по кнопке "сбросить". */
  onReset(): void;
  /** Обработчик клика по кнопке "применить фильтры". */
  onApply(): void;
  /** Признак недоступности кнопки "применить фильтры". */
  disabledApply: boolean;
  /** Признак недоступности кнопки "сбросить". */
  disabledReset: boolean;
}

/** Футер фильтра скроллера. */
export const FilterFooter: React.FC<IFooterProps> = ({ onReset, onApply, disabledApply, disabledReset }) => {
  const handleCancel = useCallback(() => onReset(), [onReset]);

  const handleApply = useCallback(() => onApply(), [onApply]);

  return (
    <Box className={css.footerWrapper}>
      <Horizon>
        <PrimaryButton extraSmall dataAction={ACTIONS.SUBMIT} dimension="SM" disabled={disabledApply} onClick={handleApply}>
          {locale.scroller.filter.buttons.applyFilters}
        </PrimaryButton>
        <Gap />

        <RegularButton extraSmall data-action={ACTIONS.CANCEL} dimension="SM" disabled={disabledReset} onClick={handleCancel}>
          {locale.scroller.filter.buttons.reset}
        </RegularButton>
      </Horizon>
    </Box>
  );
};

FilterFooter.displayName = 'FilterFooter';
