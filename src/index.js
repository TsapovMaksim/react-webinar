import React from 'react';
import ReactDOM from 'react-dom';
import Store from './store.js';
import App from './app.js';

const root = document.getElementById("app");

console.log('index.js');

// Состояние приложения
const store = new Store({
  items: [
    {code: 1, title: 'Название элемента', price: 100},
    {code: 2, title: 'Некий объект', price: 150},
    {code: 3, title: 'Заголовок', price: 200},
    {code: 4, title: 'Короткое название', price: 250},
    {code: 5, title: 'Запись', price: 300},
    {code: 6, title: 'Пример названия', price: 350},
    {code: 7, title: 'Седьмой', price: 400},
    {code: 8, title: 'Седьмой', price: 400}
  ],
  cart: {
    items: [],
    totalPrice: 0,
    totalCount: 0
  },
});

// Сообщаем реакту что и куда рендерить.
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, root);
});

// Сообщаем реакту что и куда рендерить.
ReactDOM.render(<App store={store}/>, root);
