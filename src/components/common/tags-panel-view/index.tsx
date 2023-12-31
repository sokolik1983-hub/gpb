import type { MouseEvent } from 'react';
import React from 'react';
import cn from 'classnames';
import { locale } from 'localization';
import { noop } from 'utils/common';
import type { IOption } from '@platform/ui';
import { Typography, Horizon, Box, Gap, ServiceIcons, ROLE } from '@platform/ui';
import { ItemWithRestInPopUp } from '../item-with-rest-in-pop-up';
import css from './styles.scss';

/** Свойства компонента Tag. */
interface ITagProps extends IOption<string[] | string> {
  /** Обработчик удаления тега. */
  onRemoveTag(): void;
  /** Обработчик клика. */
  onClick?(): void;
}

/** Тег фильтра. */
const Tag: React.FC<ITagProps> = ({ value, label, onRemoveTag, onClick = noop, disabled }) => {
  const handleRemoveClick = (e: MouseEvent) => {
    e.stopPropagation();
    onRemoveTag();
  };

  return (
    <Box clickable className={css.tag} radius="MAX" role={ROLE.BUTTON} onClick={onClick}>
      <Horizon align="CENTER">
        <Typography.P line="NOWRAP">{label}</Typography.P>
        <Gap.X2S />
        <Box className={css.valueWrapper}>
          <ItemWithRestInPopUp component={Typography.P} items={Array.isArray(value) ? value : [value]} />
        </Box>
        <Gap.XS />
        {!disabled && <ServiceIcons.Close clickable fill="ACCENT" scale="SM" onClick={handleRemoveClick} />}
      </Horizon>
    </Box>
  );
};

Tag.displayName = 'Tag';

/** Свойства компонента TagsPanelView. */
interface ITagsPanelViewProps<FormState> {
  /** Теги. */
  tags: IOption[];
  /** Обработчик удаления тегов. */
  onRemoveTags(): void;
  /** Обработчик удаления тега.
   *
   * @param key Наименование поля, к которому относится тег.
   */
  onRemoveTag(key: string): void;
  /** Обработчик клика по тегу. */
  onTagClick?(): void;
  /**
   * Форматирует значения формы фильтрации для отображения в тегах.
   *
   * @param key - Имя поля в стейте формы.
   * @param values - Стейт формы.
   */
  tagValueFormatter(key: string, values: Record<string, any>): string[] | string;
  /** Значения полей формы фильтра. */
  values: FormState;
}

/** Панель тегов фильтра. */
export const TagsPanelView = <FormState,>({
  onRemoveTag,
  onRemoveTags,
  onTagClick = noop,
  tags,
  tagValueFormatter,
  values,
}: ITagsPanelViewProps<FormState>) => {
  /** Удаление одного тега. */
  const handleRemoveTag = (key: string) => () => onRemoveTag(key);

  return (
    <Box className={css.tagsWrapper} data-name={'tags'} role={ROLE.PANEL}>
      {tags.map(({ value: key, label, disabled }) => {
        const value = tagValueFormatter(key, values);

        return (
          <>
            <Tag key={label} disabled={disabled} label={label} value={value} onClick={onTagClick} onRemoveTag={handleRemoveTag(key)} />
            <Gap.XS />
          </>
        );
      })}
      <Box clickable className={cn(css.tag, css.tagBtn)} radius="MAX" onClick={onRemoveTags}>
        {locale.scroller.tags.labels.resetAll}
      </Box>
    </Box>
  );
};

TagsPanelView.displayName = 'TagsPanelView';
