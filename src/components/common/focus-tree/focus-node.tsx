import React, { useCallback, useContext, useLayoutEffect } from 'react';
import cn from 'classnames';
import type { IWebBoxProps } from '@platform/ui';
import { Box } from '@platform/ui';
import { FocusTreeContext } from './focus-tree-context';
import { NODE_TYPE } from './node-type';
import css from './styles.scss';

/** Свойства родителя узла. */
export interface IFocusParentNodeProps {
  /** Кортеж идентификаторов, передаваемых дальше для целевого узла. */
  nodesIds: [string, string];
  /** Скрывать ли рамку для узла при фокусе. */
  hidden?: boolean;
}

/** Свойства узла. */
export interface IFocusNodeProps extends IWebBoxProps {
  /** Идентификатор текущего узла. */
  nodeId: string;
  /** Идентификатор родительского узла. */
  parentId: string;
  /** Расположение узла в группе. */
  type?: NODE_TYPE;
  /** Обработчик клика на узле. */
  onClick?(e): void;
  /** Скрывать ли рамку для узла при фокусе. */
  hidden?: boolean;
  /** Сфокусированный узел подсвечивать через border, а не через outline, в слуяае если элемент не скрытый. */
  preferBorder?: boolean;
  /** Ref сверху. */
  ref?: React.ForwardedRef<Box>;
}

// FIXME добавить свойство order для принудительного задания порядка следования узла (иногда это может быть удобно)
/** Компонент "Фокусируемый узел" (произвольньный контейнер компонентов на странице, поддерживающих фокус). */
export const FocusNode: React.FC<IFocusNodeProps> = React.memo(
  ({ nodeId, parentId, type, children, onClick, className, hidden, preferBorder, ...props }) => {
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

    const handleOnKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.code === 'Space' || e.code === 'Enter') {
          e.stopPropagation();

          onClick?.(e);
        }
      },
      [onClick]
    );

    return (
      <Box
        {...props}
        className={
          preferBorder
            ? cn(className, css['node-without-outline'], !hidden && css['node-with-border'])
            : cn(className, css['node-without-outline'], !hidden && css['node-with-outline'])
        }
        data-node-id={nodeId}
        data-parent-id={parentId}
        tabIndex={0}
        onClick={onClick}
        onFocus={handleOnFocus}
        onKeyDown={handleOnKeyDown}
      >
        {children}
      </Box>
    );
  }
);

FocusNode.defaultProps = {
  hidden: false,
  preferBorder: false,
  type: NODE_TYPE.VERTICAL,
};

FocusNode.displayName = 'FocusNode';
