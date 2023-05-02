import qwertyLayout from '../layout/qwerty.js';

let lang = localStorage.getItem('lang') || 'en';
let isCtrlPressed = false;
let isAltPressed = false;
let isCapsPressed = false;

const handleHidden = () => {
  const spansEng = document.querySelectorAll('.en');
  const spansRu = document.querySelectorAll('.ru');
  if (lang === 'en') {
    spansEng.forEach((item) => item.classList.remove('hidden'));
    spansRu.forEach((item) => item.classList.add('hidden'));
  } else if (lang === 'ru') {
    spansRu.forEach((item) => item.classList.remove('hidden'));
    spansEng.forEach((item) => item.classList.add('hidden'));
  }
};

const insertChar = (char) => {
  const textarea = document.getElementById('keyboard-input');
  const curValue = textarea.value;
  const modifiedValue = curValue + char;
  textarea.value = modifiedValue;
};

const deleteChar = () => {
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

  const layout = qwertyLayout[lang].flat();
  const pressedKey = layout.find((el) => el.code === keyCode);
  if (!pressedKey) return;
  event.preventDefault();

  if (!pressedKey.isModifier) {
    insertChar(pressedKey.key);
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

  if (key === 'Control') {
    isCtrlPressed = true;
  }

  if (key === 'Alt') {
    isAltPressed = true;
  }

  if (key === 'Shift' && !isCapsPressed) {
    const ups = document.querySelectorAll('.case-up');
    ups.forEach((item) => item.classList.remove('hidden'));
    const downs = document.querySelectorAll('.case-down');
    downs.forEach((item) => item.classList.add('hidden'));
  } else if (key === 'Shift' && isCapsPressed) {
    const ups = document.querySelectorAll('.case-up');
    ups.forEach((item) => item.classList.add('hidden'));
    const downs = document.querySelectorAll('.case-down');
    downs.forEach((item) => item.classList.remove('hidden'));
    const caps = document.querySelectorAll('.caps');
    caps.forEach((item) => item.classList.add('hidden'));
  }

  if (key === 'CapsLock') {
    if (!isCapsPressed) {
      const caps = document.querySelectorAll('.caps');
      caps.forEach((item) => item.classList.remove('hidden'));
      const downs = document.querySelectorAll('.case-down');
      downs.forEach((item) => item.classList.add('hidden'));
      const ups = document.querySelectorAll('.case-up');
      ups.forEach((item) => item.classList.add('hidden'));
      isCapsPressed = true;
    } else {
      const caps = document.querySelectorAll('.caps');
      caps.forEach((item) => item.classList.add('hidden'));
      const downs = document.querySelectorAll('.case-down');
      downs.forEach((item) => item.classList.remove('hidden'));
      actKey.classList.remove('pressed');
      isCapsPressed = false;
    }
  }

  if (isAltPressed && isCtrlPressed) {
    const temp = lang === 'en' ? 'ru' : 'en';
    localStorage.setItem('lang', temp);
    lang = localStorage.getItem('lang');
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
    isCtrlPressed = false;
  }
  if (key === 'Alt') {
    isAltPressed = false;
  }

  if (key === 'Shift' && !isCapsPressed) {
    const downs = document.querySelectorAll('.case-down');
    downs.forEach((item) => item.classList.remove('hidden'));
    const ups = document.querySelectorAll('.case-up');
    ups.forEach((item) => item.classList.add('hidden'));
  } else if (key === 'Shift' && isCapsPressed) {
    const downs = document.querySelectorAll('.case-down');
    downs.forEach((item) => item.classList.add('hidden'));
    const ups = document.querySelectorAll('.case-up');
    ups.forEach((item) => item.classList.add('hidden'));
    const caps = document.querySelectorAll('.caps');
    caps.forEach((item) => item.classList.remove('hidden'));
  }
};
