import { useCallback, useEffect, useRef, useState } from 'react';
import type { IFocusTreeContext } from '../focus-tree-context';
import type { ITreeNode } from '../generic-tree';
import { GenericTree } from '../generic-tree';
import { NODE_TYPE } from '../type';

/** Хук для управления состоянием дерева фокусируемых узлов. */
export const useTree = (treeId: string): IFocusTreeContext => {
  const parents = useRef<Map<string, ITreeNode>>(new Map());
  const tree = useRef<ITreeNode>(new GenericTree(treeId));
  const [current, setCurrent] = useState<ITreeNode | null>(null);

  const focusNode = useCallback((nodeId: string) => {
    const domNode = document.querySelector(`div[data-node-id="${nodeId}"]`) as HTMLDivElement;

    if (!domNode) {
      return;
    }

    domNode.focus();
  }, []);

  const setCurrentAndFocus = useCallback(
    (node: ITreeNode | null) => {
      setCurrent(node);

      if (!node) {
        return;
      }

      focusNode(node.getNodeId());
    },
    [focusNode]
  );

  useEffect(() => {
    setCurrentAndFocus(tree.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // элементы монтируются в обратном порядке (снизу вверх)
  const mountNode = useCallback(
    (nodeId: string, parentId: string | null, type: NODE_TYPE = NODE_TYPE.VERT) => {
      // FIXME алгоритм нужно упростить
      if (parentId) {
        const foundParent = tree.current.findNodeById(parentId);

        // если не нашли parent, то создаем виртуальный parent "на лету"
        // (это нужно сделать из-за особенностей монтирования)
        // позже настоящий parent также будет найден
        // eslint-disable-next-line no-negated-condition
        if (!foundParent) {
          if (!parents.current?.get(parentId)) {
            // создаем виртуальный parent, так его пока нет
            const parentToStore = new GenericTree(parentId);

            parents.current?.set(parentId, parentToStore);

            return parentToStore.createChildNode(nodeId, type);
          }

          // parent прилетел при монтировании
          const existsParentNode = parents.current?.get(parentId);

          return existsParentNode!.createChildNode(nodeId, type);
        }

        if (parents.current?.has(nodeId)) {
          // извлекаем виртуальный parent (это теущий узел)
          const storedParent = parents.current.get(nodeId)!;

          // проставляем нужные ссылки
          storedParent.setParent(foundParent);

          const newNode = foundParent.appendChildNode(storedParent, type);

          parents.current.delete(nodeId);

          return newNode;
        }

        return foundParent.createChildNode(nodeId, type);
      }

      return tree.current.createChildNode(nodeId, type);
    },
    [tree]
  );

  const unmountNode = useCallback(
    (node: ITreeNode) => {
      const parent = node.getParent();

      if (parent) {
        parent.removeChildNodeById(node.getNodeId());
      } else {
        tree.current.removeChildNodeById(node.getNodeId());
      }
    },
    [tree]
  );

  const goChildNodeByIndex = useCallback(
    (index: number) => {
      if (!current) {
        return;
      }

      const children = current.getChildrenAsArray();

      const node = children?.[index];

      if (!node) {
        return;
      }

      setCurrentAndFocus(node);
    },
    [current, setCurrentAndFocus]
  );

  const goParentNode = useCallback(() => {
    if (!current) {
      return;
    }

    if (current.getNodeId() === tree.current.getNodeId()) {
      return;
    }

    const parent = current.getParent();

    if (!parent) {
      return;
    }

    setCurrentAndFocus(parent);
  }, [current, setCurrentAndFocus]);

  const goNextNode = useCallback(
    (type: NODE_TYPE = NODE_TYPE.VERT) => {
      /** Найти ближайший элемент относильно заданного с некоторым типом. */
      const getNextNodeByType = (currentNode: ITreeNode | null, nodeTypeToSearch: NODE_TYPE): ITreeNode | null => {
        if (!currentNode) {
          return null;
        }

        const parentNode = currentNode.getParent();

        if (!parentNode) {
          return null;
        }

        const currentOrder = currentNode.getOrder();
        const children = parentNode.getChildrenAsArray();

        for (let i = currentOrder + 1; i < children.length; i++) {
          if (children?.[i].getType() === nodeTypeToSearch) {
            return children[i];
          }
        }

        return null;
      };

      const nextNode = getNextNodeByType(current, type);

      if (nextNode) {
        setCurrentAndFocus(nextNode);
      } else {
        goChildNodeByIndex(0);
      }
    },
    [current, goChildNodeByIndex, setCurrentAndFocus]
  );

  const goPrevNode = useCallback(
    (type: NODE_TYPE = NODE_TYPE.VERT) => {
      /** Найти предыдущий элемент относильно заданного с некотором типом. */
      const getPrevNodeByType = (currentNode: ITreeNode | null, nodeTypeToSearch: NODE_TYPE): ITreeNode | null => {
        if (!currentNode) {
          return null;
        }

        const parentNode = currentNode.getParent();

        if (!parentNode) {
          return null;
        }

        const currentOrder = currentNode.getOrder();
        const children = parentNode.getChildrenAsArray();

        for (let i = currentOrder - 1; i >= 0; i--) {
          if (children?.[i].getType() === nodeTypeToSearch) {
            return children[i];
          }
        }

        return null;
      };

      const prevNode = getPrevNodeByType(current, type);

      if (prevNode) {
        setCurrentAndFocus(prevNode);
      } else {
        goParentNode();
      }
    },
    [current, goParentNode, setCurrentAndFocus]
  );

  return {
    tree: tree.current,
    current,
    setCurrent,
    mountNode,
    unmountNode,
    goNextNode,
    goPrevNode,
    goChildNodeByIndex,
    goParentNode,
    focusNode,
  };
};
