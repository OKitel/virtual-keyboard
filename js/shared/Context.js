export default class Context {
  lang = localStorage.getItem('lang') || 'en';

  isCtrlPressed = false;

  isAltPressed = false;

  isCapsPressed = false;

  isShiftPressed = false;
}
