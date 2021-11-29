import React, {useState} from 'react';
import './newBranch.css';
import Branch_icon from '../../media/Branch.svg';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';


const NewBranch = () => {
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(null);
    const [image, setImage] = useState(null);
    const [schedule, setSchedule] = useState([
        {day: 0, name: "Понедельник", shortName: "Пн", start: "", finish: "", work: false},
        {day: 1, name: "Вторник", shortName: "Вт", start: "", finish: "", work: false},
        {day: 2, name: "Среда", shortName: "Ср", start: "", finish: "", work: false},
        {day: 3, name: "Четверг", shortName: "Чт", start: "", finish: "", work: false},
        {day: 4, name: "Пятница", shortName: "Пт", start: "", finish: "", work: false},
        {day: 5, name: "Суббота", shortName: "Сб", start: "", finish: "", work: false},
        {day: 6, name: "Воскресенье", shortName: "Вс", start: "", finish: "", work: false},
    ])
    const handleSubmit  = (e)=>{
        e.preventDefault();
        let scheduleData = '';
        for (let i = 0; i < 7; i++) {
            scheduleData += schedule[i].sign + ' с ' + schedule[i].start + ' до ' + schedule[i].finish + '#';
        }
        toast.promise(
        axios.post('http://neocafe6.herokuapp.com/branches', {
            name: name,
            address: address,
            phone: phone,
            opening_hours: JSON.stringify(schedule),
        }).then((res)=>{
            if (res.status >= 200 && res.status < 400) {
                history.push('/branches');
            }
        }),
        {
            pending: 'Создание',
            success: 'Филиал создан',
            error: 'Ошибка'
        });
    }

    return (
        <div className="new-branch">
            
            <div className="new-branch-content">
                <h1 className="new-branch-title">Новый филиал</h1>
                <form className="new-branch-form"
                onSubmit={handleSubmit}>
                    <div className="new-branch-image-box">
                        <img src={Branch_icon} alt="branch-icon" className="new-branch-image-icon"/>
                        <p className="new-branch-addImage-button">Добавить картинку</p>
                        <input type="file"  
                        accept="image/png, image/svg, image/jpeg"
                        onChange={(e)=>setImage(e.target.files[0])} 
                        style={{display: "none"}}/>
                    </div>
                    <input 
                    type="text" 
                    className="new-branch-address" 
                    placeholder="Адрес"
                    onChange={(e)=>{
                        setAddress(e.target.value);
                    }}/>
                    <input 
                    type="text" 
                    className="new-branch-name"
                    placeholder="Наименование"
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}/>
                    <input 
                    type="text" 
                    className="new-branch-phone"
                    placeholder="Номер телефона"
                    onChange={(e)=>{
                        setPhone(e.target.value);
                    }}/>
                    <h1 className="new-branch-schedule-title">График работы</h1>
                    {schedule.map((item, index)=>(
                        <div key={index} className="new-employee-time">
                            <p className="new-employee-time-title">{item.name}</p>
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
                                        if (schedule[index].start.length == 5 && e.target.value.length == 5) {
                                            e.target.nextSibling.checked = true;
                                            data[index].work = true;
                                        }
                                        else {
                                            e.target.nextSibling.checked = false;
                                            data[index].work = false;
                                        }
                                        setSchedule(data);
                                    }}/>

                                    <input type="checkbox" disabled className="new-employee-time-checkbox"/>
                            </div>
                        </div>
                    ))}
                    <button type="submit" className="new-branch-save-button">Сохранить</button>
                    <button type="button" className="new-branch-cancel-button">Отменить</button>
                </form>
            </div>
        </div>
    )
}

export default NewBranch
