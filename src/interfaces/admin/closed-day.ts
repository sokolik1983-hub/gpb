import type { ServiceBranch } from 'interfaces/admin/service-branch';
import type { IBaseEntity } from '@platform/services/admin';

/** Дто ответа сервера фазы закрытия. */
interface ClosingPhaseResponseDto {
  /** Дата и время закрытия. */
  date: string;
  /** Идентификатор сообщения от Ф1 о закрытии фазы. */
  messageId: string;
}

/** Фаза закрытия. */
interface ClosingPhase {
  /** Дата закрытия. */
  date: string;
  /** Идентификатор сообщения от Ф1. */
  messageId: string;
  /** Время закрытия. */
  time: string;
}

/** Филиал. */
interface Branch extends ServiceBranch {
  /** Код. */
  code: string;
}

/** Дто ответа сервера по закрытому дню. */
export interface ClosedDayResponseDto extends IBaseEntity {
  /** Филиал. */
  branch: Branch;
  /** Операционная дата. */
  operationDate: string;
  /** Вторая фаза закрытия. */
  secondPhase: ClosingPhaseResponseDto;
  /** Третья фаза закрытия. */
  thirdPhase: ClosingPhaseResponseDto;
}

/** Строка таблицы закрытого дня. */
export interface ClosedDayRow extends ClosedDayResponseDto {
  /** Вторая фаза закрытия. */
  secondPhase: ClosingPhase;
  /** Третья фаза закрытия. */
  thirdPhase: ClosingPhase;
}
