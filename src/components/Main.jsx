import React, {useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/actions/productActions';
import './main.css';


const CheckToken = async (token) => {
    const dispatch = useDispatch();
    const response = await axios.get('https://neocafe6.herokuapp.com/users', {
        headers: {
            authorization: `Bearer ${token}`
        }
    }).catch((err)=>console.log(err));
    if (response['statusCode']){
        if (response['statusCode'] == 401) {
            dispatch(setLogin(false));
        }
        else {
            dispatch(setLogin(true));
        }
    }
    
}

const Main = () => {
    if (!localStorage.getItem('neo-cafe-token')) window.location="/login";
    else {
        const token = localStorage.getItem('neo-cafe-token');
        CheckToken(token);
    }
    const [ page, setPage ] = useState('menu');
    if (page == 'menu') {
        window.location = '/menu';
    }
    else if (page == 'store') {
        window.location = '/store'
    }
    else if (page == 'branches') {
        window.location = '/branches';
    }
    else {
        window.location = '/employees';
    }
    return (
        <>
        </>
    )
}

export default Main