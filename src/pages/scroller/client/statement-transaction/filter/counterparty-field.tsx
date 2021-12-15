import type { FC } from 'react';
import React, { useMemo, useCallback } from 'react';
import type { IGetCounterpartiesResponseDto } from 'interfaces/client';
import { locale } from 'localization';
import type { IOptionTemplateProps, IOption } from '@platform/ui';
import { Fields, Box, Option, Typography } from '@platform/ui';

/** Опция селекта выбора контрагентов. */
export interface ICounterpartyOption extends IOption<string> {
  /** ИНН контрагента. */
  inn: string;
}

/** Опция выпадающего списка выбора контрагента. */
export const CounterpartyOption = React.forwardRef<typeof Option, IOptionTemplateProps<ICounterpartyOption>>(
  ({ option, customLabel, ...rest }, ref) => {
    const { label, inn } = option;

    return (
      <Option
        {...rest}
        ref={ref}
        customLabel={
          <Box>
            <Typography.P>{label}</Typography.P>
            <Typography.SmallText fill={'FAINT'}>{locale.transactionsScroller.labels.counterpartyInn({ inn })}</Typography.SmallText>
          </Box>
        }
        option={option}
      />
    );
  }
);

CounterpartyOption.displayName = 'CounterpartyOption';

/**
 * Возвращает опцию.
 *
 * @param counterparty - Контрагент.
 */
const getCounterpartyOption = (counterparty: IGetCounterpartiesResponseDto): ICounterpartyOption => {
  const { id, inn, name } = counterparty;

  return {
    value: id,
    label: name, // Значение будет отображаться в лейбле тега выбранного значения.
    inn,
  };
};

/** Свойства компонента CounterpartyField. */
export interface ICounterpartyFieldProps {
  /** Путь до поля в форме. */
  name: string;
  /** Контрагенты. */
  counterparties: IGetCounterpartiesResponseDto[];
}

/** Селект контрагента. */
export const CounterpartyField: FC<ICounterpartyFieldProps> = ({ name, counterparties }) => {
  const options = useMemo(() => counterparties.map(counterparty => getCounterpartyOption(counterparty)), [counterparties]);

  const filterFn = useCallback(
    (searchValue: string) => {
      if (!searchValue) {
        return options;
      }

      const filtered = options.filter(option => {
        const { label, inn } = option;

        const searchValueLowerCase = searchValue.toLocaleLowerCase();

        return label?.toLocaleLowerCase().includes(searchValueLowerCase) || inn?.toLocaleLowerCase().includes(searchValueLowerCase);
      });

      return filtered;
    },
    [options]
  );

  return <Fields.MultiSelect extraSmall withSearch filterFn={filterFn} name={name} optionTemplate={CounterpartyOption} options={options} />;
};

CounterpartyField.displayName = 'CounterpartyField';
