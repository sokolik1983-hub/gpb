import type { FC } from 'react';
import React from 'react';
import type { StatementHistoryCellProps } from 'pages/scroller/admin/statements/components/table/cells/types';
import { USER_TYPE_LABEL } from 'stream-constants/admin';
import { getFullName } from 'utils/common';
import { Typography } from '@platform/ui';
import css from './styles.scss';

/** Ячейка таблицы с пользователем. */
export const User: FC<StatementHistoryCellProps> = ({
  value: {
    user: { familyName, firstName, id, middleName, type },
  },
}) => (
  <>
    <Typography.P className={css.user__name} data-field={'userName'}>
      {getFullName([familyName, firstName, middleName])}
    </Typography.P>
    <Typography.SmallText className={css.user__id} data-field={'userId'}>
      ID {id}
    </Typography.SmallText>
    <Typography.SmallText data-field={'userType'} fill="FAINT">
      {USER_TYPE_LABEL[type]}
    </Typography.SmallText>
  </>
);

User.displayName = 'User';
