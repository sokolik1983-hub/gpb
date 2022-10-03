import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePageData } from 'utils/common/metric/metric-request-interceptor';

/** Хук для обновления данных страницы для метрики при ее изменении. */
export const useMetricPageListener = () => {
  const { pathname, state } = useLocation<{ refererPage: string }>();

  useEffect(() => {
    updatePageData(pathname, state?.refererPage);
  }, [pathname, state?.refererPage]);
};
