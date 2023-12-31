import { useEffect } from 'react';
import { DATE_PERIODS } from 'interfaces';
import type { IGetDatePeriodResponseDto, RequestPeriodType } from 'interfaces/dto';
import { useForm, useFormState } from 'react-final-form';
import { useQuery } from 'react-query';
import { statementService } from 'services/client';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELDS } from 'stream-constants/form';

/** Хук с бизнес-логикой для компонента "Период формирования выписки". */
export const usePeriod = () => {
  const { batch, change } = useForm();
  const { values } = useFormState<IFormState>();

  const { refetch } = useQuery<IGetDatePeriodResponseDto>({
    queryKey: ['@eco/statement', 'period'],
    queryFn: () =>
      statementService.getDatePeriod({
        periodType: values.periodType as RequestPeriodType,
      }),
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    if (values.periodType === DATE_PERIODS.SELECT_PERIOD) {
      return;
    }

    const getPeriod = async () => {
      const { data: period } = await refetch();

      if (period) {
        batch(() => {
          change(FORM_FIELDS.DATE_FROM, period.dateFrom);
          change(FORM_FIELDS.DATE_TO, period.dateTo);
        });
      }
    };

    void getPeriod();
  }, [batch, change, refetch, values.periodType]);
};
