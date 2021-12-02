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
