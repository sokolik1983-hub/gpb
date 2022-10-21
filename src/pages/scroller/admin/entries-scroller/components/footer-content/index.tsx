// import React, { useMemo } from 'react';
// import type { BankAccountingEntryGroup } from 'interfaces/admin/dto/bank-accounting-entry-group';
// import { locale } from 'localization';
// import { formatMoney, bigNumber } from '@platform/tools/big-number';
// import { Horizon, Typography, Gap } from '@platform/ui';
// import type { ITooltipPanelAccounts, ITooltipInfo } from './account-fields-with-tooltip-panel';
// import { AccountFieldsWithTooltipPanel } from './account-fields-with-tooltip-panel';
//
// interface IFooterContent {
//   /** Выбранные строки скроллера. */
//   selectedRows: BankAccountingEntryGroup[];
// }
//
// export const FooterContent: React.FC<IFooterContent> = ({ selectedRows }) => {
//   const amount: string = useMemo(
//     () => selectedRows.reduce((acc, item) => acc.plus(item?.paymentAmount?.paymentAmountIncludeVat ?? 0), bigNumber(0)).toString(),
//     [selectedRows]
//   );
//
//   // https://confluence.gboteam.ru/pages/viewpage.action?pageId=27525525
//   const payments: ITooltipInfo[] = useMemo(() => {
//     const paymentsByClientId = selectedRows.reduce<Record<string, { name: string; accounts: Record<string, ITooltipPanelAccounts> }>>(
//       (acc, item) => {
//         const { bankClientId, payerDetails: { accountNumber, name } = {}, paymentAmount: { paymentAmountIncludeVat = '0' } = {} } = item;
//
//         if (!bankClientId || !accountNumber) {
//           return acc;
//         }
//
//         const newAccount = {
//           count: 1,
//           account: accountNumber,
//           amount: paymentAmountIncludeVat,
//         };
//
//         if (bankClientId in acc) {
//           const payment = acc[bankClientId];
//           const account = payment.accounts[accountNumber];
//
//           acc[bankClientId] = {
//             name: payment.name,
//             accounts: {
//               ...payment.accounts,
//               [accountNumber]: account
//                 ? {
//                     ...account,
//                     count: account.count + 1,
//                     amount: bigNumber(account.amount).plus(paymentAmountIncludeVat).toString(),
//                   }
//                 : newAccount,
//             },
//           };
//         } else {
//           acc[bankClientId] = {
//             name: name ?? '',
//             accounts: {
//               [accountNumber]: newAccount,
//             },
//           };
//         }
//
//         return acc;
//       },
//       {}
//     );
//
//     return Object.values(paymentsByClientId).map(item => ({ name: item.name, accounts: Object.values(item.accounts) }));
//   }, [selectedRows]);
//
//   return (
//     <Horizon data-id="table-footer">
//       <Typography.P>{locale.label.selected}</Typography.P>
//       <Gap.XS />
//       <Typography.PBold data-id="selected-rows-count">{selectedRows.length}</Typography.PBold>
//       <Gap.XL />
//       <Typography.P>{`${locale.label.amount}:`}</Typography.P>
//       <Gap.XS />
//       <Typography.PBold data-id="amount">{`${formatMoney(amount)} ₽`}</Typography.PBold>
//       <Gap.XL />
//       {/* Если выбраны документы по одному счету списания, то поле не отображается. */}
//       {!(payments.length === 1 && payments[0].accounts.length === 1) && <AccountFieldsWithTooltipPanel payments={payments} />}
//     </Horizon>
//   );
// };
//
// FooterContent.displayName = 'FooterContent';
