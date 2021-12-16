import type { IRequestStatementDto } from 'interfaces/client/request-statement-dto';
import { to } from '@platform/core';
import type { IActionConfig } from '@platform/services';
import type { context } from './executor';

export const createStatement: IActionConfig<typeof context, IRequestStatementDto> = {
  action: ({ done, fatal, addSucceeded, addFailed }, { service, showLoader, hideLoader }) => async ([data]: IRequestStatementDto[]) => {
    showLoader();

    const [resp, err] = await to(service.createStatement(data));

    hideLoader();

    if (err) {
      addFailed(err);
      fatal();
    }

    if (resp) {
      addSucceeded(resp);
    }

    done();
  },
  guardians: [],
};
