import type { ExtendedStatementRequestCard } from 'interfaces/admin';
import type { StatementRequestCardFormState } from 'interfaces/admin/form';
import { CREATION_PARAMS } from 'interfaces/form/creation-params';
import { defaultFormState as defaultFormStateCommon } from 'stream-constants/form';
import { mapDtoToForm } from 'utils/admin/actions';

/** Конфиг начального состояния формы. */
export interface IStateConfig {
  /** Выписка экспортируется со списком проводок. */
  withEntriesList: boolean;
  /** Запрос на выписку. */
  statement?: ExtendedStatementRequestCard;
  /** Дата начала периода. */
  dateFrom?: string;
  /** Дата окончания периода. */
  dateTo?: string;
  /** Дефолтное состояние формы. */
  defaultFormState?: StatementRequestCardFormState;
}

/** Функция возвращающая начальное значение состояния формы. */
export const getInitialFormState = ({
  statement,
  withEntriesList,
  dateFrom,
  dateTo,
  defaultFormState: defaultFormStateOwn,
}: IStateConfig): Partial<StatementRequestCardFormState> => {
  const defaultFormState = defaultFormStateOwn || defaultFormStateCommon;

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
