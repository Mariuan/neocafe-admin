import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { setSelectedEmployee } from '../../../redux/actions/productActions';
import { setBranches } from '../../../redux/actions/productActions';
import './newEmployee.css';


const weekDays = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье',];

const fetchEmployee = async (phone) => {
    const response = await axios.get(`https://neocafe6.herokuapp.com/users/${phone}`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('neo-cafe-admin-token')}`
        }
    });
    return await response.data;
}

const fetchBranches = async () => {
    const response = await axios.get('https://neocafe6.herokuapp.com/branches');
    return await response.data.data;
}

const EditEmployee = () => {
    const employeePhone = useParams();
    const dispatch = useDispatch();
    const phoneNumber = useParams();

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone, setPhone] = useState('');
    const [branch, setBranch] = useState(-2);
    const [post, setPost] = useState(-1);
    const [ schedule, setSchedule] = useState([])

    const [status, setStatus] = useState(false);

    const state = useSelector((state)=>state);
    useEffect(()=>{
        fetchBranches().then((res)=>{
            dispatch(setBranches(res));
        })
    }, [])
    if (!status) {
        setStatus(true);
        fetchEmployee(employeePhone.phone).then((res)=>{
            if (!name) {
                if (res.firstname) setName(res.firstname);
            } 
            if (!lastname) {
                if (res.lastname) setLastname(res.lastname);
            }
            if (!birthday) {
                if (res.birthdate) setBirthday(res.birthdate);
            }
            if (!phone){
                if (res.phone) setPhone(res.phone);
            } 
            if (post < 0) {
                if (res.role){
                    switch(res.role) {
                        case "ADMIN":
                            setPost(2);
                            break;
                        case "BARISTA":
                            setPost(1)
                            break;
                        case "WAITER":
                            setPost(0);
                            break;
                    }
                }
                
            }
            if (branch < 0) {
                if (res.branch) setBranch(res.branch);
            }
            if (schedule.length == 0) setSchedule(JSON.parse(res.schedule))
            dispatch(setSelectedEmployee(res));
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(schedule);
        toast.promise(
            axios.patch(`https://neocafe6.herokuapp.com/users/${phone}`, {
                name: name,
                lastname: lastname,
                birthdate: birthday,
                phone: phone,
                branch: branch,
                role: post,
                schedule: JSON.stringify(schedule)
            },{
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('neo-cafe-admin-token')}`
                }
            }),{
                pending: 'Обновление',
                success: "Данные обновлены",
                error: 'Ошибка'
            }
        )
    }

    return (
        <div className="new-employee-page">
            <div className="new-employee-content">
                <h1 className="new-employee-title">Новый сотрудник</h1>
                <form 
                className="new-employee-form">
                    <input 
                    type="text" 
                    className="new-employee-lastname" 
                    placeholder="Фамилия"
                    value={lastname}
                    onChange={(e)=>{
                        setLastname(e.target.value);
                    }}/>
                    <input 
                    type="text" 
                    className="new-employee-name"
                    placeholder="Имя"
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                    <input 
                    type="text" 
                    className="new-employee-birthday"
                    placeholder="Дата рождения"
                    value={birthday}
                    onChange={(e)=>{
                        setBirthday(e.target.value);
                    }}/>
                    <input 
                    type="text" 
                    className="new-employee-phone"
                    placeholder="Номер телефона"
                    value={phone}
                    onChange={(e)=>{
                        setPhone(e.target.value);
                    }}/>
                    <select
                    value={branch}
                    className="new-employee-branch"
                    style={{color: '#464646'}}
                    onChange={(e)=>{
                        if (e.target.value != -1) e.target.style.color = "#464646";
                        setBranch(parseInt(e.target.value));
                    }}>
                        <option value={-2} hidden disabled>Филиал</option>
                        {state.allProducts.branches.map((item)=>(
                            <option 
                            value={item.id}
                            key={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <select
                    value={post}
                    className="new-employee-post"
                    style={{color: '#464646'}}
                    onChange={(e)=>{
                        if (e.target.value != -1) {
                            e.target.style.color = "#464646";
                        }
                        if (e.target.value == 0) setPost("WAITER");
                        else if (e.target.value == 1) setPost("BARISTA");
                        else if (e.target.value == 2) setPost("ADMIN");
                    }}>
                        <option 
                        value={-1}
                        hidden
                        disabled>Должность</option>
                        <option value={0}>Официант</option>
                        <option value={1}>Бариста</option>
                        <option value={2}>Администратор</option>
                    </select>
                    <h1 className="new-employee-schedule-title">График работы</h1>
                    {schedule.map((item, index)=>{
                        if (index< schedule.length) return (
                        <div key={index} className="new-employee-time">
                            <p className="new-employee-time-title">{weekDays[index]}</p>
                                <div className="new-employee-schedule-time">
                                    <p className="new-employee-time-title">с&nbsp;&nbsp;</p>
                                    <input type="text"
                                    className="new-employee-time-input"
                                    maxLength={5}
                                    placeholder={item.start}
                                    onChange={(e)=>{
                                        let data = schedule;
                                        data[index].start = e.target.value;
                                        if (schedule[index].finish.length == 5 && e.target.value.length == 5) {
                                            e.target.nextSibling.nextSibling.nextSibling.checked = true;
                                            data[index].work = true;
                                        }
                                        else {
                                            e.target.nextSibling.nextSibling.nextSibling.checked = false;
                                            data[index].work = false;
                                        }
                                        setSchedule(data);
                                    }}/>
                                    <p className='new-employee-time-title'>&nbsp;&nbsp;до&nbsp;&nbsp;</p>
                                    <input type="text"
                                    className="new-employee-time-input"
                                    maxLength={5}
                                    placeholder={item.finish}
                                    onChange={(e)=>{
                                        let data = schedule;
                                        data[index].finish = e.target.value;
                                        if (schedule[index].start.length == 5 && e.target.value.length == 5) {
                                            e.target.nextSibling.checked = true;
                                            data[index].work = true;
                                        }
                                        else {
                                            e.target.nextSibling.checked = false;
                                            data[index].work = false;
                                        }
                                        setSchedule(data);
                                        console.log(data);
                                    }}/>

                                    <input type="checkbox" disabled checked className="new-employee-time-checkbox"/>
                            </div>
                        </div>
                    )})}
                    <button
                    type="submit"
                    className="new-employee-save-button"
                    onClick={(e)=>{
                        handleSubmit(e);
                    }}>Сохранить</button>
                    <button
                    type="button"
                    className="new-employee-cancel-button"
                    onClick={()=>window.location = '/employees'}>Отменить</button>
                </form>
            </div>
        </div>
    )
}

export default EditEmployee;