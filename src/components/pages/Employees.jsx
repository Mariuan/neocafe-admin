import React, {useState, useEffect} from 'react'
import './employees.css';
import AddButton from '../media/AddButton.svg';
import Search from './components/Search';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setBranches, setEmployees, setMessage } from '../../redux/actions/productActions';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router';



const Employees = () => {
    const dispatch = useDispatch();
    const state = useSelector((state)=>state);
    // ----------------------------------------------------------------------
    const [filterByName, setFilterByName] = useState('');
    const [filterByBranch, setFilterByBranch] = useState(-1);
    const [filterByPosition, setFilterByPosition] = useState(-1);
    const handleFilterByName = (e) => {
        setFilterByName(e.target.value);
    }
    const handleFilterByBranch = (e) => {
        setFilterByBranch(e.target.value);
    }
    const handleFilterByPosition = (e) => {
        setFilterByPosition(e.target.value);
    }
    // ----------------------------------------------------------------------

    const fetchEmployees = async () => {
        const response = await axios.get('https://neocafe6.herokuapp.com/users', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('neo-cafe-admin-token')}`
            }
        });
        dispatch(setEmployees(response.data.data));
    }

    const fetchBranches = async () => {
        const response = await axios.get('https://neocafe6.herokuapp.com/branches');
        dispatch(setBranches(response.data.data));
    }
    useEffect(()=>{
        fetchEmployees();
        fetchBranches();
    }, [])

    // ----------------------------------------------------------------------

    const employees = useSelector((state)=>state);
    const renderList = employees.allProducts.employees;


    return (
        <div className="employees">
            <div className="employees-filter-block">
                <div className="employees-filter-search">
                    <Search handleFilterByName={handleFilterByName}></Search>
                </div>
                <div className="employees-filter-select">
                    <select className="employees-filter-by-branch" defaultValue={-2} onChange={(e)=>{
                        setFilterByBranch(parseInt(e.target.value));
                        if (e.target.value != -1) {
                            e.target.style.color = "#000";
                        }
                    }}>
                        <option value={-2} disabled hidden>Выберите филиал</option>
                        <option value={-1}>Все</option>
                        {state.allProducts.branches.map((item)=>(
                            <option value={item.id} key={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <select className="employees-filter-by-position" defaultValue={-1} onChange={(e)=>{
                        setFilterByPosition(parseInt(e.target.value));
                        if (e.target.value != -1) {
                            e.target.style.color = "#000";
                        }
                    }}>
                        <option value={-2} disabled hidden>Должность</option>
                        <option value={-1}>Все</option>
                        <option value={0}>Официант</option>
                        <option value={1}>Бариста</option>
                        <option value={2}>Администратор</option>
                    </select>
                </div>
                <div className="employees-filter-extra-options">
                    <button type="button" className="employees-filter-rating-button">По рейтингу</button>
                    <img src={AddButton} alt="add new employees button" className="employees-filter-add-button"
                    onClick={()=>window.location = '/new-employee'}/>
                </div>
            </div>
            <div className="employees-list-title">
                <div className="employees-list-title-number">№</div>
                <div className="employees-list-title-name">Фамилия и имя</div>
                <div className="employees-list-title-position">Должность</div>
                <div className="employees-list-title-phone">Номер телефона</div>
                <div className="employees-list-title-birthday">Дата рождения</div>
                <div className="employees-list-title-schedule">График работы</div>
            </div>
            <div className="employees-list-items">
                {renderList.filter((item)=>{
                    if (item.role != 'CLIENT') {
                        if (filterByName == '') {
                            if (filterByPosition != -1){
                                switch(filterByPosition){
                                    case 0: {
                                        if (item.role == "WAITER") {
                                            return item;
                                        }
                                        break;
                                    }
                                    case 1: {
                                        if (item.role == "BARISTA") {
                                            return item;
                                        }
                                        break;
                                    } 
                                    case 2: {
                                        if (item.role == "ADMIN") {
                                            return item;
                                        }
                                        break;
                                    }
                                }
                            }
                            else return item;
                            
                        }
                        else { 
                            if(filterByPosition != -1) {
                                switch(filterByPosition){
                                    case 0: {
                                        if (item.role == "WAITER") {
                                            if (item.firstname.toLowerCase().includes(filterByName.toLowerCase())) return item;
                                        }
                                        break;
                                    }
                                    case 1: {
                                        if (item.role == "BARISTA") {
                                            if (item.firstname.toLowerCase().includes(filterByName.toLowerCase())) return item;
                                        }
                                        break;
                                    } 
                                    case 2: {
                                        if (item.role == "ADMIN") {
                                            if (item.firstname.toLowerCase().includes(filterByName.toLowerCase())) return item;
                                        }
                                        break;
                                    }
                                }
                            }
                            else {
                                if (item.firstname.toLowerCase().includes(filterByName.toLowerCase())) return item;
                            }
                        }
                    }
                }).filter((item)=>{
                    if (filterByBranch < 0) return item;
                    else {
                        if (item.branch == filterByBranch) return item;
                    }
                }).map(({phone, firstname, lastname, birthdate, bonus, role, schedule}, index)=>(
                    <div key={index} className="employees-list-item" onClick={(e)=>{
                        if (e.target.classList[1]) {
                            e.target.classList.remove('selected');
                        }
                        else {
                            e.target.classList.add('selected');
                        }
                    }}>
                        <div className="employees-list-item-block employees-list-item-number no-event">{index+1}</div>
                        <div className="employees-list-item-block employees-list-item-name no-event">{lastname} {firstname}</div>
                        <div className="employees-list-item-block employees-list-item-position no-event">
                            {role == 'ADMIN' &&
                            <>Администратор</>}
                            {role == 'WAITER' &&
                            <>Официант</>}
                            {role == 'BARISTA' &&
                            <>Бариста</>}
                        </div>
                        <div className="employees-list-item-block employees-list-item-phone no-event">+996 {phone}</div>
                        <div className="employees-list-item-block employees-list-item-birthday no-event">{birthdate}</div>
                        <div className="employees-list-item-block employees-list-item-schedule no-event"></div>
                        <div className="product-item-options"
                        onClick={(e)=>{
                            e.stopPropagation();
                                if (e.target.childNodes[0].style.display != 'block') {
                                    e.target.childNodes[0].style.display = 'block';
                                    e.target.childNodes[1].style.display = 'block';
                                }
                            
                            console.log(e.target.childNodes[0]);
                        }}>
                            <div className="product-item-actions-frame"
                            onClick={(e)=>{
                                e.stopPropagation();
                                e.target.nextSibling.style.display = 'none';
                                e.target.style.display = 'none';
                                }}> 
                            </div>
                            <div className="product-item-actions">
                                    <p 
                                    className="product-item-actions-list"
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        toast.promise(
                                        axios.delete(`https://neocafe6.herokuapp.com/users/${phone}`,{
                                            headers: {
                                                "Authorization": `Bearer ${localStorage.getItem('neo-cafe-admin-token')}`
                                            }
                                        }).then((res)=>{
                                            console.log(res);
                                            if (res.status == 200) {
                                                e.target.parentNode.parentNode.parentNode.remove();
                                            }
                                        }),
                                        {
                                            pending: 'Удаление',
                                            success: 'Сотрудник удален',
                                            error: 'Ошибка'
                                        });
                                        
                                    }}>Удалить</p>
                                    <p className="product-item-actions-list"
                                    onClick={(e)=>{
                                        e.stopPropagation();
                                        window.location = `/employees/${phone}`
                                    }}>Редактировать</p>
                                </div>
                            <p className="dots no-event">.</p>
                            <p className="dots no-event">.</p>
                            <p className="dots no-event">.</p>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Employees