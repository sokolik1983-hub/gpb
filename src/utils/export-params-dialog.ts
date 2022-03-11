import { ACTION, EXPORT_PARAMS_USE_CASES } from 'interfaces/client';

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
export const fileFormatShowCases = [EXPORT_PARAMS_USE_CASES.ONE];

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

/** Набор случаев, при которых показываем кнопку "Скачать". */
export const downloadButtonShowCases = [
  EXPORT_PARAMS_USE_CASES.ONE,
  EXPORT_PARAMS_USE_CASES.THREE,
  EXPORT_PARAMS_USE_CASES.SEVEN,
  EXPORT_PARAMS_USE_CASES.TEN,
  EXPORT_PARAMS_USE_CASES.TWELVE,
];

/** Набор случаев, при которых показываем кнопку "Печать". */
export const printButtonShowCases = [EXPORT_PARAMS_USE_CASES.TWO, EXPORT_PARAMS_USE_CASES.FOUR, EXPORT_PARAMS_USE_CASES.SIX];

/** Набор случаев, при которых НЕ отображаем ЭФ настроек экспорта. */
export const hideExportParamsDialogCases = [
  EXPORT_PARAMS_USE_CASES.NINE,
  EXPORT_PARAMS_USE_CASES.TEN,
  EXPORT_PARAMS_USE_CASES.TWELVE,
  EXPORT_PARAMS_USE_CASES.THIRTEEN,
  EXPORT_PARAMS_USE_CASES.FOURTEEN,
];

/** Получить набор случаев, при которых скрываем флаг "С электронной подписью Банка в формате PDF". */
export const getHideEsignCases = (action: ACTION) => {
  if (action === ACTION.PRINT) {
    return [EXPORT_PARAMS_USE_CASES.FOUR, EXPORT_PARAMS_USE_CASES.SIX];
  }

  return [EXPORT_PARAMS_USE_CASES.THREE, EXPORT_PARAMS_USE_CASES.SEVEN];
};

/** Получить набор случаев, при которых скрываем флаг "Отдельным файлом по каждому счёту". */
export const getHideSeparateAccountFilesCases = (action: ACTION) => {
  if (action === ACTION.PRINT) {
    return [EXPORT_PARAMS_USE_CASES.TWO, EXPORT_PARAMS_USE_CASES.FOUR, EXPORT_PARAMS_USE_CASES.SIX];
  }

  return [EXPORT_PARAMS_USE_CASES.ONE, EXPORT_PARAMS_USE_CASES.THREE, EXPORT_PARAMS_USE_CASES.SEVEN];
};

/** Получить набор случаев, при которых скрываем флаг "Скрыть нулевые обороты"". */
export const getHideEmptyTurnoverCases = getHideSeparateAccountFilesCases;

/** Набор случаев, для которых безусловно отправляем параметры комплекта документов для ЭФ. */
export const alwaysSendParamCasesFromUI = [
  EXPORT_PARAMS_USE_CASES.THREE,
  EXPORT_PARAMS_USE_CASES.FOUR,
  EXPORT_PARAMS_USE_CASES.SIX,
  EXPORT_PARAMS_USE_CASES.SEVEN,
];

/** Набор случаев, для которых безусловно отправляем параметры комплекта документов вне ЭФ. */
export const alwaysSentParamsCasesWithoutUI = [
  EXPORT_PARAMS_USE_CASES.NINE,
  EXPORT_PARAMS_USE_CASES.TEN,
  EXPORT_PARAMS_USE_CASES.TWELVE,
  EXPORT_PARAMS_USE_CASES.THIRTEEN,
];
