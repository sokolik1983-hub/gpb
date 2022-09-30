import { createContext } from 'react';
import { noop } from 'utils/common';
import type { ITreeNode } from './generic-tree';
import type { NODE_TYPE } from './node-type';

/** Интерфейс для контекста. */
export interface IFocusTreeContext {
  /** Структура данных для древовидного представления узлов соответствующих компонентов. */
  tree: ITreeNode | null;
  /** Текущий узел, на котором установлен фокус. */
  current: ITreeNode | null;
  /** Метод для установки текущего узла. */
  setCurrent(current: ITreeNode | null): void;
  /** Примонтировать (добавить в древовидное представление) узел. */
  mountNode(nodeId: string, parentId: string | null, type?: NODE_TYPE): ITreeNode;
  /** Размонтировать (исключить из древовидного представления) узел. */
  unmountNode(node: ITreeNode): void;
  /** Перейти на следующий соседний (для указанного расположения) узел. */
  goNextNode(type?: NODE_TYPE): void;
  /** Перейти на предыдущий соседний (для указанного расположения) узел. */
  goPrevNode(type?: NODE_TYPE): void;
  /** Перейти на дочерний узел с указанном индексом. */
  goChildNodeByIndex(index: number): void;
  /** Вернуться на родительский узел. */
  goParentNode(): void;
  /** Установить фокус на узле с некоторым идентификатором. */
  focusNode(nodeId: string): void;
  /** Признак находится ли фокус внутри узла на каком-то из его дочерни элементов. */
  insideNode: boolean;
  /** Метод установки признака фокуса дочернего элемента. */
  setInsideNode(insideNode: boolean): void;
}

/** Начальное значение контекста. */
const defaultValue: IFocusTreeContext = {
  tree: null,
  current: null,
  setCurrent: noop,
  mountNode: noop,
  unmountNode: noop,
  goChildNodeByIndex: noop,
  goParentNode: noop,
  goNextNode: noop,
  goPrevNode: noop,
  focusNode: noop,
  insideNode: false,
  setInsideNode: noop,
};

/** Экземпляр контекста. */
export const FocusTreeContext = createContext<IFocusTreeContext>(defaultValue);
