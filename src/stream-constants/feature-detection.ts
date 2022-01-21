/**
 * Определяет поддерживает ли браузер -webkit-line-clamp.
 *
 * Если константа будет инициализирована значением true,
 * то браузер поддерживает css свойство -webkit-line-clamp.
 */
export const IS_SUPPORTS_LINE_CLAMP = (() => {
  document.createElement('div').style.webkitLineClamp = '2';

  return document.body.style.webkitLineClamp !== undefined;
})();
