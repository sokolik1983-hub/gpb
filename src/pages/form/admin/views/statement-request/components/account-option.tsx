import React from 'react';
import type { Account } from 'interfaces/admin/form/form-state';
import type { IOptionTemplateProps, IOption } from '@platform/ui';
import { Box, Option, Typography } from '@platform/ui';

/** Свойства опции выбора счета. */
export type AccountOptionProps = IOption<Account>;

/** Опция выпадающего списка выбора счёта. */
export const AccountOption = React.forwardRef<typeof Option, IOptionTemplateProps<AccountOptionProps>>(
  ({ option, customLabel, ...rest }, ref) => {
    const {
      value: { accountNumber, bankClientName },
    } = option;

    return (
      <Option
        {...rest}
        ref={ref}
        customLabel={
          <Box>
            <Typography.P>{accountNumber}</Typography.P>
            <Typography.SmallText fill={'FAINT'}>{bankClientName}</Typography.SmallText>
          </Box>
        }
        option={option}
      />
    );
  }
);

AccountOption.displayName = 'AccountOption';
