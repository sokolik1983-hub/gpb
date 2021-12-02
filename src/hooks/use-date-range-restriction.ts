import { useEffect } from 'react';
import { useForm } from 'react-final-form';
import { dateTime } from '@platform/tools/date-time';

/** Параметр хука useDateRangeRestriction. */
export interface IUseDateRangeInputRestriction {
  /** Значение поля "Дата с". */
  dateFrom: string | undefined;
  /** Значение поля "Дата по". */
  dateTo: string | undefined;
  /** Имя поля "Дата с". */
  dateFromName: string;
  /** Имя поля "Дата с". */
  dateToName: string;
}

/**
 * Не даёт пользователю ввести неправильный диапазон.
 * Если введённое значение "Дата по" меньше "Дата с" то устанавливает "Дата по" в значение "Дата с".
 * Если "Дата с" больше "Дата по" то устанавливает "Дата c" в значение "Дата по".
 */
export const useDateRangeRestriction = ({ dateFrom, dateTo, dateFromName, dateToName }: IUseDateRangeInputRestriction) => {
  const { change } = useForm();

  useEffect(() => {
    // Если введённое значение "Дата по" меньше "Дата с" то устанавливает "Дата по" в значение "Дата с"
    if (dateFrom && dateTo && dateTime(dateTo).isBefore(dateFrom, 'day')) {
      change(dateToName, dateFrom);
    }
    // dateFrom не включён в зависимости т.к. нужно, чтобы срабатывал только при изменении dateTo.
    // Через onChange сделать не получилось потому, что при вызове change() внутри обработчика onChange,
    // стейт формы и компонента рассинхронизируются.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, dateTo]);

  useEffect(() => {
    // Если "Дата с" больше "Дата по" то устанавливает "Дата c" в значение "Дата по"
    if (dateFrom && dateTo && dateTime(dateFrom).isAfter(dateTo, 'day')) {
      change(dateFromName, dateTo);
    }
    // dateTo не включён в зависимости т.к. нужно, чтобы срабатывал только при изменении dateFrom.
    // Через onChange сделать не получилось потому, что при вызове change() внутри обработчика onChange,
    // стейт формы и компонента рассинхронизируются.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [change, dateFrom]);
};
