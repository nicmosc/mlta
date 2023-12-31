import '../../shared/todo-styles.css';

import { createElement } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';

const root = ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement);
root.render(createElement(App));
