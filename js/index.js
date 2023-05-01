import Title from './components/Title.js';
import Textarea from './components/Textarea.js';
import Keyboard from './components/Keyboard.js';
import Text from './components/Text.js';

const body = document.getElementsByTagName('body')[0];
body.classList.add('body');
const wrapper = document.createElement('div');
wrapper.classList.add('wrapper');

body.appendChild(wrapper);

const title = new Title();
const textarea = new Textarea();
const keyboard = new Keyboard();
const text = new Text();

wrapper.appendChild(title.build());
wrapper.appendChild(textarea.build());
wrapper.appendChild(keyboard.build());
wrapper.appendChild(text.build());
