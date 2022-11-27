import type { StatementBranch } from 'interfaces/admin';
import type { BranchOptionProps } from 'pages/scroller/admin/closed-days/filter/branch-option';

/**
 * Возвращает опцию выбора филиала.
 *
 * @param branch - Филиал.
 * @param branch.branchCode - Код филиала.
 * @param branch.branchName - Название филиала.
 */
export const getBranchOption = ({ branchCode, branchName }: StatementBranch): BranchOptionProps => ({
  branchCode,
  label: branchName,
  value: branchCode,
});
