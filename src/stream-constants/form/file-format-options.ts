import { FORMAT } from 'interfaces/common';
import { locale } from 'localization';

/** Опций форматов файла выписки. */
export const fileFormatOptions = [
  { label: locale.common.fileFormat.C1, value: FORMAT.C1 },
  { label: locale.common.fileFormat.TXT, value: FORMAT.TXT },
  { label: locale.common.fileFormat.PDF, value: FORMAT.PDF },
  { label: locale.common.fileFormat.EXCEL, value: FORMAT.EXCEL },
];
