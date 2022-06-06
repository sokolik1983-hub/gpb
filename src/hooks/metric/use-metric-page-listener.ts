import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updatePathname } from 'utils/metric/metric-request-interceptor';

/** Хук для обновления pathname для данных для метрики при изменении страницы. */
export const useMetricPageListener = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    updatePathname(pathname);
  }, [pathname]);
};
