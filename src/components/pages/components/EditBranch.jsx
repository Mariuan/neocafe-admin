import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import { setSelectedBranch } from '../../../redux/actions/productActions';
import Branch_icon from '../../media/Branch.svg';
import './newBranch.css';

const fetchBranch = async (id)=>{
    const response = await axios.get(`https://neocafe6.herokuapp.com/branches/${id}`);
    return await response.data;
}

const weekDays = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье',];

const EditBranch = () => {
    const dispatch = useDispatch();
    let branchId = useParams();
    const state = useSelector((state)=>state);
    const branchData = state.allProducts.selectedBranch;

    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [ schedule, setSchedule] = useState([])
    const scheduleArray = [];

    const [status, setStatus] = useState(false);

    if (!status) {
        setStatus(true);
        fetchBranch(branchId.id).then((res)=>{
            dispatch(setSelectedBranch(res));
            if (!address) setAddress(res.address); 
            if (!name) setName(res.name);
            if (!phone) setPhone(res.phone);
            if (schedule.length == 0){
                setSchedule(JSON.parse(res.opening_hours));
            } 
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(schedule);
        toast.promise(
            axios.patch(`https://neocafe6.herokuapp.com/branches/${branchId.id}`, {
                name: name,
                address: address,
                phone: phone,
                opening_hours: JSON.stringify(schedule)
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
    return(
    <div className="edit-branch-page">
        <div className="new-branch-content">
                <h1 className="new-branch-title">Изменить филиал</h1>
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
                    placeholder={address}
                    value={address}
                    onChange={(e)=>{
                        setAddress(e.target.value);
                    }}/>
                    <input 
                    type="text" 
                    className="new-branch-name"
                    placeholder={name}
                    value={name}
                    onChange={(e)=>{
                        setName(e.target.value);
                    }}/>
                    <input 
                    type="text" 
                    className="new-branch-phone"
                    placeholder={phone}
                    value={phone}
                    onChange={(e)=>{
                        setPhone(e.target.value);
                    }}/>
                    <h1 className="new-branch-schedule-title">График работы</h1>
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
                                    }}/>

                                    <input type="checkbox" disabled checked className="new-employee-time-checkbox"/>
                            </div>
                        </div>
                    )})}
                    <button type="submit" className="new-branch-save-button">Сохранить</button>
                    <button type="button" className="new-branch-cancel-button">Отменить</button>
                </form>
            </div>
    </div>)
};
export default EditBranch