import type { QueryStatus } from 'react-query';

/** Статусы react-query. */
export const QUERY_STATUS: Record<string, QueryStatus> = {
  ERROR: 'error',
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
};
