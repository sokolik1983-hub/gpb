import type { CounterpartyOptionProps } from 'components/common/counterparty-field/counterparty-option';
import type { Counterparty } from 'interfaces/common';
import { stringifyCounterparty } from 'utils/common';

/**
 * Возвращает опцию контрагента.
 *
 * @param counterparty - Контрагент.
 * @param counterparty.inn - ИНН контрагента.
 * @param counterparty.name - Наименование контрагента.
 */
export const getCounterpartyOption = ({ inn, name }: Counterparty): CounterpartyOptionProps => ({
  value: stringifyCounterparty({ inn, name }),
  label: name,
  inn,
});
