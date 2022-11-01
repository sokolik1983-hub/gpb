import type { ServiceBranch } from 'interfaces/admin/service-branch';

/** Фаза закрытия. */
interface ClosingPhase {
  /** Дата и время закрытия. */
  date: string;
  /** Идентификатор сообщения от Ф1. */
  messageId: string;
}

/** Филиал. */
interface Branch extends ServiceBranch {
  /** Код. */
  code: string;
}

/** Закрытый день. */
export interface ClosedDay {
  /** Филиал. */
  branch: Branch;
  /** Операционная дата. */
  operationDate: string;
  /** Вторая фаза. */
  secondPhase: ClosingPhase;
  /** Третья фаза. */
  thirdPhase: ClosingPhase;
}
