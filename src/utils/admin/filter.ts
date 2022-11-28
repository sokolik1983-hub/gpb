import type { IFilters } from '@platform/core';

/**
 * Получить фильтр счетов по переданной подстроке.
 *
 * @param value - Подстрока запроса.
 */
export const getAccountSearchFilter = (value: string): IFilters => {
  const formattedValue = value.replace(/\./g, '');
  const onlyDigit = /^\d+$/.test(formattedValue);

  return onlyDigit
    ? {
        accountNumber: {
          value: formattedValue,
          condition: 'contains',
          fieldName: 'accountNumber',
        },
      }
    : {
        clientFullName: {
          value: formattedValue,
          condition: 'contains',
          fieldName: 'clientFullName',
        },
      };
};

/**
 * Получить фильтр организаций по переданной подстроке.
 *
 * @param value - Подстрока поиска.
 */
export const getOrganizationSearchFilter = (value: string): IFilters => {
  const onlyDigit = /^\d+$/.test(value);

  return onlyDigit
    ? {
        innKio: {
          value,
          condition: 'contains',
          fieldName: 'innKio',
        },
      }
    : {
        fullName: {
          value,
          condition: 'contains',
          fieldName: 'fullName',
        },
      };
};

/**
 * Получить фильтр филиалов по переданной подстроке.
 *
 * @param value - Подстрока поиска.
 */
export const getBranchSearchFilter = (value: string): IFilters => {
  const onlyDigit = /^\d+$/.test(value);

  return onlyDigit
    ? {
        absNumber: {
          value,
          condition: 'contains',
          fieldName: 'absNumber',
        },
      }
    : {
        filialName: {
          value,
          condition: 'contains',
          fieldName: 'filialName',
        },
      };
};
