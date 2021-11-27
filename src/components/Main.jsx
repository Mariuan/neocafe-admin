import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../redux/actions/productActions';
import notification_logo from './media/notification-logo.svg';
import SignOutLogo from './media/SignOut.svg';
import logo from './media/neocafe.svg';
import './main.css';
import { Redirect, Link, useHistory } from 'react-router-dom';
import coolicon from './media/coolicon.svg';
import nc from './media/nc.svg';

const notifications_data = [
    {id: 0, status: 'Лимит упал', description: [
            {id: 0, name: 'Молоко', quantity: 2, unit: 'Л'},
            {id: 1, name: 'Кофе', quantity: 1, unit: 'Кг'},
            {id: 2, name: 'Круассан', quantity: 2, unit: 'Шт'},
            {id: 3, name: 'Апельсиновый сок', quantity: 3, unit: 'Л'},
        ],
        branch: 'NeoCafe №1'
    },
    {id: 1, status: 'Срочно пополить', description: [
            {id: 0, name: 'Молоко', quantity: 2, unit: 'Л'},
            {id: 1, name: 'Кофе', quantity: 1, unit: 'Кг'},
            {id: 2, name: 'Круассан', quantity: 2, unit: 'Шт'},
            {id: 3, name: 'Апельсиновый сок', quantity: 3, unit: 'Л'},
        ],
        branch: 'NeoCafe №1'
    },
    
    {id: 2, status: 'Лимит упал', description: [
            {id: 0, name: 'Молоко', quantity: 2, unit: 'Л'},
            {id: 1, name: 'Кофе', quantity: 1, unit: 'Кг'},
            {id: 2, name: 'Круассан', quantity: 2, unit: 'Шт'},
            {id: 3, name: 'Апельсиновый сок', quantity: 3, unit: 'Л'},
        ],
        branch: 'NeoCafe №1'
    },
    {id: 3, status: 'Лимит упал', description: [
            {id: 0, name: 'Молоко', quantity: 2, unit: 'Л'},
            {id: 1, name: 'Кофе', quantity: 1, unit: 'Кг'},
            {id: 2, name: 'Круассан', quantity: 2, unit: 'Шт'},
            {id: 3, name: 'Апельсиновый сок', quantity: 3, unit: 'Л'},
        ],
        branch: 'NeoCafe №1'
    },
]

const Main = () => {
    const [page, setPage] = useState('menu');
    const [notification, setNotification] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        if (window.location.pathname[1] == 'm') {
            setPage('menu');
        }
        else if (window.location.pathname[1] == 's') {
            setPage('store');
        }
        else if (window.location.pathname[1] == 'b') {
            setPage('branches');
        }
        else if (window.location.pathname[1] == 'e') {
            setPage('employees');
        }
    }, [useHistory])
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
                <img src={notification_logo} 
                alt="notifications" 
                className="header_notification-logo"
                onClick={(e)=>{
                    if (notification) {
                        setNotification(false);
                    }
                    else setNotification(true);
                }}/>
                {notification &&
                <div className="notification-window">
                    <div className="notification-header">
                            <h1 className="notification-header-title">Уведомления</h1>
                            <img src={coolicon} alt="close window" 
                            className="notification-close-icon" 
                            onClick={()=>setNotification(false)}/>
                    </div>
                    <div className="notification-content">
                            {notifications_data.map((item)=>(
                                <div className="notification-item">
                                    <img src={nc} alt="" className="notification-item-icon"/>
                                    <div className="notification-item-content">
                                        <div className="notification-item-status">{item.status}</div>
                                        <div className="notification-item-description">
                                            {item.description.map((item, index)=>(
                                                <p 
                                                key={item.id}
                                                className="notification-item-consist">{`${item.name} ${item.quantity} ${item.unit},`}</p>
                                            ))}
                                        </div>
                                        <div className="notification-footer">
                                            <div className="notification-item-branch">{item.branch}</div>
                                            <div className="notification-item-time">{item.time}</div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                }
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

