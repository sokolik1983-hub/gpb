import { COMMON_STREAM_URL } from 'stream-constants/client';
import { create } from '@platform/services';

export const newStatement = {
  ...create(COMMON_STREAM_URL.STATEMENT),
  guardians: [],
};
