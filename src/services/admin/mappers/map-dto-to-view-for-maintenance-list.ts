import type { MaintenanceResponseDto, MaintenanceRow } from 'interfaces/admin';
import { getDateAndTime } from 'services/admin/mappers/utils';
import { guid } from '@platform/tools/istore';

/**
 * Мап dto в представление технических работ.
 *
 * @param maintenances - Список технических работ.
 */
export const mapDtoToViewForMaintenanceList = (maintenances: MaintenanceResponseDto[]): MaintenanceRow[] =>
  maintenances.map(({ creationTime, maintenanceTypeDto }) => ({
    creationDate: { ...getDateAndTime(creationTime) },
    id: guid(),
    maintenanceType: maintenanceTypeDto,
  }));
