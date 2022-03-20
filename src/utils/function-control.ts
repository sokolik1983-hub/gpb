import { getAuthItem } from '@platform/services';

/**
 * Проверка доступности функции.
 * (упрощенный вариант одноименной платформенной функции по https://confluence.gboteam.ru/pages/viewpage.action?pageId=6363237).
 *
 * @param authority Привилегия.
 */
export const isFunctionAvailability = (authority: string) => getAuthItem('authorities').includes(authority);
