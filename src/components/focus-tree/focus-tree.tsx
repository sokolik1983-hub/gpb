import React, { useContext } from 'react';
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

/** Компонент с содержимым страницы. */
const FocusTreeContentWithKeyboard: React.FC = ({ children, ...props }) => {
  const value = useContext(FocusTreeContext);

  useKeyboard(value);

  const { tree } = value;

  return (
    <Box {...props} className={css.tree} data-node-id={tree?.getNodeId()} tabIndex={0}>
      {children}
    </Box>
  );
};

FocusTreeContentWithKeyboard.displayName = 'FocusTreeContentWithKeyboard';

/** Компонент "Дерево фокусируемых узлов". */
export const FocusTree: React.FC<IFocusTreeProps> = ({ treeId, children, ...props }) => {
  const value = useTree(treeId);

  return (
    <FocusTreeContext.Provider value={value}>
      <FocusTreeContentWithKeyboard {...props}>{children}</FocusTreeContentWithKeyboard>
    </FocusTreeContext.Provider>
  );
};

FocusTree.displayName = 'FocusTree';
