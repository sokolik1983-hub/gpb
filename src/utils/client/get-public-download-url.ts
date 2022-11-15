/** Возвращает ссылку для скачивания файла. */
export const getPublicDownloadUrl = (token: string) => `/api/filestorage/external/public/download?token=${token}`;
