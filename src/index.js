import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store.js';
import App from './app.js';

const root = document.getElementById('app');

// Состояние приложения
const store = new Store({
  items: [
    { code: 1, title: 'Название элемента', selectedCount: 0 },
    { code: 2, title: 'Некий объект', selectedCount: 0 },
    { code: 3, title: 'Заголовок', selectedCount: 0 },
    { code: 4, title: 'Короткое название', selectedCount: 0 },
    { code: 5, title: 'Запись', selectedCount: 0 },
    { code: 6, title: 'Пример названия', selectedCount: 0 },
    { code: 7, title: 'Седьмой', selectedCount: 0 },
  ],
});

// Сообщаем реакту что и куда рендерить.
store.subscribe(() => {
  ReactDOM.render(<App store={store} />, root);
});

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(<App store={store} />, root);
