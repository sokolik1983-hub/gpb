/** Интерфейс для "Универсального дерева". */
export interface ITreeNode {
  /** Вернуть индекс дочернего узла. */
  getChildIndex(nodeId: string): number;
  /** Вернуть дочерние узлы. */
  getChildren(): Map<string, ITreeNode>;
  /** Вернуть массив дочерних узлов. */
  getChildrenAsArray(): ITreeNode[];
  /** Метод возвращает родительский узел. */
  getParent(): ITreeNode | null;
  /** Метод устанавливает новый родительский узел. */
  setParent(parent: ITreeNode | null): void;
  /** Метод возвращает идентификатор узла. */
  getNodeId(): string;
  /** Метод возвращает порядковый номер узла. */
  getOrder(): number;
  /** Метод устанавливает порядковый номер узла. */
  setOrder(order: number): void;
  /** Метод возвращает тип узла. */
  getType(): string | null;
  /** Метод устанавливает тип узла. */
  setType(type: string | null): void;
  /** Метод добавляет узел в нобар дочерних узлов. */
  appendChildNode(node: ITreeNode, type: string | null): ITreeNode;
  /** Метод создает узел. */
  createChildNode(nodeId: string, type: string | null): ITreeNode;
  /** Метод удаяет дочерний узел по его идентификатору. */
  removeChildNodeById(nodeId: string): ITreeNode | null;
  /** Метод выполняет поиск узла по его идентификатору (через рекурсивный обход). */
  findNodeById(nodeId: string): ITreeNode | null;
  /** Метод для рекурсивного обхода дерева. */
  traverse(cb: (node: ITreeNode) => boolean): ITreeNode | null;
}

/** Структура данных "Универсальное дерево" для решаемой задачи. */
export class GenericTree implements ITreeNode {
  children = new Map<string, ITreeNode>();
  parent: ITreeNode | null = null;
  nodeId: string;
  order: number = 0;
  type: string | null = null;

  constructor(treeId) {
    this.nodeId = treeId;
  }

  getChildIndex(nodeId: string) {
    return this.getChildrenAsArray().findIndex(x => x.getNodeId() === nodeId);
  }

  getChildren() {
    return this.children;
  }

  getChildrenAsArray() {
    return Array.from(this.children.values());
  }

  getParent() {
    return this.parent;
  }

  setParent(parent: ITreeNode | null) {
    this.parent = parent;
  }

  getNodeId() {
    return this.nodeId;
  }

  getOrder() {
    return this.order;
  }

  setOrder(order: number) {
    this.order = order;
  }

  getType() {
    return this.type;
  }

  setType(type: string | null) {
    this.type = type;
  }

  appendChildNode(node: ITreeNode, type: string | null) {
    const newNode = new GenericTree(node.getNodeId());

    newNode.parent = this;
    newNode.children = new Map(node.getChildren());
    newNode.order = this.getChildrenAsArray().length;
    newNode.type = type;

    this.children.set(node.getNodeId(), newNode);

    return newNode;
  }

  createChildNode(nodeId: string, type: string | null) {
    const newNode = new GenericTree(nodeId);

    newNode.parent = this;
    newNode.order = this.getChildrenAsArray().length;
    newNode.type = type;

    this.children.set(nodeId, newNode);

    return newNode;
  }

  removeChildNodeById(nodeId: string) {
    for (const child of this.getChildrenAsArray()) {
      if (child.getNodeId() === nodeId) {
        this.children.delete(child.getNodeId());
        child.setParent(null);

        return child;
      }
    }

    return null;
  }

  findNodeById(nodeId: string) {
    // функция для определения найден ли узел через сравнение с очередным узлом при обходе
    const checkNode = (node: ITreeNode) => node.getNodeId() === nodeId;

    if (nodeId === this.nodeId) {
      return this;
    }

    return this.traverse(checkNode);
  }

  traverse(cb: (node: ITreeNode) => boolean) {
    for (const child of this.getChildrenAsArray()) {
      if (cb(child)) {
        return child;
      }

      const foundNode = child.traverse(cb);

      if (foundNode) {
        return foundNode;
      }
    }

    return null;
  }
}
