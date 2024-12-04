export default class Text {
  value = {
    os: 'Клавиатура создана в операционной системе Windows',
    lang: 'Для переключения языка комбинация: левыe Ctrl + Alt',
  };

  build() {
    const pOS = document.createElement('p');
    const pLang = document.createElement('p');
    pOS.textContent = this.value.os;
    pLang.textContent = this.value.lang;
    const div = document.createElement('div');
    div.appendChild(pOS);
    div.appendChild(pLang);
    return div;
  }
}
