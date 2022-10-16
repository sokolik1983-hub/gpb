import type { FC } from 'react';
import React from 'react';
import { USER_TYPE_LABEL } from 'stream-constants/admin';
import { getFullName } from 'utils/common';
import { Typography } from '@platform/ui';
import type { StatementHistoryCellProps } from './types';

/** Ячейка таблицы с пользователем. */
export const User: FC<StatementHistoryCellProps> = ({
  value: {
    user: { familyName, firstName, id, middleName, type },
  },
}) => (
  <>
    <Typography.P data-field={'userName'}>{getFullName([familyName, firstName, middleName])}</Typography.P>
    <Typography.SmallText data-field={'userId'}>ID {id}</Typography.SmallText>
    <Typography.SmallText data-field={'userType'} fill="FAINT">
      {USER_TYPE_LABEL[type]}
    </Typography.SmallText>
  </>
);

User.displayName = 'User';