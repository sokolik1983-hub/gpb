import { extToMimeType } from '@platform/services/client';

/**
 * Копии платформенных методов с исправлениями багов в стриме.
 */

/**
 * Открывается окно с возможностью печати документа.
 * В IE появляется окно с кнопками 'Открыть', 'Сохранить' документ (метод msSaveOrOpenBlob).
 *
 * @param base64 - Закодированная строка.
 * @param extension - Расширение файла.
 */
export const printBase64 = (base64: string, extension: string) => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: extToMimeType(extension),
  });

  if (window.navigator && 'msSaveOrOpenBlob' in window.navigator) {
    window.navigator.msSaveOrOpenBlob(blob);
  } else {
    const fileURL = URL.createObjectURL(blob);
    const fileWindow = window.open(fileURL);

    fileWindow!.focus();
    fileWindow!.print();
  }
};
