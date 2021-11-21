import React, {useState} from 'react';
import './newBranch.css';
import Branch_icon from '../../media/Branch.svg';
import axios from 'axios';


const NewBranch = () => {
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState(null);
    const [image, setImage] = useState(null);
    const [ schedule, setSchedule] = useState([
        {day: 0, name: 'Понедельник', sign: 'Пн', start: '', finish: '', work: false},
        {day: 1, name: 'Вторник', sign: 'Вт', start: '', finish: '', work: false},
        {day: 2, name: 'Среда', sign: 'Ср', start: '', finish: '', work: false},
        {day: 3, name: 'Четверг', sign: 'Чт', start: '', finish: '', work: false},
        {day: 4, name: 'Пятница', sign: 'Пт', start: '', finish: '', work: false},
        {day: 5, name: 'Суббота', sign: 'Сб', start: '', finish: '', work: false},
        {day: 6, name: 'Воскресенье', sign: 'Вс', start: '', finish: '', work: false},
    ])

    const handleSubmit  = (e)=>{
        e.preventDefault();
        let scheduleData = '';
        for (let i = 0; i < 7; i++) {
            scheduleData += schedule[i].sign + ' с ' + schedule[i].start + ' до ' + schedule[i].finish + '#';
        }
        axios.post('http://neocafe6.herokuapp.com/branches', {
            name: name,
            address: address,
            phone: phone,
            opening_hours: scheduleData
        }).then((res)=>{
            // if (res.status >= 200 && res.status < 400) window.location = '/branches';
        })
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
                    <button type="submit" className="new-branch-save-button">Сохранить</button>
                    <button type="button" className="new-branch-cancel-button">Отменить</button>
                </form>
            </div>
        </div>
    )
}

export default NewBranch
