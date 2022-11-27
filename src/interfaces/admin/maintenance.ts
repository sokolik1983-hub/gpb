import type { MAINTENANCE_TYPE } from 'interfaces/admin/maintenance-type';
import type { IBaseEntity } from '@platform/services/admin';

/** Дто ответа технических работ. */
export interface MaintenanceResponseDto {
  /** Время создания. */
  creationTime: string;
  /** Статус работ. */
  maintenanceTypeDto: MAINTENANCE_TYPE;
}

/** Технические работы. */
export interface MaintenanceRow extends IBaseEntity {
  /** Дата создания. */
  creationDate: {
    /** Дата. */
    date: string;
    /** Время. */
    time: string;
  };
  /** Статус работ. */
  maintenanceType: MAINTENANCE_TYPE;
}
