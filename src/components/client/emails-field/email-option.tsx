import React from 'react';
import type { IOptionTemplateProps, IOption } from '@platform/ui';
import { Box, Option, Typography } from '@platform/ui';

/** Опция селекта выбора электронной почты. */
export interface IAccountOption extends IOption<string> {
  /** Название организации. */
  label: string;
}

/** Опция выпадающего списка выбора адреса электронной почты. */
export const EmailOption = React.forwardRef<typeof Option, IOptionTemplateProps<IAccountOption>>(
  ({ option, customLabel, ...rest }, ref) => {
    const { label } = option;

    return (
      <Option
        {...rest}
        ref={ref}
        customLabel={
          <Box>
            <Typography.P>{label}</Typography.P>
          </Box>
        }
        option={option}
      />
    );
  }
);

EmailOption.displayName = 'EmailOption';
