import { useEffect, useMemo } from 'react';
import { useForm } from 'react-final-form';
import { compareStrings } from 'utils/common';
import type { IAccountV2 } from '@platform/services/client/dist-types/interfaces/entities';
import type { IOption } from '@platform/ui';

/** Параметры выходящих данных хука useCheckedScheduleLabels. */
interface IUseCheckedScheduleLabels {
  label: string;
  value: string;
}

/** Хук возвращающий отсортированные опции и при начальной загрузке, если ничего не выбрано, то выбираются все значения. */
export const useCheckedScheduleLabels = (
  accounts: IAccountV2[],
  name: string,
  getOption: ({ id, accountNumber, bankClient: { emails, shortName, fullName } }: IAccountV2) => IOption
): IUseCheckedScheduleLabels[] => {
  const { change, getFieldState } = useForm();

  const sortedOptions = useMemo(() => accounts.map(account => getOption(account)).sort((a, b) => compareStrings(a.label, b.label)), [
    accounts,
    getOption,
  ]);

  useEffect(() => {
    // Значение поля получается внутри хука, чтобы избежать циклического рендера
    const { value = [] } = getFieldState(name) ?? {};

    // При первоначальной загрузке, если ничего не выбрано, то выбираются все значения.
    if (value.length === 0 && accounts.length > 0) {
      change(
        name,
        accounts.map(item =>
          name === 'email' ? item.bankClient.emails?.toString() : item.bankClient.shortName || item.bankClient.fullName
        )
      );
    }
  }, [accounts, change, getFieldState, name]);

  return sortedOptions;
};
