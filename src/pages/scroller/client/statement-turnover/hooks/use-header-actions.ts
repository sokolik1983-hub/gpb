import { useMemo } from 'react';
import { executor } from 'actions/client';
import type { TransfomedAction } from '@platform/core';
import { getActionButtons } from '@platform/core';
import { useAuth } from '@platform/services/client';
import { HEADER_ACTIONS } from '../action-configs';

/** Возвращает преобразованные конфиги действий в хедере скроллера. */
export const useHeaderActions = (selectedAccounts: string[]): Array<TransfomedAction<any>> => {
  const { getAvailableActions } = useAuth();

  const actions = useMemo(() => getActionButtons(getAvailableActions(HEADER_ACTIONS), executor, [{ selectedAccounts }]), [
    getAvailableActions,
    selectedAccounts,
  ]);

  return actions;
};
