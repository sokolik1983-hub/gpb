import React, { useContext } from 'react';
import { locale } from 'localization';
import { Box, Checkbox, Gap, Horizon, Typography } from '@platform/ui';
import { EntriesScrollerContext } from '../../context';
import { GroupBy } from '../group-by';

/** Компонент для отображения кол-ва выбранных и общего кол-ва строк. */
export const TableRowsInfo: React.FC = () => {
  const { total, selectedRows, visibleOnlySelectedRows, setVisibleOnlySelectedRows } = useContext(EntriesScrollerContext);

  return (
    <Box>
      <Gap.SM />
      <Horizon>
        <Gap />
        <Gap />
        <Typography.TextBold>{locale.admin.entryScroller.total}</Typography.TextBold>
        <Gap.X2S />
        <Typography.Text>{total}</Typography.Text>
        <Horizon.Spacer />
        <GroupBy />
        {selectedRows.length > 0 && (
          <>
            <Gap />
            <Checkbox
              extraSmall
              dimension="SM"
              label={locale.admin.entryScroller.showOnlySelectedRows}
              name="onlySelectedRowsCheckbox"
              value={visibleOnlySelectedRows}
              onChange={() => setVisibleOnlySelectedRows(!visibleOnlySelectedRows)}
            />
          </>
        )}
        <Gap />
        <Gap />
      </Horizon>
      <Gap.SM />
    </Box>
  );
};

TableRowsInfo.displayName = 'TableRowsInfo';
