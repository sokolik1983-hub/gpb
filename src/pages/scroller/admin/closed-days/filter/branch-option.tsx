import React from 'react';
import type { IOption, IOptionTemplateProps } from '@platform/ui';
import { Box, Option, Typography } from '@platform/ui';

/** Свойства опции выпадающего списка выбора филиала. */
export interface BranchOptionProps extends IOption<string> {
  /** Код филиала. */
  branchCode: string;
}

/** Опция выпадающего списка выбора филиала. */
export const BranchOption = React.forwardRef<typeof Option, IOptionTemplateProps<BranchOptionProps>>(
  ({ option, customLabel, ...rest }, ref) => {
    const { branchCode, label } = option;

    return (
      <Option
        {...rest}
        ref={ref}
        customLabel={
          <Box>
            <Typography.P>{label}</Typography.P>
            <Typography.SmallText fill={'FAINT'}>{branchCode}</Typography.SmallText>
          </Box>
        }
        option={option}
      />
    );
  }
);

BranchOption.displayName = 'BranchOption';
