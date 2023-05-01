let lang = 'en';
let isCtrlPressed = false;
let isAltPressed = false;

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

export const handleKeyDown = (event) => {
  const { key } = event.key;
  const keyCode = event.code;

  const actKey = document.querySelector(`.${keyCode}`);
  actKey.classList.add('pressed');

  if (key === 'Control') {
    isCtrlPressed = true;
  }

  if (key === 'Alt') {
    isAltPressed = true;
  }

  if (isAltPressed && isCtrlPressed) {
    lang = lang === 'en' ? 'ru' : 'en';
    handleHidden();
  }
};

export const handleKeyUp = (event) => {
  const { key } = event.key;

  const keyCode = event.code;

  const actKey = document.querySelector(`.${keyCode}`);
  actKey.classList.remove('pressed');

  if (key === 'Control') {
    isCtrlPressed = false;
  }
  if (key === 'Alt') {
    isAltPressed = false;
  }
};
