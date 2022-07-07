import React from 'react';
import { Box } from '@platform/ui';
import { FocusTreeContext } from './focus-tree-context';
import { useKeyboard } from './hooks/use-keyboard';
import { useTree } from './hooks/use-tree';
import css from './styles.scss';

/** Свойства компонента. */
export interface IFocusTreeProps {
  /** Идентификатор дерева. */
  treeId: string;
}

/** Компонент "Дерево фокусируемых узлов". */
export const FocusTree: React.FC<IFocusTreeProps> = ({ treeId, children, ...props }) => {
  const tree = useTree(treeId);

  useKeyboard(tree);

  return (
    <FocusTreeContext.Provider value={tree}>
      <Box {...props} className={css.tree} data-node-id={treeId} tabIndex={0}>
        {children}
      </Box>
    </FocusTreeContext.Provider>
  );
};

FocusTree.displayName = 'FocusTree';
