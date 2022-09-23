import React from 'react';
import { formatAccountCode } from '@platform/tools/localization';
import type { IOptionTemplateProps, IOption } from '@platform/ui';
import { Box, Option, Typography } from '@platform/ui';

/** Опция селекта выбора счетов. */
export interface IAccountOption extends IOption<string> {
  /** Номер счёта. */
  accountNumber: string;
  /** Наименование организации. */
  orgName: string;
}

/** Опция выпадающего списка выбора счёта. */
export const AccountOption = React.forwardRef<typeof Option, IOptionTemplateProps<IAccountOption>>(
  ({ option, customLabel, ...rest }, ref) => {
    const { accountNumber, orgName } = option;

    return (
      <Option
        {...rest}
        ref={ref}
        customLabel={
          <Box>
            <Typography.P>{formatAccountCode(accountNumber)}</Typography.P>
            <Typography.SmallText fill={'FAINT'}>{orgName}</Typography.SmallText>
          </Box>
        }
        option={option}
      />
    );
  }
);

AccountOption.displayName = 'AccountOption';
