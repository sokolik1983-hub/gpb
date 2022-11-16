/** Фаза закрытия. */
import type { IBaseEntity } from '@platform/services/admin';

interface ClosingPhase {
  /** Дата закрытия фазы. */
  date: string;
  /** Идентификатор сообщения от Ф1. */
  messageId: string;
  /** Время закрытия фазы. */
  time: string;
}

/** Дто ответа сервера по закрытому дню. */
export interface ClosedDayResponseDto {
  /** Код филиала. */
  branchCode: string;
  /** Наименование филиала. */
  branchName: string;
  /** Операционная дата. */
  operationDate: string;
  /** Дата и время записи о закрытии второй фазы. */
  secondPhaseClosingTime: string;
  /** Идентификатор сообщения от Ф1 о закрытии второй фазы. */
  secondPhaseMessageId: string;
  /** Дата и время записи о закрытии третьей фазы. */
  thirdPhaseClosingTime: string;
  /** Идентификатор сообщения от Ф1 о закрытии третьей фазы. */
  thirdPhaseMessageId: string;
}

/** Строка таблицы закрытого дня. */
export interface ClosedDayRow extends IBaseEntity, Pick<ClosedDayResponseDto, 'operationDate'> {
  branch: {
    code: string;
    name: string;
  };
  /** Вторая фаза закрытия. */
  secondPhase?: ClosingPhase;
  /** Третья фаза закрытия. */
  thirdPhase?: ClosingPhase;
}
