import type { FC } from 'react';
import React, { useCallback, useMemo } from 'react';
import { CounterpartyOption } from 'components/common/counterparty-field/counterparty-option';
import { getCounterpartyOption } from 'components/common/counterparty-field/utils';
import type { Counterparty } from 'interfaces/common';
import { Fields } from '@platform/ui';

/** Свойства компонента выбора из списка контрагента. */
interface CounterpartyFieldProps {
  /** Контрагенты. */
  counterparties: Counterparty[];
  /** Имя поля формы. */
  name: string;
}

/** Компонент выбора из списка контрагента. */
export const CounterpartyField: FC<CounterpartyFieldProps> = ({ counterparties, name }) => {
  const options = useMemo(() => counterparties.map(counterparty => getCounterpartyOption(counterparty)), [counterparties]);

  const filterFn = useCallback(
    (searchValue: string) => {
      if (!searchValue) {
        return options;
      }

      return options.filter(option => {
        const { label, inn } = option;

        const searchValueLowerCase = searchValue.toLocaleLowerCase();

        return label?.toLocaleLowerCase().includes(searchValueLowerCase) || inn?.toLocaleLowerCase().includes(searchValueLowerCase);
      });
    },
    [options]
  );

  return <Fields.MultiSelect extraSmall withSearch filterFn={filterFn} name={name} optionTemplate={CounterpartyOption} options={options} />;
};

CounterpartyField.displayName = 'CounterpartyField';
