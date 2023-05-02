export default class Textarea {
  constructor() {
    const textarea = document.createElement('textarea');
    textarea.setAttribute('name', this.attrs.name);
    textarea.setAttribute('id', this.attrs.id);
    textarea.setAttribute('cols', this.attrs.cols);
    textarea.setAttribute('rows', this.attrs.rows);
    this.textarea = textarea;
  }

  attrs = {
    name: 'keyboard-input',
    id: 'keyboard-input',
    cols: '50',
    rows: '10',
  };

  insertChar(char) {
    const cursorPosition = this.textarea.selectionStart;
    const curValue = this.textarea.value;
    const beforeCursor = curValue.slice(0, this.textarea.selectionStart);
    const afterCursor = curValue.slice(this.textarea.selectionEnd);
    const modifiedValue = beforeCursor + char + afterCursor;
    this.textarea.value = modifiedValue;
    this.textarea.selectionStart = cursorPosition + 1;
    this.textarea.selectionEnd = cursorPosition + 1;
  }

  deleteChar = (key) => {
    const cursorPosition = this.textarea.selectionStart;
    const curValue = this.textarea.value;
    const beforeCursor = curValue.slice(0, this.textarea.selectionStart);
    const afterCursor = curValue.slice(this.textarea.selectionEnd);

    if (key === 'Backspace') {
      const modifiedValue = beforeCursor.substring(0, beforeCursor.length - 1) + afterCursor;
      this.textarea.value = modifiedValue;
      this.textarea.selectionStart = cursorPosition - 1;
      this.textarea.selectionEnd = cursorPosition - 1;
    } else if (key === 'Delete') {
      const modifiedValue = beforeCursor + afterCursor.substring(1);
      this.textarea.value = modifiedValue;
      this.textarea.selectionStart = cursorPosition;
      this.textarea.selectionEnd = cursorPosition;
    }
  };

  build() {
    return this.textarea;
  }
}
