import type { ServiceBranch } from 'interfaces/admin';

/**
 * Мап dto в представление подразделений обслуживания.
 *
 * @param serviceBranches - Список подразделений обслуживания.
 */
export const mapDtoToViewForServiceBranchList = (serviceBranches: ServiceBranch[]): ServiceBranch[] =>
  serviceBranches.map(({ filialName, id }) => ({ filialName, id }));