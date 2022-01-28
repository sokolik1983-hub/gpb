import { EXPORT_PARAMS_USE_CASES } from 'components/export-params-dialog/statemet-params-use-cases';

/** Набор случаев для отображения ЭФ в режиме экспорта. */
export const exportCases = [
  EXPORT_PARAMS_USE_CASES.ONE,
  EXPORT_PARAMS_USE_CASES.THREE,
  EXPORT_PARAMS_USE_CASES.FIVE,
  EXPORT_PARAMS_USE_CASES.SEVEN,
  EXPORT_PARAMS_USE_CASES.EIGHT,
  EXPORT_PARAMS_USE_CASES.TEN,
  EXPORT_PARAMS_USE_CASES.ELEVEN,
  EXPORT_PARAMS_USE_CASES.TWELVE,
];

/** Набор случаев, при которых показываем компонент выбора формата файла. */
export const fileFormatShowCases = [
  EXPORT_PARAMS_USE_CASES.ONE,
  EXPORT_PARAMS_USE_CASES.THREE,
  EXPORT_PARAMS_USE_CASES.SEVEN,
  EXPORT_PARAMS_USE_CASES.TEN,
  EXPORT_PARAMS_USE_CASES.TWELVE,
];

/** Набор случаев, при которых показываем флаг "Скрыть нулевые обороты". */
export const hideEmptyTurnoversCheckboxShowCases = [EXPORT_PARAMS_USE_CASES.ONE, EXPORT_PARAMS_USE_CASES.TWO];

/** Набор случаев, при которых показываем флаг "С электронной подписью Банка в формате PDF". */
export const esignCheckboxShowCases = [EXPORT_PARAMS_USE_CASES.ONE, EXPORT_PARAMS_USE_CASES.TWO];

/** Набор случаев, при которых показываем флаг "С комплектом документов". */
export const creationParamsCheckboxShowCases = [
  EXPORT_PARAMS_USE_CASES.ONE,
  EXPORT_PARAMS_USE_CASES.TWO,
  EXPORT_PARAMS_USE_CASES.THREE,
  EXPORT_PARAMS_USE_CASES.FOUR,
  EXPORT_PARAMS_USE_CASES.SIX,
  EXPORT_PARAMS_USE_CASES.SEVEN,
];

/** Набор случаев, при которых показываем блок "Параметры комплекта документов". */
export const creationParamsShowCases = [
  EXPORT_PARAMS_USE_CASES.ONE,
  EXPORT_PARAMS_USE_CASES.TWO,
  EXPORT_PARAMS_USE_CASES.THREE,
  EXPORT_PARAMS_USE_CASES.FOUR,
  EXPORT_PARAMS_USE_CASES.SIX,
  EXPORT_PARAMS_USE_CASES.SEVEN,
];

/** Набор случаев, при которых показываем блок "Детальные параметры комплекта документов". */
export const detailDocumentsParamsShowCases = [
  EXPORT_PARAMS_USE_CASES.ONE,
  EXPORT_PARAMS_USE_CASES.TWO,
  EXPORT_PARAMS_USE_CASES.THREE,
  EXPORT_PARAMS_USE_CASES.FOUR,
  EXPORT_PARAMS_USE_CASES.SIX,
  EXPORT_PARAMS_USE_CASES.SEVEN,
];

/** Набор случаев, при которых показываем блок "Адрес электронной почты". */
export const emailShowCases = [
  EXPORT_PARAMS_USE_CASES.ONE,
  EXPORT_PARAMS_USE_CASES.THREE,
  EXPORT_PARAMS_USE_CASES.FIVE,
  EXPORT_PARAMS_USE_CASES.SEVEN,
  EXPORT_PARAMS_USE_CASES.EIGHT,
  EXPORT_PARAMS_USE_CASES.ELEVEN,
];

/** Набор случаев, при которых показываем кнопку "Скачать". */
export const downloadButtonShowCases = [
  EXPORT_PARAMS_USE_CASES.ONE,
  EXPORT_PARAMS_USE_CASES.THREE,
  EXPORT_PARAMS_USE_CASES.SEVEN,
  EXPORT_PARAMS_USE_CASES.TEN,
  EXPORT_PARAMS_USE_CASES.TWELVE,
];

/** Набор случаев, при которых показываем кнопку "Отправить на почту". */
export const sendToEmailButtonShowCases = [EXPORT_PARAMS_USE_CASES.FIVE, EXPORT_PARAMS_USE_CASES.EIGHT, EXPORT_PARAMS_USE_CASES.ELEVEN];

/** Набор случаев, при которых показываем кнопку "Печать". */
export const printButtonShowCases = [EXPORT_PARAMS_USE_CASES.TWO, EXPORT_PARAMS_USE_CASES.FOUR, EXPORT_PARAMS_USE_CASES.SIX];
