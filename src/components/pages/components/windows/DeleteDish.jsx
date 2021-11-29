import React from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import './deleteDish.css';

const DeleteDish = ({data}) => {
    console.log(data);
    document.body.style.overflow = "hidden";
    return (
        <div className="delete-dish-holder">
            <div className="delete-dish-window">
                <h1 className="delete-dish-title">Вы правда хотите удалить <b>«{`Капучино`}»</b> из меню?</h1>
                <button 
                type="button"
                className="delete-dish-confirm"
                onClick={(e)=>{
                    document.body.style.overflow = "auto";
                    toast.promise(
                    axios.delete(`https://neocafe6.herokuapp.com/dishes/${data.id}`).then((res)=>{
                        console.log(res);
                        if (res.status == 200) data.element.remove();
                        data.close();
                    }),
                    {
                        pending: 'Удаление',
                        success: 'Блюдо удалена',
                        error: 'Ошибка'
                    });
                }}>Да</button>
                <button 
                type="button"
                className="delete-dish-reject"
                onClick={(e)=>{
                    document.body.style.overflow = "auto";
                    data.close();
                }}>Нет</button>
            </div>
        </div>
    )
}

export default DeleteDish
