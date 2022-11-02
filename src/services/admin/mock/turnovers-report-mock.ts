import { FORMAT } from 'interfaces';
import type { IFileDataResponse } from 'interfaces/admin';
import type { IServerDataResp } from '@platform/services/admin';

/** Заглушка с пустым контентом для отчета с остатками и оборотами. */
export const getTurnoversReportMock = (format: FORMAT.EXCEL | FORMAT.PDF): Promise<IServerDataResp<IFileDataResponse>> =>
  Promise.resolve({
    data: {
      content: '',
      mimeType: format === FORMAT.PDF ? 'application/pdf' : 'application/vnd.ms-excel',
      fileName: '',
    },
  });
