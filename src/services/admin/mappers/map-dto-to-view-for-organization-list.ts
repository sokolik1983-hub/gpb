import type { Organization } from 'interfaces/admin';

/**
 * Мап dto в представление организаций.
 *
 * @param organizations - Список организаций.
 */
export const mapDtoToViewForOrganizationList = (organizations: Organization[]): Organization[] =>
  organizations.map(({ fullName, id, innKio, shortName }) => ({ fullName, id, innKio, shortName }));
