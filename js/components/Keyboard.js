import Key from './Key.js';
import qwertyLayout from '../layout/qwerty.js';
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
          store.textarea.insertChar(pressedKey.key);
        } else if (store.isCapsPressed && store.isShiftPressed) {
          if (pressedKey.key === pressedKey.capsKey) {
            store.textarea.insertChar(pressedKey.shiftKey || pressedKey.key);
          } else {
            store.textarea.insertChar(pressedKey.key);
          }
        } else if (store.isShiftPressed) {
          store.textarea.insertChar(pressedKey.shiftKey || pressedKey.key);
        } else if (store.isCapsPressed) {
          store.textarea.insertChar(pressedKey.capsKey || pressedKey.key);
        }
      } else {
        if (pressedKey.code === 'Tab') {
          store.textarea.insertChar('\t');
        }
        if (pressedKey.code === 'Enter') {
          store.textarea.insertChar('\n');
        }
        if (pressedKey.code === 'Backspace') {
          store.textarea.deleteChar(pressedKey.code);
        }
        if (pressedKey.code === 'Delete') {
          store.textarea.deleteChar(pressedKey.code);
        }
        if (pressedKey.code === 'MetaLeft') {
          store.textarea.insertChar('⊞');
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

      const isShiftClicked = keyCode === 'ShiftLeft' || keyCode === 'ShiftRight';
      const isCapsClicked = keyCode === 'CapsLock';

      if (
        (isShiftClicked && store.isCapsPressed)
        || (isCapsClicked && store.isShiftPressed)
      ) {
        const caps = document.querySelectorAll('.caps');
        caps.forEach((item) => item.classList.add('hidden'));
        const downs = document.querySelectorAll('.case-down');
        downs.forEach((item) => item.classList.add('hidden'));
        const ups = document.querySelectorAll('.case-up');
        ups.forEach((item) => item.classList.add('hidden'));
        const shiftCaps = document.querySelectorAll('.shift-caps');
        shiftCaps.forEach((item) => item.classList.remove('hidden'));
        if (isCapsClicked) {
          store.isCapsPressed = !store.isCapsPressed;
        }
        return;
      }

      if (isShiftClicked) {
        const ups = document.querySelectorAll('.case-up');
        ups.forEach((item) => item.classList.remove('hidden'));
        const downs = document.querySelectorAll('.case-down');
        downs.forEach((item) => item.classList.add('hidden'));
      }

      if (isCapsClicked) {
        if (!store.isCapsPressed) {
          const caps = document.querySelectorAll('.caps');
          caps.forEach((item) => item.classList.remove('hidden'));
          const downs = document.querySelectorAll('.case-down');
          downs.forEach((item) => item.classList.add('hidden'));
          const ups = document.querySelectorAll('.case-up');
          ups.forEach((item) => item.classList.add('hidden'));
          store.isCapsPressed = true;
        } else {
          const caps = document.querySelectorAll('.caps');
          caps.forEach((item) => item.classList.add('hidden'));
          const downs = document.querySelectorAll('.case-down');
          downs.forEach((item) => item.classList.remove('hidden'));
          key.classList.remove('pressed');
          store.isCapsPressed = false;
        }
      }
    }
  }

  static handleMouseUp(event) {
    const keyEl = event.target.closest('.keyboard__key');
    if (keyEl) {
      const keyCode = keyEl.dataset.code;
      const isShiftReleased = keyCode === 'ShiftLeft' || keyCode === 'ShiftRight';

      if (isShiftReleased) {
        if (!store.isCapsPressed) {
          const downs = document.querySelectorAll('.case-down');
          downs.forEach((item) => item.classList.remove('hidden'));
          const ups = document.querySelectorAll('.case-up');
          ups.forEach((item) => item.classList.add('hidden'));
        } else {
          const caps = document.querySelectorAll('.caps');
          caps.forEach((item) => item.classList.remove('hidden'));
          const shiftCaps = document.querySelectorAll('.shift-caps');
          shiftCaps.forEach((item) => item.classList.add('hidden'));
        }
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
