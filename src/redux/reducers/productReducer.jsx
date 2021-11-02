import axios from "axios";
import { ActionTypes } from "../constants/action-types"
import {login} from '../actions/requests';

const intialState = {
    dishes: [],
    categories: [],
    employees: [],
    store: [
        // {id: 0, name: 'Сахар', quantity: `${6} кг`, limit: `${3} кг`, date: '23.12.2021', branch: 1, category: 'Сырьё'},
        // {id: 1, name: 'Кофе зерновое', quantity: `${6} кг`, limit: `${3} кг`, date: '23.12.2021', branch: 2, category: 'Сырьё'},
        // {id: 2, name: 'Молоко', quantity: `${10} л`, limit: `${3} л`, date: '23.12.2021', branch: 3, category: 'Сырьё'},
        // {id: 3, name: 'Сливки', quantity: `${5} л`, limit: `${3} л`, date: '23.12.2021', branch: 4, category: 'Сырьё'},
        // {id: 4, name: 'Мята', quantity: `${10} шт`, limit: `${3} шт`, date: '23.12.2021', branch: 5, category: 'Готовая продукция'},
        // {id: 5, name: 'Какао', quantity: `${10} шт`, limit: `${3} шт`, date: '23.12.2021', branch: 6, category: 'Сырьё'},
        // {id: 6, name: 'Лимонная кислота', quantity: `${10} шт`, limit: `${3} шт`, date: '23.12.2021', branch: 1, category: 'Сырьё'},
        // {id: 7, name: 'Лайм', quantity: `${6} кг`, limit: `${3} кг`, date: '23.12.2021', branch: 2, category: 'Готовая продукция'},
        // {id: 8, name: 'Мёд', quantity: `${6} кг`, limit: `${3} кг`, date: '23.12.2021', branch: 3, category: 'Готовая продукция'},
        // {id: 10, name: 'Сахарная пудра', quantity: `${5} шт`, limit: `${3} шт`, date: '23.12.2021', branch: 4, category: 'Сырьё'},
    ],
    branches: [
        {id: 0, name: 'NeoCafe №1', phone: "+996(709)456-345", address: 'Улица Байтик Баатыра 134/3', schedule: ['Пн-Пт с 09:00 до 22:00', 'Ср с 10:00 до 21:00', 'Сб-Вс с 09:00 до 22:00']},
        {id: 1, name: 'NeoCafe №2', phone: "+996(709)456-345", address: 'Улица Байтик Баатыра 134/3', schedule: ['Пн-Пт с 09:00 до 22:00', 'Ср с 10:00 до 21:00', 'Сб-Вс с 09:00 до 22:00']},
        {id: 2, name: 'NeoCafe №3', phone: "+996(709)456-345", address: 'Улица Байтик Баатыра 134/3', schedule: ['Пн-Пт с 09:00 до 22:00', 'Ср с 10:00 до 21:00', 'Сб-Вс с 09:00 до 22:00']},
        {id: 3, name: 'NeoCafe №4', phone: "+996(709)456-345", address: 'Улица Байтик Баатыра 134/3', schedule: ['Пн-Пт с 09:00 до 22:00', 'Ср с 10:00 до 21:00', 'Сб-Вс с 09:00 до 22:00']},
        {id: 4, name: 'NeoCafe №5', phone: "+996(709)456-345", address: 'Улица Байтик Баатыра 134/3', schedule: ['Пн-Пт с 09:00 до 22:00', 'Ср с 10:00 до 21:00', 'Сб-Вс с 09:00 до 22:00']},
        {id: 5, name: 'NeoCafe №6', phone: "+996(709)456-345", address: 'Улица Байтик Баатыра 134/3', schedule: ['Пн-Пт с 09:00 до 22:00', 'Ср с 10:00 до 21:00', 'Сб-Вс с 09:00 до 22:00']},
    ],
    token: null,
    login: false,
}

export const productReducer = (state = intialState, {type, payload}) => {
    switch(type){
        case ActionTypes.SET_PRODUCTS:
            return {...state, store: payload};
        case ActionTypes.SET_DISHES:
            return {...state, dishes: payload};
        case ActionTypes.SET_CATEGORIES:
            return {...state, categories: payload};
        case ActionTypes.SET_EMPLOYEES:
            return {...state, employees: payload};
        case ActionTypes.SET_LOGIN:
            state.token = payload;
            localStorage.setItem('neo-cafe-token', payload);
            return state;
        case ActionTypes.LOGIN:
            return state;
        default:
            return state;
    }
}