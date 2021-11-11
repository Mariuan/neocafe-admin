import axios from "axios";
import { ActionTypes } from "../constants/action-types"
import {login} from '../actions/requests';

const intialState = {
    dishes: [],
    categories: [],
    employees: [],
    store: [],
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
            localStorage.setItem('neo-cafe-admin-token', payload);
            return {...state, token: payload};
        case ActionTypes.SET_TOKEN:
            return {...state, token: true};
        case ActionTypes.LOGIN:
            return state;
        default:
            return state;
    }
}