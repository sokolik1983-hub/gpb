import { useContext, useEffect, useState } from 'react';
import type { IHasClosedDayRequestDto } from 'interfaces/dto/has-closed-day-request-dto';
import { CREATION_PARAMS } from 'interfaces/form';
import { locale } from 'localization';
import { useForm, useFormState } from 'react-final-form';
import { statementService } from 'services';
import type { IFormState } from 'stream-constants/form';
import { FORM_FIELDS, FormContext } from 'stream-constants/form';
import { to } from '@platform/core';
import type { ICheckboxOption } from '@platform/ui';

const defaultOption: ICheckboxOption = {
  label: locale.common.creationParams[CREATION_PARAMS.WITH_PDF_SIGN],
  value: CREATION_PARAMS.WITH_PDF_SIGN,
};

/** Хук для управления флагом "С электронной подписью в формате PDF". */
export const useWithPdfEsign = (): [ICheckboxOption] => {
  const {
    hasValidationErrors,
    validating,
    values: { accountIds, dateTo, creationParams },
  } = useFormState<IFormState>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [canCalculateClosedDay, setCanCalculateClosedDay] = useState<boolean>(false);
  const { statementId, useCase } = useContext(FormContext);
  const { change } = useForm();

  useEffect(() => {
    // eslint-disable-next-line no-negated-condition
    if (!useCase) {
      if (validating) {
        return;
      }

      // только для ЭФ запроса выписки
      setCanCalculateClosedDay(!hasValidationErrors);
    } else {
      // только для ЭФ параметров печати / экспорта
      setCanCalculateClosedDay(!!statementId);
    }
  }, [hasValidationErrors, statementId, useCase, validating]);

  useEffect(() => {
    if (!canCalculateClosedDay) {
      return;
    }

    void (async () => {
      // формируем параметры по варианту вызова
      const dto: IHasClosedDayRequestDto = {
        accountIds: useCase ? undefined : accountIds,
        dateTo: useCase ? undefined : dateTo,
        statementId: useCase ? statementId : undefined,
      };

      // проверяем на закрытый день
      const [hasClosedDay, err] = await to(statementService.hasClosedDay(dto));

      if (err) {
        setDisabled(true);
      } else {
        setDisabled(!hasClosedDay);
      }

      const params = [...creationParams];

      if ((hasClosedDay || err) && params.includes(CREATION_PARAMS.WITH_PDF_SIGN)) {
        change(
          FORM_FIELDS.CREATION_PARAMS,
          params.filter(x => x !== CREATION_PARAMS.WITH_PDF_SIGN)
        );
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountIds, dateTo, useCase, canCalculateClosedDay]);

  return [{ ...defaultOption, disabled }];
};
