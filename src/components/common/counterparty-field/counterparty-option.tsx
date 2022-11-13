import React from 'react';
import { locale } from 'localization';
import type { IOptionTemplateProps, IOption } from '@platform/ui';
import { Box, Option, Typography } from '@platform/ui';

/** Опция выпадающего списка выбора контрагента. */
export interface CounterpartyOptionProps extends IOption<string> {
  /** ИНН контрагента. */
  inn: string;
}

/** Опция выпадающего списка выбора контрагента. */
export const CounterpartyOption = React.forwardRef<typeof Option, IOptionTemplateProps<CounterpartyOptionProps>>(
  ({ option, customLabel, ...rest }, ref) => {
    const { label, inn } = option;

    return (
      <Option
        {...rest}
        ref={ref}
        customLabel={
          <Box>
            <Typography.P>{label}</Typography.P>
            <Typography.SmallText fill={'FAINT'}>{locale.transactionsScroller.labels.counterpartyInn({ inn })}</Typography.SmallText>
          </Box>
        }
        option={option}
      />
    );
  }
);

CounterpartyOption.displayName = 'CounterpartyOption';
