import { useQueryClient } from 'react-query';
import type { QueryKey } from 'react-query';

/** Хук получения данных из react-query по переданному ключу. */
export const useGetQueryData = <TData = unknown>(queryKey: QueryKey): TData | undefined => {
  const queryClient = useQueryClient();

  return queryClient.getQueryData(queryKey);
};
