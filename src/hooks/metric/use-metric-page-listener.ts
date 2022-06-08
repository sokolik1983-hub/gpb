import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePageData } from 'utils/metric/metric-request-interceptor';

/** Хук для обновления pathname для данных для метрики при изменении страницы. */
export const useMetricPageListener = () => {
  const { pathname, state } = useLocation<{ refererPage: string }>();

  useEffect(() => {
    updatePageData(pathname, state?.refererPage);
  }, [pathname, state?.refererPage]);
};
