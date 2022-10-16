import type { IFormRouterState } from 'interfaces/client';
import { useHistory } from 'react-router-dom';

/** Возвращает способ создания для которого была вызвана форма. */
export const useCreationType = () => {
  const {
    location: { state: { creationType } = {} },
  } = useHistory<IFormRouterState>();

  return creationType;
};
