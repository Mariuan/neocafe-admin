import React, {useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/actions/productActions';
import notification_logo from './media/notification-logo.svg';
import SignOutLogo from './media/SignOut.svg';
import logo from './media/neocafe.svg';
import './main.css';
import { Redirect, Link } from 'react-router-dom';


const Main = () => {
    const [page, setPage] = useState('menu');
    const dispatch = useDispatch()
    if (window.location.pathname == '/') {
        return (<Redirect to="/menu" />)
    }
    
    return (
        <div className="header">  
            <img src={logo} alt="logo" className="header_icon"/>
            <div className="header-nav">
                <Link to='/menu'
                className={`header-nav_item ${page == 'menu' && `active`}`}
                onClick={(e)=>{
                    setPage('menu');
                }}>
                    Меню
                </Link>
                <Link to='/store'
                className={`header-nav_item ${page == 'store' && `active`}`}
                onClick={(e)=>{
                    setPage('store');
                }}>
                    Склад
                </Link>
                <Link to='/branches'
                className={`header-nav_item ${page == 'branches' && `active`}`}
                onClick={(e)=>{
                    setPage('branches');
                }}>
                    Филиалы
                </Link>
                <Link to='/employees'
                className={`header-nav_item ${page == 'employees' && `active`}`}
                onClick={(e)=>{
                    setPage('employees');
                }}>
                    Сотрудники
                </Link>
            </div>
            <div className="header_extra-options">
                <img src={notification_logo} alt="notifications" className="header_notification-logo"/>
                <img src={SignOutLogo} alt="Sign out" className="header_signout-logo" onClick={()=>{
                    localStorage.clear();
                    dispatch(setToken(false));
                    window.location = '/';
                }}/>
            </div>
        </div>
    )
}

export default Main

