import { useCallback } from 'react';
import { useEventListener } from '@platform/ui';
import type { IFocusTreeContext } from '../focus-tree-context';
import { NODE_TYPE } from '../node-type';

/** Хук для установки фокуса на очередном узле в зависмоси от нажатия соответствующей клавиши на клавиатуре. */
export const useKeyboard = ({ goNextNode, goPrevNode, goParentNode }: IFocusTreeContext) => {
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.code) {
        // нажали коавишу "Стрелка ввверх"
        case 'ArrowUp':
          goPrevNode();
          break;
        // нажали коавишу "Стрелка вниз"
        case 'ArrowDown':
          goNextNode();
          break;
        // нажали коавишу "Escape"
        case 'Escape':
          goParentNode();
          break;
        // нажали коавишу "Стрелка влево"
        case 'ArrowLeft':
          goPrevNode(NODE_TYPE.HORIZONTAL);
          break;
        // нажали коавишу "Стрелка вправо"
        case 'ArrowRight':
          goNextNode(NODE_TYPE.HORIZONTAL);
          break;
        default:
      }
    },
    [goNextNode, goParentNode, goPrevNode]
  );

  useEventListener('keydown', onKeyDown);
};
