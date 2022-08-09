import React, { useCallback, useMemo, useState } from 'react';
import cn from 'classnames';
import { useForm } from 'react-final-form';
import type { WebIcon, IOption } from '@platform/ui';
import { Box, FILL, SHADOW, RADIUS, RADIUS_APPLY, ROLE, Fields } from '@platform/ui';
import { OptionsList } from './options-list';
import css from './style.scss';

/**
 * Свойства компонента InputWithSearchHistory.
 */
interface IInputWithSearchHistory {
  /** Наименование поля. */
  name: string;
  /** Опции истории. */
  options: IOption[];
  /** Шаблон для опции. */
  optionTemplate?: React.FC<{ option: IOption }>;
  /** Иконка в инпут. */
  icon?: WebIcon;
  /** Placeholder инпута. */
  placeholder?: string;
  /** Обработчик нажатия на иконку. */
  onIconClick?(): void;
  /** Колбэк по клику на option. */
  onChange?(value: string): void;
  /** Обработчик потери фокуса на поле. */
  onBlur?(currentValue: IOption): void;
  /** Обработчик нажатия на опцию. */
  onSelectOption?(option: IOption): void;
}

/** Компонент "Ввод с историей". */
export const InputWithHistory: React.FC<IInputWithSearchHistory> = ({
  onChange,
  onBlur,
  name,
  optionTemplate,
  placeholder,
  onIconClick,
  icon,
  options,
  onSelectOption,
}) => {
  const { focus } = useForm();

  const [searchValue, setSearchValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const handleBlur = useCallback(() => {
    setIsFocus(false);

    if (onBlur) {
      onBlur({ value: searchValue, label: searchValue });
    }
  }, [onBlur, searchValue]);

  const handleFocus = useCallback(() => {
    setIsFocus(true);

    focus(name);
  }, [focus, name]);

  const onChangeInput = useCallback(
    ({ value }: { value: string }) => {
      setSearchValue(value);

      if (onChange) {
        onChange(value);
      }
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isFocus && e.code === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleSelectOption = useCallback(
    (option: IOption) => {
      onChangeInput({ value: option.value });

      if (onSelectOption) {
        onSelectOption(option);
      }
    },
    [onChangeInput, onSelectOption]
  );

  const showOptions = useMemo(() => isFocus && options.length > 0, [isFocus, options]);

  return (
    <Box className={css.container}>
      <Fields.Text
        extraSmall
        icon={icon}
        name={name}
        placeholder={placeholder}
        onBlur={handleBlur}
        onChange={onChangeInput}
        onFocus={handleFocus}
        onIconClick={onIconClick}
        onKeyPress={handleKeyDown}
      />
      {showOptions && (
        <Box
          className={cn(css.optionsContainer)}
          fill={FILL.BASE}
          radius={[RADIUS.LG, RADIUS_APPLY.ALL]}
          role={ROLE.MENU}
          shadow={SHADOW.LG}
          shadowInner={SHADOW.SM}
        >
          <OptionsList optionTemplate={optionTemplate} options={options} onSelectOption={handleSelectOption} />
        </Box>
      )}
    </Box>
  );
};

InputWithHistory.displayName = 'InputWithHistory';
