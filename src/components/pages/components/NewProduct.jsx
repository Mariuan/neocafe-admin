import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setCategories } from '../../../redux/actions/productActions';
import './newProduct.css';
import axios from 'axios';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

const fetchCategories = async () => {
    const response = await axios.get('https://neocafe6.herokuapp.com/categories');
    return await response.data;
}

const NewProduct = () => {
    const state = useSelector((state)=>state);
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [arrive, setArrive] = useState('');
    const [ category, setCategory] = useState(null);
    const [type, setType] = useState(null);
    const [limit, setLimit] = useState(null);

    useEffect(() => {
        fetchCategories().then((res)=>dispatch(setCategories(res.data)));
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            name: name,
            unit: type,
            min: limit,
        }
        if (category == 0) data = {...data, category: "Сырьё"};
        else if (category == 1) data = {...data, category: "Готовая продукция"}
        toast.promise(
        axios.post('https://neocafe6.herokuapp.com/products', data).catch((err)=>console.log(err)).then((res)=>{
            history.push('/store');
        }),
        {
            pending: 'Удаление',
            success: 'Товар добавлен',
            error: 'Ошибка'
        });
    }
    return (
        <div className="new-product-page">
            <div className="new-product-content">
                <h1 className="new-product-title">Новый товар</h1>
                <input type="text" 
                className="new-product-name" 
                placeholder="Наименование товара" 
                onChange={(e)=>{
                    setName(e.target.value);
                }}/>
                <input type="text" 
                className="new-product-limit"
                placeholder="Лимит"
                onChange={(e)=>{
                    setLimit(parseInt(e.target.value));
                }}/>
                <select defaultValue={-1} className="new-product-category" onChange={(e)=>{
                    setCategory(parseInt(e.target.value));
                    if (e.target.value >= 0) e.target.style.color = "#464646";
                }}>
                    <option value={-1} disabled hidden>Категория</option>
                    <option value={0}>Сырьё</option>
                    <option value={1}>Готовая продукция</option>
                </select>
                <select className="new-product-type" defaultValue={-1} onChange={(e)=>{
                    if (e.target.value >= 0) e.target.style.color = "#464646";
                    if (e.target.value == 0) setType('Г');
                    else if (e.target.value == 1) setType('Мл');
                    else if (e.target.value == 2) setType('Шт');
                }}>
                    <option value={-1} disabled hidden>Г, Мл, Шт</option>
                    <option value={0}>Г</option>
                    <option value={1}>Мл</option>
                    <option value={2}>Шт</option>
                </select>
                <br/>
                <button 
                type="submit"
                className="new-product-save-button"
                onClick={handleSubmit}>Сохранить</button>
                <button 
                type='button'
                className="new-product-cancel-button"
                onClick={()=>window.location='/store'}>Отменить</button>
            </div>
        </div>
    )
}

export default NewProduct