import axios from 'axios';
import type { IMetricDataDto } from 'interfaces/dto/metric';
import { METRIC_ACTION } from 'interfaces/dto/metric';
import { metricService } from 'services';

/** Шаблон регулярного выражения для guid. */
const guidRegEx = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
/** Шаблон регулярного выражения для существующего запроса выписки. */
const concreteStatementRequestRegEx = new RegExp(`/request/${guidRegEx}$`);

/** Функция для преобразования url в тип произошедшего действия для метрики. */
export const mapUrlToMetricAction = (url: string): METRIC_ACTION | undefined => {
  switch (true) {
    case url.endsWith('/statement'):
      return METRIC_ACTION.STATEMENT_REQUEST;
    case concreteStatementRequestRegEx.test(url):
      return METRIC_ACTION.HIDDEN_VIEW_STATEMENT_REQUEST;
    case url.endsWith('/create-attachment'):
      return METRIC_ACTION.DOWNLOAD_ATTACHMENT;
    case url.endsWith('/get-turnovers'):
      return METRIC_ACTION.STATEMENT_REQUEST_GET_PAGE;
    case url.endsWith('/get-accounting-entry'):
      return METRIC_ACTION.ACCOUNTING_ENTRY_GET_PAGE;
    default: {
      // действия определяются только по АПИ из некоторого заранее заданного набора
      return;
    }
  }
};

/** Перехватчик для axios-запросов для отправки данных в метрику. */
export const getMetricInterceptor = () => {
  /** Данные страницы sourcePage и refererPage. */
  const pageData: Pick<IMetricDataDto, 'refererPage' | 'sourcePage'> = {
    sourcePage: '',
    refererPage: '',
  };

  axios.interceptors.request.use(config => {
    const { url, data: requestBody } = config;

    if (!url) {
      return config;
    }

    const action = mapUrlToMetricAction(url);

    if (!action) {
      return config;
    }

    const dto: IMetricDataDto = {
      ...pageData,
      url,
      tag: action,
      requestBody: requestBody ? JSON.stringify(requestBody) : undefined,
    };

    void metricService.pushMetricData(dto);

    return config;
  });

  return {
    /** Метод обновления данных страницы. */
    updatePageData: (newPathname: string) => {
      pageData.refererPage = pageData.sourcePage;
      pageData.sourcePage = newPathname;
    },
  };
};

export const { updatePageData } = getMetricInterceptor();
