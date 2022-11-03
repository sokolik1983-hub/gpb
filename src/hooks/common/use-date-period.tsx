import type { FC } from 'react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { DateRange as DateRangePure } from 'components/common/form/date-range';
import { DATE_PERIODS } from 'interfaces';
import type { IGetDatePeriodRequestDto, IGetDatePeriodResponseDto, RequestPeriodType } from 'interfaces/dto';
import { useForm } from 'react-final-form';
import { DATE_PERIOD_OPTIONS } from 'stream-constants';
import { to } from '@platform/core';
import type { OnChangeType } from '@platform/ui';
import { Fields } from '@platform/ui';

/** Входные параметры хука useDatePeriod. */
interface UseDatePeriodProps {
  /** Метод запроса к серверу. */
  fetch(data: IGetDatePeriodRequestDto): Promise<IGetDatePeriodResponseDto>;
  /** Названия полей формы временного периода. */
  fieldName: {
    /** Тип периода. */
    periodType: string;
    /** Дата начала. */
    dateFrom: string;
    /** Дата конца. */
    dateTo: string;
  };
  /** Метод, срабатывающий после расчета периода. */
  onCalculateFinal?(): void;
}

/** Выходные параметры хука useDatePeriod. */
interface UseDatePeriodResponse {
  /** Компонент выбора типа периода. */
  DatePeriodType: FC;
  /** Компонент выбора диапазона дат. */
  DateRange: FC;
}

/** Хук по изменению периода и диапазона дат. */
export const useDatePeriod = ({ fetch, fieldName, onCalculateFinal }: UseDatePeriodProps): UseDatePeriodResponse => {
  const defaultPeriodType = DATE_PERIODS.YESTERDAY;

  const { batch, change, submit } = useForm();

  const [loading, setLoading] = useState(false);

  /** Получить период дат с сервера. */
  const calculatePeriod = useCallback(
    async (periodType: RequestPeriodType) => {
      try {
        setLoading(true);

        const [period, error] = await to(fetch({ periodType }));

        if (error || !period) {
          throw Error('ERROR');
        }

        batch(() => {
          change(fieldName.dateFrom, period.dateFrom);
          change(fieldName.dateTo, period.dateTo);
        });
      } catch {
        change(fieldName.periodType, DATE_PERIODS.SELECT_PERIOD);
      } finally {
        void submit();

        setLoading(false);

        // По хорошему необходимо, чтобы submit возвразал промис, тогда не будет необходимости в setTimeout
        setTimeout(() => onCalculateFinal?.(), 0);
      }
    },
    [batch, change, fetch, fieldName.dateFrom, fieldName.dateTo, fieldName.periodType, onCalculateFinal, submit]
  );

  useEffect(() => {
    change(fieldName.periodType, defaultPeriodType);

    void calculatePeriod(defaultPeriodType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Обработчик изменения поля выбора типа периода. */
  const handleChangePeriodType: OnChangeType<DATE_PERIODS> = useCallback(
    ({ value: period }) => {
      if (period === DATE_PERIODS.SELECT_PERIOD) {
        return;
      }

      void calculatePeriod(period);
    },
    [calculatePeriod]
  );

  /** Компонент выбора типа периода. */
  const DatePeriodType = useMemo(() => {
    const DatePeriodTypeComponent: FC = () => (
      <Fields.Select extraSmall name={fieldName.periodType} options={DATE_PERIOD_OPTIONS} onChange={handleChangePeriodType} />
    );

    return DatePeriodTypeComponent;
  }, [fieldName.periodType, handleChangePeriodType]);

  /** Обработчик изменения полей диапазона дат. */
  const handleChangeDateRange = useCallback(() => change(fieldName.periodType, DATE_PERIODS.SELECT_PERIOD), [change, fieldName.periodType]);

  /** Компонент выбора диапазона дат. */
  const DateRange = useMemo(() => {
    const DateRangeComponent: FC = () => (
      <DateRangePure
        disabled={loading}
        name={[fieldName.dateFrom, fieldName.dateTo]}
        onChangeFrom={handleChangeDateRange}
        onChangeTo={handleChangeDateRange}
      />
    );

    return DateRangeComponent;
  }, [fieldName.dateFrom, fieldName.dateTo, handleChangeDateRange, loading]);

  return {
    DatePeriodType,
    DateRange,
  };
};
