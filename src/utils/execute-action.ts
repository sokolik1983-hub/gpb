import { createStatementHiddenOutside, getExecutor } from 'actions/client';

export const executeCreateStatementHidden = doc => {
  const executor = getExecutor();

  void executor.execute(createStatementHiddenOutside, doc);
};
