import type { Branch } from 'interfaces/admin';

/**
 * Мап dto в представление подразделений обслуживания.
 *
 * @param serviceBranches - Список подразделений обслуживания.
 */
export const mapDtoToViewForServiceBranchList = (serviceBranches: Branch[]): Branch[] =>
  serviceBranches.map(({ absNumber, filialName, id }) => ({ absNumber, filialName, id }));
