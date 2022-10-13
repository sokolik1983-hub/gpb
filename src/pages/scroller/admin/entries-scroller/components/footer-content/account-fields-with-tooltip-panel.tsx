// import React, { useCallback, useMemo, useState } from 'react';
// import { locale } from 'localization';
// import { formatMoney } from '@platform/tools/big-number';
// import { formatAccountCode } from '@platform/tools/localization';
// import { CONTAINER_POSITION, Gap, Horizon, Link, Tooltip, Typography, WithTooltip } from '@platform/ui';
//
// /** Список со счетами. */
// export interface ITooltipPanelAccounts {
//   /** Количество платежек. */
//   count: number;
//   /** Номер счета. */
//   account: string;
//   /** Сумма по счету. */
//   amount: string;
// }
// /** Список счетов. */
// export interface ITooltipInfo {
//   /** Название организации. */
//   name: string;
//   /** Список со счетами. */
//   accounts: ITooltipPanelAccounts[];
// }
// /** Пропсы для AccountFieldsWithTooltipPanel. */
// export interface IAccountFieldsWithTooltipPanelProps {
//   /** Список счетов. */
//   payments: ITooltipInfo[];
// }
//
// /**
//  * Компонент отвечает за строку в подсказке.
//  *
//  * @example  <RowAccountField key={props.account} {...props} />
//  */
// const RowAccountField: React.FC<ITooltipPanelAccounts> = ({ account, count, amount }) => (
//   <>
//     <Horizon>
//       <Typography.P>{formatAccountCode(account)}</Typography.P>
//       <Gap.XS />
//       <Typography.P>-</Typography.P>
//       <Gap.XS />
//       <Typography.PBold>{count}</Typography.PBold>
//       <Gap.SM />
//       <Typography.P>{`${locale.title.forTheAmount}: `}</Typography.P>
//       <Gap.SM />
//       <Typography.PBold>{formatMoney(amount)} ₽</Typography.PBold>
//     </Horizon>
//     <Gap.SM />
//   </>
// );
//
// /**
//  * Компонент отвечает за отображение счетов с подсказкой.
//  *
//  * @example <AccountFieldsWithTooltipPanel payments={payments} />
//  */
// export const AccountFieldsWithTooltipPanel: React.FC<IAccountFieldsWithTooltipPanelProps> = ({ payments = [] }) => {
//   const [show, setShow] = useState(false);
//   const handleMouseEnter = useCallback(() => {
//     setShow(true);
//   }, []);
//   const handleMouseLeave = useCallback(() => {
//     setShow(false);
//   }, []);
//   const accountsCount = useMemo(() => {
//     const { accounts } = payments[0];
//     const maxVisibleAccountsLabel = 3;
//
//     if (payments.length === 1 && accounts && accounts.length <= maxVisibleAccountsLabel) {
//       return accounts.map(({ account }) => `**${account.slice(-4)}`).join(', ');
//     }
//
//     const count = payments.reduce((accumulator, currentValue) => accumulator + (currentValue.accounts?.length || 0), 0);
//
//     return payments.length > 1
//       ? locale.title.accountCount({
//           accountCount: count,
//           orgCount: payments.length,
//         })
//       : count;
//   }, [payments]);
//
//   return (
//     <WithTooltip
//       positioningOrder={[CONTAINER_POSITION.TOP_CENTER]}
//       tooltip={({ position }) => (
//         <Tooltip fieldName="accountList" position={position}>
//           {payments.map(({ name, accounts = [] }, index) => (
//             <>
//               <Typography.Text fill={'FAINT'}>{name}</Typography.Text>
//               <Gap.XS />
//               {accounts.map(props => (
//                 <RowAccountField key={props.account} {...props} />
//               ))}
//               {payments.length - 1 > index && <Gap.XL />}
//             </>
//           ))}
//         </Tooltip>
//       )}
//       visible={show}
//     >
//       {tooltipRef => (
//         <Horizon ref={tooltipRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//           <Typography.P>{locale.label.withAccount}:</Typography.P>
//           <Gap.XS />
//           <Link underlined="dashed">
//             <Typography.PBold fill={'ACCENT'}>{accountsCount}</Typography.PBold>
//           </Link>
//         </Horizon>
//       )}
//     </WithTooltip>
//   );
// };
//
// AccountFieldsWithTooltipPanel.displayName = 'AccountFieldsWithTooltipPanel';
