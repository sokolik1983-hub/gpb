import axios from 'axios';
import type { IMetricDataDto } from 'interfaces/dto/metric';
import { METRIC_ACTION } from 'interfaces/dto/metric';
import { metricService } from 'services';
import { COMMON_STREAM_URL } from 'stream-constants/client';

/** Шаблон регулярного выражения для guid. */
const guidRegEx = '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}';
/** Шаблон регулярного выражения для существующего запроса выписки. */
const concreteStatementRequestRegEx = new RegExp(`/request/${guidRegEx}$`);
/** Шаблон регулярного выражения для экспорта выписки. */
const exportStatementRegEx = new RegExp(`/export/${guidRegEx}$`);
/** Шаблон регулярного выражения для печати выписки. */
const printStatementRegEx = new RegExp(`/print/${guidRegEx}$`);

/** Функция для преобразования url в тип произошедшего действия для метрики. */
export const mapUrlToMetricAction = (url: string, sourcePage: string): METRIC_ACTION | undefined => {
  switch (true) {
    case url.endsWith('/statement'):
      return METRIC_ACTION.STATEMENT_REQUEST;
    case concreteStatementRequestRegEx.test(url) && sourcePage === COMMON_STREAM_URL.STATEMENT_TURNOVER:
      return METRIC_ACTION.HIDDEN_VIEW_STATEMENT_REQUEST;
    case url.endsWith('/create-attachment') || exportStatementRegEx.test(url) || printStatementRegEx.test(url):
      return METRIC_ACTION.DOWNLOAD_ATTACHMENT;
    case url.endsWith('/request/get-page'):
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
  // данные страницы (sourcePage и refererPage)
  const pageData: Pick<IMetricDataDto, 'refererPage' | 'sourcePage'> = {
    sourcePage: '',
    refererPage: '',
  };

  axios.interceptors.request.use(config => {
    const { url, data: requestBody } = config;

    if (!url) {
      return config;
    }

    const action = mapUrlToMetricAction(url, pageData.sourcePage);

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
    updatePageData: (newPathname: string, refererPage?: string) => {
      pageData.refererPage = refererPage ?? pageData.sourcePage;
      pageData.sourcePage = newPathname;
    },
  };
};

export const { updatePageData } = getMetricInterceptor();
