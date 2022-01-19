/**
 * Пустое действие, используется ка заглушка для действий, в процессе разработки.
 */
export const noopAction = {
  action: () => () => Promise.resolve(),
};
