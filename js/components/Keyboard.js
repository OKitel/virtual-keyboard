import Key from './Key.js';
import qwertyLayout from '../layout/qwerty.js';

export default class Keyboard {
  constructor() {
    const keyboard = document.createElement('div');
    keyboard.classList.add(this.class);

    for (let i = 0; i < qwertyLayout[this.lang].length; i += 1) {
      keyboard.appendChild(
        Keyboard.prepareRow(qwertyLayout.en[i], qwertyLayout.ru[i]),
      );
    }
    this.keyboard = keyboard;
  }

  lang = 'en';

  class = 'keyboard';

  rows = 5;

  static prepareRow(keysEn, keysRu) {
    const row = document.createElement('div');
    row.classList.add('keyboard__row');
    for (let i = 0; i < keysEn.length; i += 1) {
      const key = new Key(keysEn[i], keysRu[i]);
      row.appendChild(key.build());
    }
    return row;
  }

  build() {
    return this.keyboard;
  }

  static handleClick(event) {
    const keyEl = event.target.closest('.keyboard__key');
    if (keyEl) {
      const keyCode = keyEl.dataset.code;
      console.log(keyCode);
    }
  }

  static handleMouseDown(event) {
    const keyEl = event.target.closest('.keyboard__key');
    if (keyEl) {
      const keyCode = keyEl.dataset.code;
      const key = document.querySelector(`.${keyCode}`);
      key.classList.add('pressed');
    }
  }

  static handleMouseUp(event) {
    const keyEl = event.target.closest('.keyboard__key');
    if (keyEl) {
      const keyCode = keyEl.dataset.code;
      const key = document.querySelector(`.${keyCode}`);
      key.classList.remove('pressed');
    }
  }

  addListeners() {
    this.keyboard.addEventListener('click', Keyboard.handleClick);
    this.keyboard.addEventListener('mousedown', Keyboard.handleMouseDown);
    this.keyboard.addEventListener('mouseup', Keyboard.handleMouseUp);
  }
}
