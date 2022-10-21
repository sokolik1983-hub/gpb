import React, { useContext } from 'react';
import { Box, Select } from '@platform/ui';
import { GROUP_BY_OPTIONS } from '../../constants';
import { EntriesScrollerContext } from '../../context';

/** Компонент с выбором типа группировки. */
export const GroupBy: React.FC = () => {
  const { groupBy, setGroupBy } = useContext(EntriesScrollerContext);

  return (
    <Box>
      <Select extraSmall name="groupBy" options={GROUP_BY_OPTIONS} value={groupBy} onChange={setGroupBy} />
    </Box>
  );
};

GroupBy.displayName = 'GroupBy';
