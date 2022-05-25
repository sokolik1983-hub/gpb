import { useContext, useEffect, useState } from 'react';
import type { IHasClosedDayRequestDto } from 'interfaces/dto/has-closed-day-request-dto';
import { CREATION_PARAMS } from 'interfaces/form';
import { locale } from 'localization';
import { useFormState } from 'react-final-form';
import { statementService } from 'services';
import type { IFormState } from 'stream-constants/form';
import { FormContext } from 'stream-constants/form';
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
    values: { accountIds, dateTo },
  } = useFormState<IFormState>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const { statementId, useCase } = useContext(FormContext);

  useEffect(() => {
    void (async () => {
      // только для ЭФ запроса выписки
      if (!useCase && (validating || hasValidationErrors)) {
        return;
      }

      // только для ЭФ параметров печати / экспорта
      if (useCase && !statementId) {
        return;
      }

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
    })();
  }, [accountIds, dateTo, hasValidationErrors, statementId, useCase, validating]);

  return [{ ...defaultOption, disabled }];
};
