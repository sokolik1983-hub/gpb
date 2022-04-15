/** Создает тип, устанавливающий переданное свойсво, являющееся ключом типа `Type`, необязательным. */
export type Optional<Type, K extends keyof Type> = Omit<Type, K> & Pick<Partial<Type>, K>;
