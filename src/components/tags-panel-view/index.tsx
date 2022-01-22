import type { FC, MouseEvent } from 'react';
import React from 'react';
import cn from 'classnames';
import { locale } from 'localization';
import { useForm } from 'react-final-form';
import { noop } from 'utils';
import type { IOption } from '@platform/ui';
import { Typography, Horizon, Box, Gap, ServiceIcons } from '@platform/ui';
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
    <Box clickable className={css.tag} radius="MAX" onClick={onClick}>
      <Horizon align="CENTER">
        <Typography.P line="NOWRAP">{label}</Typography.P>
        <Gap.X2S />
        <ItemWithRestInPopUp component={Typography.P} items={Array.isArray(value) ? value : [value]} />
        <Gap.XS />
        {!disabled && <ServiceIcons.Close clickable fill="ACCENT" scale="SM" onClick={handleRemoveClick} />}
      </Horizon>
    </Box>
  );
};

Tag.displayName = 'Tag';

/** Свойства компонента TagsPanelView. */
interface ITagsPanelViewProps {
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
}

/** Панель тегов фильтра. */
export const TagsPanelView: FC<ITagsPanelViewProps> = ({ tags, onRemoveTags, onRemoveTag, onTagClick = noop, tagValueFormatter }) => {
  const { getState, change } = useForm();

  const { values } = getState();

  const handleRemoveTag = (key: string) => () => {
    change(key);
    onRemoveTag(key);
  };

  return (
    <Box className={css.tagsWrapper}>
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
