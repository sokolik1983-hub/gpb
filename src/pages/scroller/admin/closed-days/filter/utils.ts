import type { ServiceBranch } from 'interfaces/admin';
import type { BranchOptionProps } from 'pages/scroller/admin/closed-days/filter/branch-option';

/**
 * Возвращает опцию выбора филиала.
 *
 * @param branch - Филиал.
 * @param branch.absNumber - Код филиала в РКО Ф1.
 * @param branch.filialName - Название филиала.
 * @param branch.id - Идентификатор.
 */
export const getBranchOption = ({ absNumber, filialName, id }: ServiceBranch): BranchOptionProps => ({
  absNumber,
  label: filialName,
  value: id,
});
