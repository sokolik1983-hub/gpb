import React, { useCallback, useContext, useLayoutEffect } from 'react';
import { Box } from '@platform/ui';
import { FocusTreeContext } from './focus-tree-context';
import { NODE_TYPE } from './node-type';
import css from './styles.scss';

/** Свойства компонента. */
export interface FocusNodeProps {
  /** Идентификатор текущего узла. */
  nodeId: string;
  /** Идентификатор родительского узла. */
  parentId: string;
  /** Расположение узла в группе. */
  type?: NODE_TYPE;
  /** Скрывать ли рамку для узла при фокусе. */
  hideBorder?: boolean;
}

// FIXME добавить свойство order для принудительного задания порядка следования узла (иногда это может быть удобно)
/** Компонент "Фокусируемый узел" (произвольньный контейнер компонентов на странице, поддерживающих фокус). */
export const FocusNode: React.FC<FocusNodeProps> = React.memo(({ nodeId, parentId, type, hideBorder, children, ...props }) => {
  const { mountNode, unmountNode, setCurrent, tree, current, setInsideNode } = useContext(FocusTreeContext);

  useLayoutEffect(() => {
    const newNode = mountNode(nodeId, parentId, type);

    return () => unmountNode(newNode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnFocus = useCallback(
    (e: React.SyntheticEvent<HTMLDivElement>) => {
      const domNode = e.target as HTMLDivElement;
      const currentNodeId = domNode.getAttribute('data-node-id');

      if (!currentNodeId) {
        setInsideNode(true);

        return;
      }

      if (currentNodeId === current?.getNodeId()) {
        return;
      }

      const currentNode = tree?.findNodeById(currentNodeId);

      if (!currentNode) {
        return;
      }

      setInsideNode(false);
      setCurrent(currentNode);
    },
    [current, setCurrent, setInsideNode, tree]
  );

  return (
    <Box
      {...props}
      className={hideBorder ? css['node-without-border'] : css.node}
      data-node-id={nodeId}
      tabIndex={0}
      onFocus={handleOnFocus}
    >
      {children}
    </Box>
  );
});

FocusNode.defaultProps = {
  hideBorder: false,
  type: NODE_TYPE.VERTICAL,
};

FocusNode.displayName = 'FocusNode';
