import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import './newEmployee.css';

const weekDays = [
    {name: 'Понедельник', shortName: 'Пн'},
    {name: 'Вторник', shortName: 'Вт'},
    {name: 'Среда', shortName: 'Ср'},
    {name: 'Четверг', shortName: 'Чт'},
    {name: 'Пятница', shortName: 'Пт'},
    {name: 'Суббота', shortName: 'Сб'},
    {name: 'Воскресенье', shortName: 'Вс'},
]

const NewEmployee = () => {
    const state = useSelector((state)=>state);
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [phone, setPhone] = useState(null);
    const [branch, setBranch] = useState(null);
    const [post, setPost] = useState(null);


    const [ schedule, setSchedule] = useState(state.allProducts.selectedEmployee.split('#'));
    console.log(schedule);

    const handleSubmit = () => {
    }

    return (
        <div className="new-employee-page">
            <div className="new-employee-content">
                <h1 className="new-employee-title">Новый сотрудник</h1>
                <form 
                onSubmit={handleSubmit}
                className="new-employee-form">
                    <input 
                    type="text" 
                    className="new-employee-lastname" 
                    placeholder="Фамилия"
                    onChange={(e)=>{
                        setLastname(e.target.value);
                    }}/>
                    <input 
                    type="text" 
                    className="new-employee-name"
                    placeholder="Имя"
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}
                    />
                    <input 
                    type="text" 
                    className="new-employee-birthday"
                    placeholder="Дата рождения"
                    onChange={(e)=>{
                        setBirthday(e.target.value);
                    }}/>
                    <input 
                    type="text" 
                    className="new-employee-phone"
                    placeholder="Номер телефона"
                    onChange={(e)=>{
                        setPhone(e.target.value);
                    }}/>
                    <select
                    defaultValue={-1}
                    className="new-employee-branch"
                    onChange={(e)=>{
                        if (e.target.value != -1) e.target.style.color = "#464646";
                        setBranch(parseInt(e.target.value));
                    }}>
                        <option value={-1} hidden disabled>Филиал</option>
                        {state.allProducts.branches.map((item)=>(
                            <option 
                            value={item.id}
                            key={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <select
                    defaultValue={-1}
                    className="new-employee-post"
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
                    {weekDays.map((item, index)=>(
                        <div key={index} className="new-employee-time">
                            <p className="new-employee-time-title">{item[0]}</p>
                                <div className="new-employee-schedule-time">
                                    <p className="new-employee-time-title">с&nbsp;&nbsp;</p>
                                    <input type="text"
                                    className="new-employee-time-input"
                                    maxLength={5}
                                    placeholder="09:00"
                                    onChange={(e)=>{
                                        let data = schedule;
                                        data[index].start = e.target.value;
                                        setSchedule(data);
                                        if (schedule[index].finish.length == 5 && e.target.value.length == 5) {
                                            e.target.nextSibling.nextSibling.nextSibling.checked = true;
                                        }
                                        else {
                                            e.target.nextSibling.nextSibling.nextSibling.checked = false;
                                        }
                                    }}/>
                                    <p className='new-employee-time-title'>&nbsp;&nbsp;до&nbsp;&nbsp;</p>
                                    <input type="text"
                                    className="new-employee-time-input"
                                    maxLength={5}
                                    placeholder="16:00"
                                    onChange={(e)=>{
                                        let data = schedule;
                                        data[index].finish = e.target.value;
                                        setSchedule(data);
                                        if (schedule[index].start.length == 5 && e.target.value.length == 5) {
                                            e.target.nextSibling.checked = true;
                                        }
                                        else {
                                            e.target.nextSibling.checked = false;
                                        }
                                    }}/>

                                    <input type="checkbox" disabled className="new-employee-time-checkbox"/>
                            </div>
                        </div>
                    ))}
                    <button
                    type="submit"
                    className="new-employee-save-button">Сохранить</button>
                    <button
                    type="button"
                    className="new-employee-cancel-button"
                    onClick={()=>window.location = '/employees'}>Отменить</button>
                </form>
            </div>
        </div>
    )
}

export default NewEmployee
