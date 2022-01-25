import type { Sorting, IPagination } from 'interfaces';
import type { IGetCounterpartiesResponseDto } from 'interfaces/client';
import type { Column } from 'react-table';
import { SORT_DIRECTION } from '@platform/core';
import type { IMetaData } from '@platform/services';
import type { IOption } from '@platform/ui';

/**
 * Упорядочивает тети формы фильтрации (в частности чтобы тэг "дата по" не располагался перед тегом "дата от").
 *
 * @param tags - Тэги которые надо упорядочить.
 * @param tagsOrder - Массив задающий порядок тегов. Элементы массива - это имена полей формы фильтрации.
 */
export const orderTags = (tags: Array<IOption<string>>, tagsOrder: string[]): Array<IOption<string>> => {
  const tagsByTagValue = tags.reduce<Record<string, IOption<string>>>((acc, tag) => {
    acc[tag.value] = tag;

    return acc;
  }, {});

  const orderedTags: Array<IOption<string>> = [];

  tagsOrder.forEach(tagValue => {
    if (tagsByTagValue[tagValue]) {
      orderedTags.push(tagsByTagValue[tagValue]);
    }
  });

  return orderedTags;
};

/**
 * Преобразует стейт сортировки таблицы, в форму подходящую для запроса на сервер.
 *
 * @param sorting - Стейт сортировки таблицы.
 */
export const convertTableSortingToMetaData = (sorting: Sorting): IMetaData['sort'] =>
  sorting.reduce((acc, item) => {
    acc[item.id] = item.desc ? SORT_DIRECTION.DESC : SORT_DIRECTION.ASC;

    return acc;
  }, {});

/**
 * Преобразует стейт пагинации таблицы, в форму подходящую для запроса на сервер.
 *
 * @param param - Стейт пагинации таблицы.
 * @param param.pageSize - Количество записей на странице.
 * @param param.pageIndex - Номер текущей страницы. Нумерация начинается с нуля.
 */
export const convertTablePaginationToMetaData = ({ pageSize, pageIndex }: IPagination): Pick<IMetaData, 'offset' | 'pageSize'> => ({
  pageSize,
  offset: pageSize * pageIndex,
});

/**
 * Сериализует сущность контрагента. Это нужно потому, что у контр агента нет идентификатора.
 * Преобразование в массив используется чтобы, гарантировать порядок полей.
 *
 * @param counterparty - Контрагент.
 */
export const stringifyCounterparty = (counterparty: IGetCounterpartiesResponseDto): string => {
  const { inn, name } = counterparty;

  return JSON.stringify([inn, name]);
};

/**
 * Восстанавливает контрагента из сериализованного значения.
 *
 * @param stringifiedCounterparty - Сериализованый контрагент.
 */
export const parseCounterparty = (stringifiedCounterparty: string): IGetCounterpartiesResponseDto => {
  const [inn, name] = JSON.parse(stringifiedCounterparty);

  return { inn, name };
};

/**
 * Добавляет поле maxWidth в конфиг колонки таблицы.
 * Если этого не делать, то react-table в IE рассчитывает ширину колонки как "NaNpx".
 *
 * @param columns - Конфиги колонок таблицы.
 * @returns - Конфиги колонок таблицы с дефолтными полями.
 */
export const addMaxWidthField = <T extends Record<string, any>>(columns: Array<Column<T>>): Array<Column<T>> =>
  columns.map(column => ({
    maxWidth: Number.POSITIVE_INFINITY,
    ...column,
  }));
