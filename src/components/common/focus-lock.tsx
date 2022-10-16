import React from 'react';
import ReactFocusLock from 'react-focus-lock';
import { Box, isIe } from '@platform/ui';

/** Оберта для решения проблем с ИЕ. */
export const FocusLock: React.FC = ({ children }) => {
  if (isIe()) {
    return <Box>{children}</Box>;
  }

  return <ReactFocusLock>{children}</ReactFocusLock>;
};

FocusLock.displayName = 'FocusLock';
