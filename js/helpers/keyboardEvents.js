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

export const insertChar = (char) => {
  const textarea = document.getElementById('keyboard-input');
  const curValue = textarea.value;
  const modifiedValue = curValue + char;
  textarea.value = modifiedValue;
};

export const deleteChar = () => {
  const textarea = document.getElementById('keyboard-input');
  const curValue = textarea.value;
  const modifiedValue = curValue.substring(0, curValue.length - 1);
  textarea.value = modifiedValue;
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
      insertChar(pressedKey.key);
    } else if (store.isCapsPressed && store.isShiftPressed) {
      if (pressedKey.key === pressedKey.capsKey) {
        insertChar(pressedKey.shiftKey || pressedKey.key);
      } else {
        insertChar(pressedKey.key);
      }
    } else if (store.isShiftPressed) {
      insertChar(pressedKey.shiftKey || pressedKey.key);
    } else if (store.isCapsPressed) {
      insertChar(pressedKey.capsKey || pressedKey.key);
    }
  } else {
    if (pressedKey.code === 'Tab') {
      insertChar('\t');
    }
    if (pressedKey.code === 'Enter') {
      insertChar('\n');
    }
    if (pressedKey.code === 'MetaLeft') {
      insertChar('⊞');
    }
    if (pressedKey.code === 'Backspace') {
      deleteChar();
    }
  }

  if (key === 'Control') {
    store.isCtrlPressed = true;
  }

  if (key === 'Alt') {
    store.isAltPressed = true;
  }

  if (key === 'Shift' && !store.isCapsPressed) {
    const ups = document.querySelectorAll('.case-up');
    ups.forEach((item) => item.classList.remove('hidden'));
    const downs = document.querySelectorAll('.case-down');
    downs.forEach((item) => item.classList.add('hidden'));
  } else if (key === 'Shift' && store.isCapsPressed) {
    const ups = document.querySelectorAll('.case-up');
    ups.forEach((item) => item.classList.add('hidden'));
    const downs = document.querySelectorAll('.case-down');
    downs.forEach((item) => item.classList.remove('hidden'));
    const caps = document.querySelectorAll('.caps');
    caps.forEach((item) => item.classList.add('hidden'));
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
    const downs = document.querySelectorAll('.case-down');
    downs.forEach((item) => item.classList.remove('hidden'));
    const ups = document.querySelectorAll('.case-up');
    ups.forEach((item) => item.classList.add('hidden'));
  } else if (key === 'Shift' && store.isCapsPressed) {
    const downs = document.querySelectorAll('.case-down');
    downs.forEach((item) => item.classList.add('hidden'));
    const ups = document.querySelectorAll('.case-up');
    ups.forEach((item) => item.classList.add('hidden'));
    const caps = document.querySelectorAll('.caps');
    caps.forEach((item) => item.classList.remove('hidden'));
  }

  if (key === 'Shift') {
    store.isShiftPressed = false;
  }
};
