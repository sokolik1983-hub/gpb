import React, { useCallback } from 'react';
import { Dash } from 'components/form/dash';
import { CREATION_PARAMS } from 'interfaces/form';
import { useFormState, useForm } from 'react-final-form';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELDS } from 'stream-constants/form';
import { isNeedTotalsOfDay } from 'utils';
import type { OnChangeType } from '@platform/ui';
import { Horizon, Fields } from '@platform/ui';

/** Свойства выбора диапазона дат. */
interface DatesProps {
  name: [string, string];
  onChange?(): void;
}

/** Компонент выбора диапазона дат. */
export const DateRange: React.FC<DatesProps> = ({ name, onChange }) => {
  const { change } = useForm();
  const { values } = useFormState<IFormState>();

  const onDataFromChange: OnChangeType<string> = useCallback(
    ({ value }) => {
      if (!isNeedTotalsOfDay({ ...values, dateFrom: value }) && values.creationParams.includes(CREATION_PARAMS.TOTALS_OF_DAY)) {
        change(
          FORM_FIELDS.CREATION_PARAMS,
          values.creationParams.filter(x => x !== CREATION_PARAMS.TOTALS_OF_DAY)
        );
      }

      onChange?.();
    },
    [change, onChange, values]
  );

  const onDataToChange: OnChangeType<string> = useCallback(
    ({ value }) => {
      if (!isNeedTotalsOfDay({ ...values, dateTo: value }) && values.creationParams.includes(CREATION_PARAMS.TOTALS_OF_DAY)) {
        change(
          FORM_FIELDS.CREATION_PARAMS,
          values.creationParams.filter(x => x !== CREATION_PARAMS.TOTALS_OF_DAY)
        );
      }

      onChange?.();
    },
    [change, onChange, values]
  );

  return (
    <Horizon>
      <Fields.Date extraSmall name={name[0]} width={178} onChange={onDataFromChange} />
      <Dash />
      <Fields.Date extraSmall name={name[1]} width={178} onChange={onDataToChange} />
    </Horizon>
  );
};

DateRange.displayName = 'DateRange';
