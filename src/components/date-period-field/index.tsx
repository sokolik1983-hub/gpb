import type { FC } from 'react';
import React from 'react';
import type { ChangeFieldHandler } from 'interfaces';
import type { IGetDatePeriodResponseDto, IGetDatePeriodRequestDto } from 'interfaces/client';
import { DATE_PERIODS } from 'interfaces/client';
import { locale } from 'localization';
import { statementService } from 'services/statement-service';
import { noop, getYesterday } from 'utils';
import { to } from '@platform/core';
import { dateTime } from '@platform/tools/date-time';
import type { IOption } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Опции селекта выбора временного периода. */
export const DATE_PERIOD_OPTIONS: Array<IOption<DATE_PERIODS>> = [
  { value: DATE_PERIODS.SELECT_PERIOD, label: locale.turnoverScroller.filter.datePeriods.selectPeriod },
  { value: DATE_PERIODS.YESTERDAY, label: locale.turnoverScroller.filter.datePeriods.yesterday },
  { value: DATE_PERIODS.TODAY, label: locale.turnoverScroller.filter.datePeriods.today },
  { value: DATE_PERIODS.LAST_3_DAYS, label: locale.turnoverScroller.filter.datePeriods.last3Days },
  { value: DATE_PERIODS.CURRENT_MONTH, label: locale.turnoverScroller.filter.datePeriods.curMonth },
  { value: DATE_PERIODS.LAST_MONTH, label: locale.turnoverScroller.filter.datePeriods.lastMonth },
  { value: DATE_PERIODS.PREVIOUS_QUARTER, label: locale.turnoverScroller.filter.datePeriods.prevQuarter },
];

/** Свойства компонента DatePeriodField. */
export interface IDatePeriodFieldProps {
  /** Путь до поля в форме. */
  name: string;
  /** Выполняется перед стартом запроса. */
  onStartFetching(): void;
  /** Выполняется после удачного вычисления периода. */
  onSuccessFetching(period?: IGetDatePeriodResponseDto): void;
  /** Выполняется если при выполнении запроса произошла ошибка. */
  onErrorFetching?(err: unknown): void;
}

/** Селект выбора периода. */
export const DatePeriodField: FC<IDatePeriodFieldProps> = ({ name, onErrorFetching = noop, onStartFetching, onSuccessFetching }) => {
  const getPeriod = async (period: IGetDatePeriodRequestDto['periodType']) => {
    onStartFetching();

    const [res, err] = await to(statementService.getDatePeriod({ periodType: period }));

    if (err) {
      onErrorFetching(err);
    } else {
      onSuccessFetching(res!);
    }
  };

  const handleOnChange: ChangeFieldHandler<DATE_PERIODS> = ({ value: period }) => {
    let date: string;

    switch (period) {
      case DATE_PERIODS.SELECT_PERIOD:
        onSuccessFetching();

        return;
      case DATE_PERIODS.TODAY:
        date = dateTime().format();

        onSuccessFetching({ dateTo: date, dateFrom: date });

        return;
      case DATE_PERIODS.YESTERDAY:
        date = getYesterday().format();

        onSuccessFetching({ dateTo: date, dateFrom: date });

        return;
      default:
        void getPeriod(period);

        break;
    }
  };

  return <Fields.Select extraSmall name={name} options={DATE_PERIOD_OPTIONS} onChange={handleOnChange} />;
};

DatePeriodField.displayName = 'DatePeriodField';
