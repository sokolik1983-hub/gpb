// FIXME https://github.com/zloirock/core-js/issues/780
// нужно обновить core-js до версии 3.6.4 или выше
// сейчас используется версия 3.23.3

(() => {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }
})();
