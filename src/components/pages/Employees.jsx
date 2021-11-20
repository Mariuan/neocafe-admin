import React, {useState, useEffect} from 'react'
import './employees.css';
import AddButton from '../media/AddButton.svg';
import Search from './components/Search';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployees } from '../../redux/actions/productActions';

const Employees = () => {
    const dispatch = useDispatch();
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
        dispatch(setEmployees(response.data));
    }
    useEffect(()=>{
        fetchEmployees();
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
                    <select className="employees-filter-by-branch" defaultValue={-1} onChange={(e)=>{
                        setFilterByBranch(parseInt(e.target.value));
                        if (e.target.value != -1) {
                            e.target.style.color = "#000";
                        }
                    }}>
                        <option value={-1} disabled hidden>Выберите филиал</option>
                        <option value={0}>NeoCafe №1</option>
                        <option value={1}>NeoCafe №2</option>
                        <option value={2}>NeoCafe №3</option>
                        <option value={3}>NeoCafe №4</option>
                        <option value={4}>NeoCafe №5</option>
                        <option value={5}>NeoCafe №6</option>
                    </select>
                    <select className="employees-filter-by-position" defaultValue={-1} onChange={(e)=>{
                        setFilterByPosition(parseInt(e.target.value));
                        if (e.target.value != -1) {
                            e.target.style.color = "#000";
                        }
                    }}>
                        <option value={-1} disabled hidden>Должность</option>
                        <option value={0}>Официант</option>
                        <option value={1}>Бариста</option>
                        <option value={2}>Администратор</option>
                    </select>
                </div>
                <div className="employees-filter-extra-options">
                    <button type="button" className="employees-filter-rating-button">По рейтингу</button>
                    <img src={AddButton} alt="add new employees button" className="employees-filter-add-button"
                    onClick={()=>window.location = '/employees/new-employee'}/>
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
                        <div className="employees-list-item-block employees-list-item-schedule no-event">{schedule}</div>
                        <div className="employees-list-item-block employees-list-item-options no-event">
                            <div>.</div>
                            <div>.</div>
                            <div>.</div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}

export default Employees