import { scheduleAccountsData } from 'mocks/schedule-accounts-data';

/** Возвращает список счетов,организаций и почтовых ящиков для селектов . */
export const useScheduleAccounts = () => {
  const data = scheduleAccountsData;

  return { data };
};
