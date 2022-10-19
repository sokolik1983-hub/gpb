import type { FC } from 'react';
import React, { useEffect } from 'react';
import { DATE_PERIODS } from 'interfaces';
import type { IGetDatePeriodResponseDto, IGetDatePeriodRequestDto } from 'interfaces/dto';
import { DATE_PERIOD_OPTIONS } from 'stream-constants';
import { noop } from 'utils/common';
import { to } from '@platform/core';
import type { OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Свойства компонента DatePeriodField. */
export interface IDatePeriodFieldProps {
  /** Метод запроса к серверу. */
  fetchDatePeriod(data: IGetDatePeriodRequestDto): Promise<IGetDatePeriodResponseDto>;
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
export const DatePeriodField: FC<IDatePeriodFieldProps> = ({
  fetchDatePeriod,
  name,
  onErrorFetching = noop,
  onStartFetching,
  onSuccessFetching,
}) => {
  const getPeriod = async (period: IGetDatePeriodRequestDto['periodType']) => {
    onStartFetching();

    const [res, err] = await to(fetchDatePeriod({ periodType: period }));

    if (err || !res) {
      onErrorFetching(err);

      return;
    }

    onSuccessFetching(res);
  };

  const handleOnChange: OnChangeType<DATE_PERIODS> = ({ value: period }) => {
    if (period === DATE_PERIODS.SELECT_PERIOD) {
      onSuccessFetching();

      return;
    }

    void getPeriod(period);
  };

  useEffect(() => {
    void getPeriod(DATE_PERIODS.YESTERDAY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Fields.Select extraSmall name={name} options={DATE_PERIOD_OPTIONS} onChange={handleOnChange} />;
};

DatePeriodField.displayName = 'DatePeriodField';
