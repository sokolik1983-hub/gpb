import { useCallback, useEffect, useRef, useState } from 'react';
import type { IFocusTreeContext } from '../focus-tree-context';
import type { ITreeNode } from '../generic-tree';
import { GenericTree } from '../generic-tree';
import { NODE_TYPE } from '../node-type';

/** Хук для управления состоянием дерева фокусируемых узлов. */
export const useTree = (treeId: string): IFocusTreeContext => {
  const parentsStore = useRef<Map<string, ITreeNode>>(new Map());
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
    (nodeId: string, parentId: string | null, type: NODE_TYPE = NODE_TYPE.VERTICAL) => {
      // FIXME нужно упростить алгоритм
      // Идея алгоритма монтирования состоит из 2 основных шагов:
      // - накапливаем виртуальные родительские узлы
      // - переносим виртуальный узел в реальный, если он есть в хранилище виртуалных узлов

      // nodeId в хранилище
      if (parentsStore.current.has(nodeId)) {
        const node = parentsStore.current.get(nodeId)!;

        if (parentId) {
          const foundParent = tree.current.findNodeById(parentId);

          // parentId уже в дереве
          if (foundParent) {
            node.setParent(foundParent);

            return foundParent.appendChildNode(node, type);
          }

          // parentId НЕ в дереве и в хранилище
          if (parentsStore.current.has(parentId)) {
            const storedParent = parentsStore.current.get(parentId)!;

            node.setParent(storedParent);

            return storedParent.appendChildNode(node, type);
          }

          // parentId НЕ в дереве и НЕ в хранилище
          const virtualParent = new GenericTree(parentId);

          node.setParent(virtualParent);
          virtualParent.appendChildNode(node, type);

          parentsStore.current.set(parentId, virtualParent);

          return node;
        }

        // parentId == null
        return tree.current.appendChildNode(node, type);
      }

      // nodeId НЕ в хранилище
      if (parentId) {
        const foundParent = tree.current.findNodeById(parentId);

        // parentId уже в дереве
        if (foundParent) {
          return foundParent.createChildNode(nodeId, type);
        }

        // parentId НЕ в дереве и в хранилище
        if (parentsStore.current.has(parentId)) {
          const storedParent = parentsStore.current.get(parentId)!;

          return storedParent.createChildNode(nodeId, type);
        }

        // parentId НЕ в дереве и НЕ в хранилище
        const virtualParent = new GenericTree(parentId);
        const node = virtualParent.createChildNode(nodeId, type);

        parentsStore.current.set(parentId, virtualParent);

        return node;
      }

      // parentId == null
      if (parentsStore.current.has(nodeId)) {
        const node = parentsStore.current.get(nodeId)!;

        return tree.current.appendChildNode(node, type);
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
    (type: NODE_TYPE = NODE_TYPE.VERTICAL) => {
      /** Найти ближайший элемент относильно заданного с некоторым типом. */
      const getNextNodeByType = (currentNode: ITreeNode | null, nodeTypeToSearch: NODE_TYPE): ITreeNode | null => {
        if (!currentNode) {
          return null;
        }

        const parentNode = currentNode.getParent();

        if (!parentNode) {
          return null;
        }

        const currentIndex = parentNode.getChildIndex(currentNode.getNodeId());
        const children = parentNode.getChildrenAsArray();

        for (let i = currentIndex + 1; i < children.length; i++) {
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
    (type: NODE_TYPE = NODE_TYPE.VERTICAL) => {
      /** Найти предыдущий элемент относильно заданного с некоторым типом. */
      const getPrevNodeByType = (currentNode: ITreeNode | null, nodeTypeToSearch: NODE_TYPE): ITreeNode | null => {
        if (!currentNode) {
          return null;
        }

        const parentNode = currentNode.getParent();

        if (!parentNode) {
          return null;
        }

        const currentIndex = parentNode.getChildIndex(currentNode.getNodeId());
        const children = parentNode.getChildrenAsArray();

        for (let i = currentIndex - 1; i >= 0; i--) {
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
