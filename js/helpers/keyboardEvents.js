let lang = localStorage.getItem('lang') || 'en';
let isCtrlPressed = false;
let isAltPressed = false;
let isCapsPressed = false;

const handleHidden = () => {
  const spansEng = document.querySelectorAll('.eng');
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

export const handleKeyDown = (event) => {
  const { key } = event;
  const keyCode = event.code;
  const actKey = document.querySelector(`.${keyCode}`);
  actKey.classList.add('pressed');

  insertChar(key);

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
