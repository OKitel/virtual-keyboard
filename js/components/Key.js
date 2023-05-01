export default class Key {
  constructor(key) {
    this.key = key;
  }

  build() {
    const key = document.createElement('div');
    key.classList.add('keyboard__key', `${this.key.code}`);
    const spanEng = document.createElement('span');
    spanEng.classList.add('eng');

    const spanCaseDown = document.createElement('span');
    spanCaseDown.classList.add('case-down');
    spanCaseDown.textContent = this.key.key;

    const spanCaseUp = document.createElement('span');
    spanCaseUp.classList.add('case-up', 'hidden');
    spanCaseUp.textContent = this.key.shiftKey;

    const spanCaps = document.createElement('span');
    spanCaps.classList.add('caps', 'hidden');
    spanCaps.textContent = this.key.capsKey;

    const spanShiftCaps = document.createElement('span');
    spanShiftCaps.classList.add('shift-caps', 'hidden');
    spanShiftCaps.textContent = this.key.key;

    spanEng.appendChild(spanCaseDown);
    spanEng.appendChild(spanCaseUp);
    spanEng.appendChild(spanCaps);
    spanEng.appendChild(spanShiftCaps);

    key.appendChild(spanEng);
    return key;
  }
}
