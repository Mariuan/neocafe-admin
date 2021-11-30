import React, {useState} from 'react'
import { toast } from 'react-toastify';
import close_icon from '../../../media/coolicon.svg';
import axios from 'axios';
import { useHistory } from 'react-router';
import './newCategory.css';
import { useDispatch } from 'react-redux';
import { setCategories } from '../../../../redux/actions/productActions';

const NewCategory = ({close}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const handleSubmit = (e) =>{
        toast.promise(
            axios.post(`https://neocafe6.herokuapp.com/categories`, {
                name: name
            }).then((res)=>{
                history.push('/menu');
                document.body.style.overflow = "auto";
                close();
                axios.get('https://neocafe6.herokuapp.com/categories').then((res)=>{
                    dispatch(setCategories(res.data.data));
                })
            }),
            {
                pending: 'Создание',
                success: 'Категория создана',
                error: 'Ошибка'
            }
        )
    }
    document.body.style.overflow = "hidden";
    return (
        <div className="new-category-holder">
            <div className="new-category-window">
                <img src={close_icon} alt="close" className="new-category-close" onClick={()=>{
                    close();
                    document.body.style.overflow = "auto";
                    }}/>
                <h1 className="new-category-title">Новая категория</h1>
                <input type="text"
                placeholder="Название категории" 
                className="new-category-input" 
                onChange={(e)=>setName(e.target.value)}/>
                <button type="submit" className="new-category-button" onClick={handleSubmit}>Создать</button>
            </div>
        </div>
    )
}

export default NewCategory
