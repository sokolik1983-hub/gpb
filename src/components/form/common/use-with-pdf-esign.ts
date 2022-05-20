import { useLayoutEffect, useState } from 'react';
import { useAccounts } from 'hooks';
import { CREATION_PARAMS } from 'interfaces/form';
import { locale } from 'localization';
import { useFormState } from 'react-final-form';
import { statementService } from 'services';
import type { IFormState } from 'stream-constants/form';
import { to } from '@platform/core';
import type { ICheckboxOption } from '@platform/ui';

const defaultOption: ICheckboxOption = {
  label: locale.common.creationParams[CREATION_PARAMS.WITH_PDF_SIGN],
  value: CREATION_PARAMS.WITH_PDF_SIGN,
};

/** Хук для управления флагом "С электронной подписью в формате PDF". */
export const useWithPdfEsign = (): [ICheckboxOption] => {
  const [disabled, setDisabled] = useState<boolean>(false);

  const {
    values: { dateTo, accountIds },
  } = useFormState<IFormState>();

  // достаем счета из кэша
  const { data: accounts } = useAccounts();

  useLayoutEffect(() => {
    void (async () => {
      const absNumbers = accounts.reduce<string[]>((acc, account) => {
        if (accountIds.includes(account.id)) {
          acc.push(account.bankClient.absId);
        }

        return acc;
      }, []);

      // проверяем на закрытый день
      const [res, err] = await to(statementService.hasClosedDay({ absNumbers, dateTo }));
      const hasClosedDay = !!res ?? !err;

      setDisabled(hasClosedDay);
    })();
  }, [accountIds, accounts, dateTo]);

  return [{ ...defaultOption, disabled }];
};
