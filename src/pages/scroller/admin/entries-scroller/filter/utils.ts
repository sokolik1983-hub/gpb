import type { IClientBankResponseDto } from 'interfaces/dto/admin';
import { parseCounterparty } from 'utils/common';
import type { IBankClient, IBankClientFieldData } from './interfaces';

/**
 * Преобразовывает список пар "Клиент банка"-"Счёт клиента" в отдельные массивы уникальных значений для фильтров.
 * */
export const mapClientBankResponseToFieldData = (response: IClientBankResponseDto[]) =>
  response.reduce<IBankClientFieldData>(
    ({ bankClients, accounts }, bankClient) => {
      if (!bankClients.some(value => value.inn === bankClient.inn)) {
        bankClients.push({
          inn: bankClient.inn,
          name: bankClient.name,
        });
      }

      if (!accounts.includes(bankClient.accountNumber)) {
        accounts.push(bankClient.accountNumber);
      }

      return { bankClients, accounts };
    },
    { bankClients: [], accounts: [] }
  );

export const bankClientFieldFormatter = (value: unknown): IBankClient[] => {
  // Присвоение делается для улучшения типизации т.к. параметр функции не удаётся типизировать.
  const selectedCounterparties = value as string[];

  return selectedCounterparties.map(item => parseCounterparty(item));
};
