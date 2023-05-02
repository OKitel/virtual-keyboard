import qwertyLayout from '../layout/qwerty.js';
import store from '../shared/store.js';

const handleHidden = () => {
  const spansEng = document.querySelectorAll('.en');
  const spansRu = document.querySelectorAll('.ru');
  if (store.lang === 'en') {
    spansEng.forEach((item) => item.classList.remove('hidden'));
    spansRu.forEach((item) => item.classList.add('hidden'));
  } else if (store.lang === 'ru') {
    spansRu.forEach((item) => item.classList.remove('hidden'));
    spansEng.forEach((item) => item.classList.add('hidden'));
  }
};

export const handleKeyDown = (event) => {
  const { key } = event;
  const keyCode = event.code;
  const actKey = document.querySelector(`.${keyCode}`);

  if (!actKey) {
    return;
  }
  actKey.classList.add('pressed');

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
    if (pressedKey.code === 'MetaLeft') {
      store.textarea.insertChar('⊞');
    }
    if (pressedKey.code === 'Backspace') {
      store.textarea.deleteChar(pressedKey.code);
    }
    if (pressedKey.code === 'Delete') {
      store.textarea.deleteChar(pressedKey.code);
    }
  }

  if (key === 'Control') {
    store.isCtrlPressed = true;
  }

  if (key === 'Alt') {
    store.isAltPressed = true;
  }

  if (key === 'Shift' && !store.isCapsPressed) {
    const downs = document.querySelectorAll('.case-down');
    downs.forEach((item) => item.classList.add('hidden'));
    const caps = document.querySelectorAll('.caps');
    caps.forEach((item) => item.classList.add('hidden'));
    const shiftCaps = document.querySelectorAll('.shift-caps');
    shiftCaps.forEach((item) => item.classList.add('hidden'));
    const ups = document.querySelectorAll('.case-up');
    ups.forEach((item) => item.classList.remove('hidden'));
  } else if (key === 'Shift' && store.isCapsPressed) {
    const ups = document.querySelectorAll('.case-up');
    ups.forEach((item) => item.classList.add('hidden'));
    const downs = document.querySelectorAll('.case-down');
    downs.forEach((item) => item.classList.add('hidden'));
    const caps = document.querySelectorAll('.caps');
    caps.forEach((item) => item.classList.add('hidden'));
    const shiftCaps = document.querySelectorAll('.shift-caps');
    shiftCaps.forEach((item) => item.classList.remove('hidden'));
  }

  if (key === 'Shift') {
    store.isShiftPressed = true;
  }

  if (key === 'CapsLock') {
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
      actKey.classList.remove('pressed');
      store.isCapsPressed = false;
    }
  }

  if (store.isAltPressed && store.isCtrlPressed) {
    const temp = store.lang === 'en' ? 'ru' : 'en';
    localStorage.setItem('lang', temp);
    store.lang = localStorage.getItem('lang');
    handleHidden();
  }
};

export const handleKeyUp = (event) => {
  const { key } = event;

  const keyCode = event.code;

  const actKey = document.querySelector(`.${keyCode}`);

  if (!actKey) {
    return;
  }

  if (key !== 'CapsLock') {
    actKey.classList.remove('pressed');
  }

  if (key === 'Control') {
    store.isCtrlPressed = false;
  }
  if (key === 'Alt') {
    store.isAltPressed = false;
  }

  if (key === 'Shift' && !store.isCapsPressed) {
    const ups = document.querySelectorAll('.case-up');
    ups.forEach((item) => item.classList.add('hidden'));
    const caps = document.querySelectorAll('.caps');
    caps.forEach((item) => item.classList.add('hidden'));
    const shiftCaps = document.querySelectorAll('.shift-caps');
    shiftCaps.forEach((item) => item.classList.add('hidden'));
    const downs = document.querySelectorAll('.case-down');
    downs.forEach((item) => item.classList.remove('hidden'));
  } else if (key === 'Shift' && store.isCapsPressed) {
    const downs = document.querySelectorAll('.case-down');
    downs.forEach((item) => item.classList.add('hidden'));
    const ups = document.querySelectorAll('.case-up');
    ups.forEach((item) => item.classList.add('hidden'));
    const shiftCaps = document.querySelectorAll('.shift-caps');
    shiftCaps.forEach((item) => item.classList.add('hidden'));
    const caps = document.querySelectorAll('.caps');
    caps.forEach((item) => item.classList.remove('hidden'));
  }

  if (key === 'Shift') {
    store.isShiftPressed = false;
  }
};
