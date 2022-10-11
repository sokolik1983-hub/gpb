/** Ответ, содержащий файл и информацию о нем. */
export interface IFileDataResponse {
  /** MIME-тип. */
  mimeType: string;
  /** Контент в base64. */
  content: string;
  /** Имя формируемого файла. */
  fileName: string;
}
