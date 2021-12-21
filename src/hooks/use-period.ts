import { useEffect } from 'react';
import { DATE_PERIODS } from 'interfaces';
import type { IGetDatePeriodResponseDto, RequestPeriodType } from 'interfaces/client';
import { FORM_FIELDS } from 'pages/form/client/interfaces/form-state';
import { useForm } from 'react-final-form';
import { useQuery } from 'react-query';
import { statementService } from 'services';
import { DATE_ISO_FORMAT } from 'stream-constants';
import { getYesterday } from 'utils';
import { useFormValues } from 'utils/hooks/use-form-values';
import { dateTime } from '@platform/tools/date-time';

export const usePeriod = () => {
  const { batch, change } = useForm();
  const values = useFormValues();

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

    if (values.periodType === DATE_PERIODS.TODAY) {
      const today = dateTime().format(DATE_ISO_FORMAT);

      batch(() => {
        change(FORM_FIELDS.DATE_FROM, today);
        change(FORM_FIELDS.DATE_TO, today);
      });

      return;
    }

    if (values.periodType === DATE_PERIODS.YESTERDAY) {
      const yesterday = getYesterday().format(DATE_ISO_FORMAT);

      batch(() => {
        change(FORM_FIELDS.DATE_FROM, yesterday);
        change(FORM_FIELDS.DATE_TO, yesterday);
      });

      return;
    }

    void refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.periodType]);

  useEffect(() => {
    batch(() => {
      change(FORM_FIELDS.DATE_FROM, period?.dateFrom);
      change(FORM_FIELDS.DATE_TO, period?.dateTo);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period?.dateFrom, period?.dateTo]);
};
