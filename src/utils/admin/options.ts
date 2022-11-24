import type { OrganizationOptionProps } from 'components/common';
import type { Organization } from 'interfaces/admin';

/**
 * Возвращает опцию выбора организации.
 *
 * @param organization - Организация.
 * @param organization.fullName - Полное наименование.
 * @param organization.id - Идентификатор.
 * @param organization.innKio - ИНН.
 * @param organization.shortName - Короткое наименование.
 */
export const getOrganizationOption = ({ fullName, id, innKio, shortName }: Organization): OrganizationOptionProps => ({
  inn: innKio,
  label: shortName || fullName,
  value: id,
});
