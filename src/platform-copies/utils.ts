import { callStreamAction } from '@platform/services';

/**
 * Копии платформенных утилит с исправлениями багов в стриме.
 */

/**
 * Открывается окно с возможностью печати документа.
 *
 * @param base64 - Закодированная строка.
 * @param fileName - Наименование файла.
 * @param extension - Расширение файла.
 */
export const printBase64 = async (base64: string, fileName: string, extension: string) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);

  await callStreamAction('pdf-preview', 'previewFile', {
    data: byteArray,
    fileName,
    type: extension,
  });
};
