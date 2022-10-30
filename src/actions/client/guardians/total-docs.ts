/**
 * Гард проверки количества документов.
 *
 * @param args - Аргументы гарда.
 *
 * @throws Error.
 */
export const totalDocs = (...args) => {
  const arrArgs = [...args];

  if (Number(arrArgs[3]) > 500) {
    throw new Error('UNAVAILABLE_EXPORT_DOCUMENT');
  }
};
