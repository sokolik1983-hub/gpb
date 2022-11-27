import React from 'react';
import type { IOption, IOptionTemplateProps } from '@platform/ui';
import { Box, Option, Typography } from '@platform/ui';

/** Свойства опции выпадающего списка выбора организации. */
export interface OrganizationOptionProps extends IOption<string> {
  /** ИНН. */
  inn: string;
}

/** Опция выпадающего списка выбора организации. */
export const OrganizationOption = React.forwardRef<typeof Option, IOptionTemplateProps<OrganizationOptionProps>>(
  ({ option, customLabel, ...rest }, ref) => {
    const { label, inn } = option;

    return (
      <Option
        {...rest}
        ref={ref}
        customLabel={
          <Box>
            <Typography.P>{label}</Typography.P>
            <Typography.SmallText fill={'FAINT'}>{inn}</Typography.SmallText>
          </Box>
        }
        option={option}
      />
    );
  }
);

OrganizationOption.displayName = 'OrganizationOption';
