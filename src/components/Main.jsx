import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setToken} from '../redux/actions/productActions';
import notification_logo from './media/notification-logo.svg';
import SignOutLogo from './media/SignOut.svg';
import logo from './media/neocafe.svg';
import './main.css';
import { Redirect, Link, useHistory } from 'react-router-dom';
import coolicon from './media/coolicon.svg';
import nc from './media/nc.svg';
import { useSelector } from 'react-redux';


const parseNoti = (branches) => {
    let data = [];
    for (let i in branches) {
        let flag = true;
        if (data.length == 0) data.push({branch: branches[i].branch_id, branch_name: branches[i].branch, products: [{product_name: branches[i].product, reserve: branches[i].reserve, unit: branches[i].unit}]});
        else {
            for (let j in data) {
                if (data[j].branch == branches[i].branch_id) {
                    data[j].products.push({product_name: branches[i].product, reserve: branches[i].reserve, unit: branches[i].unit});
                    flag = false;
                    break;
                }
            }
            if (flag) {
                data.push({branch: branches[i].branch_id, branch_name: branches[i].branch, products: [{product_name: branches[i].product, reserve: branches[i].reserve, unit: branches[i].unit}]})
            }
        }
    }
    return data;
}

const fetchNoti = async (id) => {
    const response = await axios.get(`https://neocafe6.herokuapp.com/storages?type=limited`);
    return await response.data.data;
}


const Main = () => {
    const [page, setPage] = useState('menu');
    const [notification, setNotification] = useState(false);
    const [notificationData, setNotificationData] = useState([]);
    const [refresh, setRefresh] = useState(false);
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
        else if (window.location.pathname[1] == 'e' || window.location.pathname[1] == 'n') {
            setPage('employees');
        }


    }, [useHistory])
    if (notification && !refresh) {
        fetchNoti().then((res)=>{
            setNotificationData(parseNoti(res));
            setRefresh(true);
        });
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
                            onClick={()=>{
                                setNotification(false);
                                setRefresh(false);
                            }}/>
                    </div>
                    <div className="notification-content">
                        {notificationData.length == 0 &&
                        <p>Нету уведомлений</p>}
                        {notificationData.length > 0 &&
                        <>
                            {notificationData.map((item, index)=>(
                                <div key={index} className="notification-item">
                                    <img src={nc} alt="" className="notification-item-icon"/>
                                    <div className="notification-item-content">
                                        <div className="notification-item-status">Лимит упал</div>
                                        <div className="notification-item-description">
                                            {item.products.map((item, index)=>(
                                                <p 
                                                key={index}
                                                className="notification-item-consist">{`${item.product_name} ${item.reserve} ${item.unit},`}</p>
                                            ))}
                                        </div>
                                        <div className="notification-footer">
                                            <div className="notification-item-branch">{item.branch_name}</div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </>}
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

