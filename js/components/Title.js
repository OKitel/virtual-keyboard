export default class Title {
  value = 'Виртуальная клавиатура';

  build() {
    const h1 = document.createElement('h1');
    h1.textContent = this.value;
    return h1;
  }
}
