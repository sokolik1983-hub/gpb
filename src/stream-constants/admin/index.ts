import { ADMIN_STREAM_URL as PLATFORM_ADMIN_STREAM_URL } from '@platform/services/admin';

export const ADMIN_STREAM_URL = {
  ...PLATFORM_ADMIN_STREAM_URL,
  STATEMENT: '/account-statement',
  TRANSACTION_REQUESTS: '/account-statement/transactions',
};
