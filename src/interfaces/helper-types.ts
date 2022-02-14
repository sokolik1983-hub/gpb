/** Делает обязательными, указанные поля в объекте. */
export type FieldsRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
