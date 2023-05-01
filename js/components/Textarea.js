export default class Textarea {
  value = {
    name: 'keyboard-input',
    id: 'keyboard-input',
    cols: '50',
    rows: '10',
  };

  build() {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('name', this.value.name);
    textarea.setAttribute('id', this.value.id);
    textarea.setAttribute('cols', this.value.cols);
    textarea.setAttribute('rows', this.value.rows);
    return textarea;
  }
}
