import type { StatementRequestCard } from 'interfaces/admin';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import type { IFormState } from 'stream-constants/form';
import { defaultFormState } from 'stream-constants/form';
import { mapDtoToForm } from 'utils/admin/actions';

/** Конфиг начального состояния формы. */
export interface IStateConfig {
  /** Выписка экспортируется со списком проводок. */
  withEntriesList: boolean;
  /** Запрос на выписку. */
  statement?: StatementRequestCard;
  /** Дата начала периода. */
  dateFrom?: string;
  /** Дата окончания периода. */
  dateTo?: string;
  /** Предзаполненные поля формы при запросе выписки с другого сервиса. */
  prefilledFormValues?: IFormState;
}

/** Функция возвращающая начальное значение состояния формы. */
export const getInitialFormState = ({
  statement,
  withEntriesList,
  dateFrom,
  dateTo,
  prefilledFormValues,
}: IStateConfig): Partial<IFormState> => {
  if (prefilledFormValues) {
    return { ...defaultFormState, ...prefilledFormValues };
  }

  if (!statement) {
    const creationParams: string[] = [];
    const documentsSetParams: string[] = [];

    if (withEntriesList) {
      creationParams.push(CREATION_PARAMS.WITH_DOCUMENTS_SET);
    }

    return { ...defaultFormState, creationParams, documentsSetParams, dateFrom, dateTo };
  }

  // TODO посмотреть вариант с хранением стейта формы по тому, который приходит с BE
  const formState = mapDtoToForm(statement);

  const form = Object.keys(defaultFormState).reduce((acc, key) => {
    if (!acc[key]) {
      acc[key] = defaultFormState[key];
    }

    return acc;
  }, formState);

  return form;
};
