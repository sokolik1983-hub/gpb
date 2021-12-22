import { useEffect } from 'react';
import { DATE_PERIODS } from 'interfaces';
import type { IGetDatePeriodResponseDto, RequestPeriodType } from 'interfaces/client';
import type { IFormState } from 'pages/form/client/interfaces/form-state';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { useForm, useFormState } from 'react-final-form';
import { useQuery } from 'react-query';
import { statementService } from 'services';

/** Хук с бизнес-логикой для компонента "Период формирования выписки". */
export const usePeriod = () => {
  const { batch, change } = useForm();
  const { values } = useFormState<IFormState>();

  const { data: period, refetch } = useQuery<IGetDatePeriodResponseDto>({
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

    void refetch();
  }, [batch, change, refetch, values.periodType]);

  useEffect(() => {
    batch(() => {
      change(FORM_FIELDS.DATE_FROM, period?.dateFrom);
      change(FORM_FIELDS.DATE_TO, period?.dateTo);
    });
  }, [batch, change, period?.dateFrom, period?.dateTo]);
};
