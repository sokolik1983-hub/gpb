import { conformToMask } from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import { MASK_INPUT_TYPE } from '@platform/ui';

const d = /\d/;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const moneyMask = createNumberMask({
  integerLimit: 16,
  decimalCount: 2,
  requireDecimal: false,
  allowDecimal: true,
  allowLeadingZeroes: true,
  signAllowed: false,
  prefix: '',
  thousandsSeparatorSymbol: ' ',
  allowNegative: true,
});

/**
 * Маска счёта.
 */
const accountMask = [d, d, d, d, d, '.', d, d, d, '.', d, '.', d, d, d, d, d, d, d, d, d, d, d];

/**
 * Маска в зависимости от типа поля.
 */
const MASK_BY_TYPE = {
  [MASK_INPUT_TYPE.ACCOUNT]: accountMask,
  [MASK_INPUT_TYPE.MONEY]: moneyMask,
};

/**
 * Функция форматирования значения в маску.
 */
export const formatToMask = (value: string | undefined, maskType: keyof typeof MASK_BY_TYPE) =>
  conformToMask(value || '', MASK_BY_TYPE[maskType], {
    guide: false,
  });
