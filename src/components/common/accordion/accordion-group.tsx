import React, { createContext } from 'react';

/**
 * Свойства контекста группы аккордеона.
 */
interface IAccordionContext {
  /**
   * Флаг отключения возможности перехода по элементу списка аккордиона.
   */
  disabled?: boolean;
}

const defaultValues = {
  disabled: false,
};

export const AccordionContext = createContext<IAccordionContext>(defaultValues);

/**
 * Свойства компонента "Группа аккордеона".
 */
interface IAccordionGroup {
  /**
   * Флаг отключения возможности перехода по элементу списка аккордиона.
   */
  disabled?: boolean;
}

/**
 * Компонент "Группа аккордеона".
 */
export const AccordionGroup: React.FC<IAccordionGroup> = ({ children, disabled = false }) => (
  // eslint-disable-next-line react/jsx-no-constructed-context-values
  <AccordionContext.Provider value={{ disabled }}>{children}</AccordionContext.Provider>
);

AccordionGroup.displayName = 'AccordionGroup';
