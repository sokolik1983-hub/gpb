import { useMemo, useState } from 'react';
import { useAccountTypes as useAccountTypesByFilter } from 'hooks/admin';
import { getAccountTypeOption } from 'pages/form/admin/views/statement-request/components';
import type { IFilters } from '@platform/core';
import type { IOption } from '@platform/ui';

/** Выходные данные хука useAccountTypes. */
interface UseAccountTypesResponse {
  /** Список опций выбора типов счетов. */
  options: IOption[];
  /** Метод установки зависимых кодов типов счетов. */
  setDependentCodes(codes: number[]): void;
}

/** Хук изменения списка выбора типов счетов. */
export const useAccountTypes = (): UseAccountTypesResponse => {
  const [dependentCodes, setDependentCodes] = useState<number[]>([]);

  const filter: IFilters =
    dependentCodes.length > 0
      ? { code: { condition: 'in', value: dependentCodes, fieldName: 'code' } }
      : ((undefined as unknown) as IFilters);

  const { data: accountTypes } = useAccountTypesByFilter(filter);

  // Исключить карточный счет. Код 5.
  const options = useMemo(() => accountTypes.filter(({ code }) => code !== 5).map(getAccountTypeOption), [accountTypes]);

  return {
    options,
    setDependentCodes,
  };
};
