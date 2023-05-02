import Key from './Key.js';
import qwertyLayout from '../layout/qwerty.js';
import { insertChar, deleteChar } from '../helpers/keyboardEvents.js';
import store from '../shared/store.js';

export default class Keyboard {
  constructor() {
    const keyboard = document.createElement('div');
    keyboard.classList.add(this.class);

    for (let i = 0; i < qwertyLayout.en.length; i += 1) {
      keyboard.appendChild(
        Keyboard.prepareRow(qwertyLayout.en[i], qwertyLayout.ru[i]),
      );
    }
    this.keyboard = keyboard;
  }

  class = 'keyboard';

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
      const layout = qwertyLayout[store.lang].flat();
      const pressedKey = layout.find((el) => el.code === keyCode);
      if (!pressedKey) return;
      event.preventDefault();

      if (!pressedKey.isModifier) {
        if (!store.isCapsPressed && !store.isShiftPressed) {
          insertChar(pressedKey.key);
        } else if (store.isCapsPressed && store.isShiftPressed) {
          if (pressedKey.key === pressedKey.capsKey) {
            insertChar(pressedKey.shiftKey);
          } else {
            insertChar(pressedKey.key);
          }
        } else if (store.isShiftPressed) {
          insertChar(pressedKey.shiftKey);
        } else if (store.isCapsPressed) {
          insertChar(pressedKey.capsKey);
        }
      } else {
        if (pressedKey.code === 'Tab') {
          insertChar('\t');
        }
        if (pressedKey.code === 'Enter') {
          insertChar('\n');
        }
        if (pressedKey.code === 'Backspace') {
          deleteChar();
        }
      }
    }
  }

  static handleMouseDown(event) {
    const keyEl = event.target.closest('.keyboard__key');
    if (keyEl) {
      const keyCode = keyEl.dataset.code;
      const key = document.querySelector(`.${keyCode}`);
      key.classList.add('pressed');

      if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
        const ups = document.querySelectorAll('.case-up');
        ups.forEach((item) => item.classList.remove('hidden'));
        const downs = document.querySelectorAll('.case-down');
        downs.forEach((item) => item.classList.add('hidden'));
      }

      if (keyCode === 'CapsLock') {
        if (!this.isCapsPressed) {
          const caps = document.querySelectorAll('.caps');
          caps.forEach((item) => item.classList.remove('hidden'));
          const downs = document.querySelectorAll('.case-down');
          downs.forEach((item) => item.classList.add('hidden'));
          const ups = document.querySelectorAll('.case-up');
          ups.forEach((item) => item.classList.add('hidden'));
          this.isCapsPressed = true;
        } else {
          const caps = document.querySelectorAll('.caps');
          caps.forEach((item) => item.classList.add('hidden'));
          const downs = document.querySelectorAll('.case-down');
          downs.forEach((item) => item.classList.remove('hidden'));
          key.classList.remove('pressed');
          this.isCapsPressed = false;
        }
      }
    }
  }

  static handleMouseUp(event) {
    const keyEl = event.target.closest('.keyboard__key');
    if (keyEl) {
      const keyCode = keyEl.dataset.code;
      const key = document.querySelector(`.${keyCode}`);
      if (keyCode !== 'CapsLock') {
        key.classList.remove('pressed');
      }

      if (keyCode === 'ShiftLeft' || keyCode === 'ShiftRight') {
        const downs = document.querySelectorAll('.case-down');
        downs.forEach((item) => item.classList.remove('hidden'));
        const ups = document.querySelectorAll('.case-up');
        ups.forEach((item) => item.classList.add('hidden'));
      }
    }
  }

  addListeners() {
    this.keyboard.addEventListener('click', Keyboard.handleClick.bind(this));
    this.keyboard.addEventListener('mousedown', Keyboard.handleMouseDown);
    this.keyboard.addEventListener('mouseup', Keyboard.handleMouseUp);
    document.addEventListener('mouseup', () => {
      const keys = document.querySelectorAll('.keyboard__key');
      keys.forEach((item) => {
        if (!item.classList.contains('CapsLock')) {
          item.classList.remove('pressed');
        }
      });
    });
  }
}
