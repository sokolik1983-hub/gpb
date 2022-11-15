import type { FC } from 'react';
import React from 'react';
import { ItemWithRestInPopUp } from 'components/common';
import { locale } from 'localization';
import type { StatementHistoryCellProps } from 'pages/scroller/admin/statements/components/table/cells/types';
import { Gap, Typography } from '@platform/ui';
import css from './styles.scss';

/** Ячейка таблицы с информацией по организациям. */
export const Organizations: FC<StatementHistoryCellProps> = ({ value: { organizations } }) => {
  const items = organizations.map(({ name, inn }, index) => (
    <>
      {![0, 1].includes(index) && <Gap.XL />}
      <Typography.P className={css['organization-name']}>{name}</Typography.P>
      <Typography.Text fill={index > 0 ? 'FAINT' : 'BASE'}>{`${locale.admin.statementScroller.table.cell.inn}: ${inn}`}</Typography.Text>
    </>
  ));

  return <ItemWithRestInPopUp component={Typography.P} items={items} />;
};

Organizations.displayName = 'Organizations';
