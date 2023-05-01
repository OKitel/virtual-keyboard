import Key from './Key.js';
import qwertyLayout from '../layout/qwerty.js';

export default class Keyboard {
  class = 'keyboard';

  rows = 5;

  static prepareRow(keys) {
    const row = document.createElement('div');
    row.classList.add('keyboard__row');
    for (let i = 0; i < keys.length; i += 1) {
      const key = new Key(keys[i]);
      row.appendChild(key.build());
    }
    return row;
  }

  build() {
    const keyboard = document.createElement('div');
    keyboard.classList.add(this.class);

    for (let i = 0; i < qwertyLayout.en.length; i += 1) {
      keyboard.appendChild(Keyboard.prepareRow(qwertyLayout.en[i]));
    }
    return keyboard;
  }
}
