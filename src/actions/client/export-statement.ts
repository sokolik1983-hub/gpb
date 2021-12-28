import type { IStatementHistoryRow } from 'interfaces/client';
import type { IRequestStatementDto } from 'interfaces/client/request-statement-dto';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

/**
 * [Выписки_ЗВ] Клиент: Функция экспорта файла выписки или документа.
 *
 * @see {@link https://confluence.gboteam.ru/pages/viewpage.action?pageId=28675637}
 */
export const exportStatement: IActionConfig<typeof context, IRequestStatementDto> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  action: () => async ([data]: IStatementHistoryRow[]) =>
    // TODO: Сделать реализацию по готовности реста.
    Promise.resolve(),
  guardians: [
    /* TODO: Добавить гарды при реализации действия. */
  ],
};
