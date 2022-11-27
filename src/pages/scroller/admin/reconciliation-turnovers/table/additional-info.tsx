import type { FC } from 'react';
import React from 'react';
import type { ReconciliationTurnoverRow } from 'interfaces/admin';
import { locale } from 'localization';
import type { IExpandedRowComponentProps } from 'platform-copies/services';
import { Adjust, Box, FILL, Gap, Horizon, Pattern, Typography } from '@platform/ui';

/** Состояние значений. */
type ValueState = 'negative' | 'positive' | 'unsigned';

/** Конфиг структурированного вывода дополнительной информации сверки остатков/оборотов. */
const config: Record<
  keyof Pick<ReconciliationTurnoverRow, 'incomingBalance' | 'outgoingBalance' | 'turnoverCredit' | 'turnoverDebit'>,
  { fillCell: FILL; header: string; valueState: ValueState }
> = {
  incomingBalance: {
    fillCell: FILL.BASE,
    header: locale.admin.reconciliationTurnoversScroller.table.header.incomingBalance,
    valueState: 'unsigned',
  },
  turnoverDebit: {
    fillCell: FILL.CRITIC,
    header: locale.admin.reconciliationTurnoversScroller.table.header.turnoverDebit,
    valueState: 'negative',
  },
  turnoverCredit: {
    fillCell: FILL.SUCCESS,
    header: locale.admin.reconciliationTurnoversScroller.table.header.turnoverCredit,
    valueState: 'positive',
  },
  outgoingBalance: {
    fillCell: FILL.BASE,
    header: locale.admin.reconciliationTurnoversScroller.table.header.outgoingBalance,
    valueState: 'unsigned',
  },
};

/**
 * Получить значение суммы по типу его состояние.
 *
 * @param props - Входные данные.
 * @param props.amount - Сумма.
 * @param props.currencyCode - Код валюты.
 * @param props.state - Состояние значения суммы.
 */
const getAmountValue = ({ amount, currencyCode, state }: { amount: number; currencyCode: string; state: ValueState }): string => {
  if (state === 'positive') {
    return locale.moneyString.positive({ amount: String(amount), currencyCode });
  } else if (state === 'negative') {
    return locale.moneyString.negative({ amount: String(amount), currencyCode });
  }

  return locale.moneyString.unsigned({ amount: String(amount), currencyCode });
};

/** Дополнительная информация сверки остатков/оборотов. */
export const AdditionalInfo: FC<IExpandedRowComponentProps<ReconciliationTurnoverRow>> = ({ row }) => (
  <Box>
    <Horizon>
      <Gap />
      <Gap />
      <Box fill={'FAINT'} style={{ flexGrow: 1 }}>
        <Adjust pad={['MD', 'X3L', 'MD', null]}>
          <Pattern>
            {Object.keys(config).map(item => (
              <Pattern.Span key={item} size={2}>
                <Typography.Text align={'RIGHT'} fill={'FAINT'}>
                  {config[item].header}
                </Typography.Text>
              </Pattern.Span>
            ))}
          </Pattern>

          <Pattern>
            {Object.keys(config).map(item => (
              <Pattern.Span key={item} size={2}>
                <Typography.Text align={'RIGHT'} fill={config[item].fillCell}>
                  {getAmountValue({ amount: row[item], currencyCode: row.currencyCode, state: config[item].valueState })}
                </Typography.Text>
              </Pattern.Span>
            ))}
          </Pattern>
        </Adjust>
      </Box>
    </Horizon>
    <Gap.SM />
  </Box>
);
