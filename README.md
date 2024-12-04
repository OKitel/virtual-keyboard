# Virtual Keyboard

A virtual keyboard application built entirely with **JavaScript**, **SCSS**, and **HTML**. This project dynamically generates all DOM elements and provides a fully functional, interactive keyboard with multi-language support, animations, and seamless integration between virtual and physical keyboards.

## 🌐 [Live Demo](https://okitel.github.io/virtual-keyboard/)

---

### 🛠️Tech Stack

- HTML5
- JavaScript (ES6+)
- SCSS

## 📋 Features

### ⚙️Functional Features

- **Dynamic DOM Generation**: The `index.html` file is empty; all elements are rendered using JavaScript.
- **Keyboard Interaction**:
  - Pressing keys on a physical keyboard highlights the corresponding keys on the virtual keyboard.
  - Supports multi-key presses, including `Ctrl`, `Alt`, `Shift`, and others.
- **Multi-Language Support**:
  - Two layouts: English and Russian.
- **Input Support**:
  - Physical and virtual keyboard inputs sync seamlessly with a text area.
  - Special key behaviors:
    - `Enter`: Moves the text cursor to the next line.
    - `Tab`: Inserts a horizontal indent.
    - `Backspace`: Deletes the character before the cursor.
    - `Del`: Deletes the character after the cursor.
    - Arrow keys (`Up`, `Down`, `Left`, `Right`): Navigate within the text or insert arrow symbols.
    - Other keys like `Shift`, `Caps Lock`, and `Space` work as expected.
- **Animations**:
  - Keypress animations provide a visually engaging experience.

### 📐Technical Features

- Written in **vanilla JavaScript** with modern ES6+ features (e.g., classes, destructuring).
- Modular architecture with reusable components (`Title`, `Textarea`, `Keyboard`, `Text`).
- **SCSS** for scalable and organized styles.
- Compliant with [eslint-config-airbnb-base](https://eslint.org/) for consistent and clean code.

---

## 🚀 Getting Started

1. Clone the repository:

```bash
  git clone https://github.com/okitel/virtual-keyboard.git
```

2. Navigate to the project directory:

```bash
cd virtual-keyboard
```

3. Open `index.html`

### 📸 Screenshot

![Screenshot of the app](https://user-images.githubusercontent.com/79774026/235547411-93631b4f-47d9-49f8-80eb-29927d3bd460.png)

### 📝License

This project is open-source and available under the MIT License.

### Happy typing!⌨️
