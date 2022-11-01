import type { ClosedDay } from 'interfaces/admin';

/**
 * Мап dto в представление закрытых дней.
 *
 * @param closedDays - Список закрытых дней.
 */
export const mapDtoToViewForClosedDays = (closedDays: ClosedDay[]): ClosedDay[] => [...closedDays];
