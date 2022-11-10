import { PAGE_SIZES } from 'components/common/pagination';
import type { Currency } from 'interfaces/admin';
import { useQuery } from 'react-query';
import { statementService } from 'services/admin';
import { PREFIX } from 'stream-constants/admin';
import type { IMetaData } from '@platform/services/admin';

/**
 * Возвращает список валют.
 *
 * @param param - Входные данные.
 * @param param.code - Буквенный код валюты.
 * @param param.selected - Признак выбранного кода валюты.
 * */
export const useCurrencies = ({ code, selected }: { code: string; selected?: boolean }) => {
  const metaData: IMetaData = {
    filters: {
      code: {
        value: code,
        condition: selected ? 'eq' : 'contains',
        fieldName: 'code',
      },
    },
    offset: 0,
    pageSize: PAGE_SIZES.PER_25,
  };

  const { data = [], isError, isFetched, isFetching, isSuccess } = useQuery<Currency[]>({
    cacheTime: 0,
    queryFn: () => statementService.getCurrencies(metaData),
    queryKey: [PREFIX, '@eco/statement', 'currencies', code],
    retry: false,
  });

  return { data, isError, isFetched, isFetching, isSuccess };
};
