import axios from 'axios'
import React from 'react'
import Login from './Login'
import { useDispatch } from 'react-redux'
import { setLogin, setToken } from '../redux/actions/productActions'

const LoginCheck = () => {
    const dispatch = useDispatch();
    if (localStorage.getItem('neo-cafe-admin-token')) {
        axios.get('https://neocafe6.herokuapp.com/users', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('neo-cafe-admin-token')}`
            }
        }).catch((err)=>{
            localStorage.clear();
            window.location = "";
        }).then((res)=>{
            if (res.status) {
                if (res.status >= 200 && res.status < 400) {
                    dispatch(setToken(localStorage.getItem('neo-cafe-admin-token')));
                }
            }
        })
    }
    else if (!localStorage.getItem('neo-cafe-admin-token')) {
        return (
            <Login></Login>
        )
    }
    return (
        <></>
    )
}

export default LoginCheck
