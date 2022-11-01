import type { FC } from 'react';
import React, { useCallback, useMemo, useState } from 'react';
import { ContentLoader, SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT, ScrollerPageLayout } from 'components/common';
import { FocusLock } from 'components/common/focus-lock';
import { FocusTree } from 'components/common/focus-tree';
import { useStreamContentHeight } from 'hooks/common';
import type { ClosedDayRow } from 'interfaces/admin';
import { locale } from 'localization';
import type { ClosedDaysContextProps } from 'pages/scroller/admin/closed-days/context';
import { ClosedDaysContext } from 'pages/scroller/admin/closed-days/context';
import { Table } from 'pages/scroller/admin/closed-days/table';
import type { IFetchDataParams, IFetchDataResponse } from 'platform-copies/services';
import { statementService } from 'services/admin';
import { COMMON_SCROLLER_NODE } from 'stream-constants/a11y-nodes';
import { convertTablePaginationToMetaData } from 'utils/common';
import type { IMetaData } from '@platform/services/admin';
import { MainLayout } from '@platform/services/admin';
import { Box } from '@platform/ui';

/**
 * [Выписки_ЗВ] ЭФ Банка "Журнал закрытых дней".
 *
 * @see https://confluence.gboteam.ru/pages/viewpage.action?pageId=34440041
 */
export const ClosedDaysScrollerPage: FC = () => {
  const [total, setTotal] = useState(0);
  const [tableDataInitialed, setTableDataInitialed] = useState(false);

  const height = useStreamContentHeight();

  const tableHeight = height - SCROLLER_PAGE_LAYOUT_HEADER_HEIGHT;

  const headerProps = {
    header: locale.admin.closedDaysScroller.pageTitle,
  };

  /** Метод делает запрос закрытых дней на сервер. */
  const fetch = useCallback(async ({ page: pageIndex, multiSort, pageSize }: IFetchDataParams): Promise<
    IFetchDataResponse<ClosedDayRow>
  > => {
    try {
      const metaData: IMetaData = {
        multiSort,
        ...convertTablePaginationToMetaData({ pageIndex, pageSize }),
      };

      const { data: rows, total: totalItems } = await statementService.getClosedDays(metaData);

      setTotal(totalItems);

      return { rows, pageCount: totalItems };
    } catch {
      return { rows: [], pageCount: 0 };
    } finally {
      if (!tableDataInitialed) {
        setTableDataInitialed(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue: ClosedDaysContextProps = useMemo(() => ({ fetch, total }), [fetch, total]);

  return (
    <ClosedDaysContext.Provider value={contextValue}>
      <MainLayout>
        <FocusLock>
          <FocusTree treeId={COMMON_SCROLLER_NODE}>
            <ScrollerPageLayout headerProps={headerProps}>
              <ContentLoader height={tableHeight} loading={!tableDataInitialed}>
                <Box />
              </ContentLoader>
              <Table />
            </ScrollerPageLayout>
          </FocusTree>
        </FocusLock>
      </MainLayout>
    </ClosedDaysContext.Provider>
  );
};

ClosedDaysScrollerPage.displayName = 'ClosedDaysScrollerPage';
