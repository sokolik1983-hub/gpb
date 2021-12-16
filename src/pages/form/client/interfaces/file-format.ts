import { FORMAT } from 'interfaces/client/classificators/format';
import { locale } from 'localization';

export const fileFormatOptions = [
  { label: locale.common.fileFormat.C1, value: FORMAT.C1 },
  { label: locale.common.fileFormat.TXT, value: FORMAT.TXT },
  { label: locale.common.fileFormat.PDF, value: FORMAT.PDF },
  { label: locale.common.fileFormat.EXCEL, value: FORMAT.EXCEL },
];
