/** Свойства организации в счете. */
export interface AccountOrganization {
  /** Наименование. */
  name: string;
  /** ИНН. */
  inn: string;
}

/** Свойства организации. */
export interface Organization {
  /** Полное наименование. */
  fullName: string;
  /** Идентификатор. */
  id: string;
  /** ИНН. */
  innKio: string;
  /** Короткое наименование. */
  shortName: string;
}
