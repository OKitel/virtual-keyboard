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
    const key = event.target.closest('.keyboard__key');
    const keyCode = key.dataset.code;
    console.log(keyCode);
  }

  addListener() {
    this.keyboard.addEventListener('click', Keyboard.handleClick);
  }
}
