/** Обработчик события onChange. */
export type ChangeFieldHandler<T> = (arg: { value: T }) => void;

/** Делает обязательными, указанные поля в объекте. */
export type FieldsRequired<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;
