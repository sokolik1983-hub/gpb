import { createContext } from 'react';
import type { UseAccessibility } from 'components/scroller-table-view/accessibility/types';
import { noop } from 'utils';

type AccessibilityContextValues = Omit<UseAccessibility, 'getTableAccessibilityProps'>;

const DEFAULT_VALUE_CONTEXT: AccessibilityContextValues = {
  getCellAccessibilityProps: noop,
  getCellAccessibilityInnerFocusProps: noop,
  getHeaderCellAccessibilityProps: noop,
  getRowAccessibilityProps: noop,
};

export const AccessibilityContext = createContext<AccessibilityContextValues>(DEFAULT_VALUE_CONTEXT);
