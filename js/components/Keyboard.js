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

  lang = localStorage.getItem('lang');

  class = 'keyboard';

  isCapsPressed = false;

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
      console.log(keyCode, 'TODO textarea insert');
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
    this.keyboard.addEventListener('click', Keyboard.handleClick);
    this.keyboard.addEventListener('mousedown', Keyboard.handleMouseDown);
    this.keyboard.addEventListener('mouseup', Keyboard.handleMouseUp);
  }
}
