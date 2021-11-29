import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken, setNotification, setBranches } from '../redux/actions/productActions';
import notification_logo from './media/notification-logo.svg';
import SignOutLogo from './media/SignOut.svg';
import logo from './media/neocafe.svg';
import './main.css';
import { Redirect, Link, useHistory } from 'react-router-dom';
import coolicon from './media/coolicon.svg';
import nc from './media/nc.svg';
import { useSelector } from 'react-redux';

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

const parseNoti = (branches) => {
    let data = [];
    for (let i in branches) {
        let flag = true;
        if (data.length == 0) data.push({branch: branches[i].branch_id, branch_name: branches[i].branch, products: [{product_name: branches[i].product, reserve: branches[i].reserve}]});
        else {
            for (let j in data) {
                if (data[j].branch == branches[i].branch_id) {
                    data[j].products.push({product_name: branches[i].product, reserve: branches[i].reserve});
                    flag = false;
                    break;
                }
            }
            if (flag) {
                data.push({branch: branches[i].branch_id, branch_name: branches[i].branch, products: [{product_name: branches[i].product, reserve: branches[i].reserve}]})
            }
        }
    }
    console.log(data);
}

const fetchNoti = async (id) => {
    const response = await axios.get(`https://neocafe6.herokuapp.com/storages?type=limited`);
    console.log(response.data.data);
    return await response.data.data;
}

const fetchBranch = async () =>{
    const response = await axios.get('https://neocafe6.herokuapp.com/branches');
    return await response.data.data;
}

const Main = () => {
    const [page, setPage] = useState('menu');
    const [notification, setNotification] = useState(false);
    const dispatch = useDispatch()
    const state = useSelector((state)=>state);
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
        else if (window.location.pathname[1] == 'e' || window.location.pathname[1] == 'n') {
            setPage('employees');
        }


    }, [useHistory])
    console.log(notification);
    if (notification) {
        console.log("Hello");
        fetchNoti().then((res)=>parseNoti(res));
    }
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
                            {notifications_data.map((item, index)=>(
                                <div key={index} className="notification-item">
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

