export default class Key {
  constructor(keyEn, keyRu) {
    this.keyEn = keyEn;
    this.keyRu = keyRu;
  }

  lang = localStorage.getItem('lang') || 'en';

  createSpans(key, lang) {
    const spanCaseDown = document.createElement('span');
    spanCaseDown.classList.add('case-down');
    spanCaseDown.textContent = key.key;

    const spanCaseUp = document.createElement('span');
    spanCaseUp.classList.add('case-up', 'hidden');
    spanCaseUp.textContent = key.shiftKey || key.key;

    const spanCaps = document.createElement('span');
    spanCaps.classList.add('caps', 'hidden');
    spanCaps.textContent = key.capsKey || key.key;

    const spanShiftCaps = document.createElement('span');
    spanShiftCaps.classList.add('shift-caps', 'hidden');
    spanShiftCaps.textContent = key.shiftKey === key.capsKey ? key.key : key.shiftKey;

    const span = document.createElement('span');
    span.classList.add(lang);
    if (this.lang !== lang) {
      span.classList.add('hidden');
    }

    span.appendChild(spanCaseDown);
    span.appendChild(spanCaseUp);
    span.appendChild(spanCaps);
    span.appendChild(spanShiftCaps);

    return span;
  }

  build() {
    const key = document.createElement('div');
    key.classList.add('keyboard__key', `${this.keyEn.code}`);
    key.dataset.code = this.keyEn.code;

    const spanEng = this.createSpans(this.keyEn, 'en');
    const spanRu = this.createSpans(this.keyRu, 'ru');

    key.appendChild(spanEng);
    key.appendChild(spanRu);

    return key;
  }
}
