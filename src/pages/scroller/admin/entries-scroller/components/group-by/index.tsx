import React, { useContext } from 'react';
import cn from 'classnames';
import { Box, Select } from '@platform/ui';
import { GROUP_BY_OPTIONS } from '../../constants';
import { EntriesScrollerContext } from '../../context';
import css from './styles.scss';

/** Компонент с выбором типа группировки. */
export const GroupBy: React.FC = () => {
  const { groupBy, setGroupBy } = useContext(EntriesScrollerContext);

  return (
    <Box className={cn(css.important, css.right)}>
      <Box className={css.wrapper}>
        <Select extraSmall className={css.select} name="groupBy" options={GROUP_BY_OPTIONS} value={groupBy} onChange={setGroupBy} />
      </Box>
    </Box>
  );
};

GroupBy.displayName = 'GroupBy';
