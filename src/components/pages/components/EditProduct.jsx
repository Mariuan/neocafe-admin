import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setCategories, setSelectedProduct } from '../../../redux/actions/productActions';
import './newProduct.css';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { toast } from 'react-toastify';


const EditProduct = () => {
    const state = useSelector((state)=>state);
    const dispatch = useDispatch();
    const productId = useParams();
    const history = useHistory();
    const [name, setName] = useState('');
    const [category, setCategory] = useState(-1);
    const [type, setType] = useState(-1);
    const [limit, setLimit] = useState('');
    const [ status, setStatus ] = useState(false);


    if (!status) {
        axios.get(`https://neocafe6.herokuapp.com/products/${productId.id}`).catch((err)=>{
            console.log(err);
        }).then((res)=>{
            console.log(res.data);
            dispatch(setSelectedProduct(res.data));
            setStatus(true);
            if (name == '') setName(res.data.name);
            if (type == -1) {
                if (res.data.unit == 'Г') setType(0);
                else if (res.data.unit == 'Мл') setType(1);
                else if (res.data.unit == 'Шт') setType(2);
            }
            if (limit == '') setLimit(res.data.min);
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        let unit;
        
        if (type == 0) unit = 'Г';
        else if (type == 1) unit = 'Мл';
        else if (type == 2) unit = 'Шт';
        toast.promise(
        axios.patch(`https://neocafe6.herokuapp.com/products/${productId.id}`, {
            name: name,
            unit: unit,
            min: parseInt(limit),
        }).catch((err)=>console.log(err)).then((res)=>{
            // history.push('/store');
            console.log(res);
        }),
        {
            pending: 'Редактирование',
            success: 'Товар изменён',
            error: 'Ошибка'
        });
    }
    return (
        <div className="new-product-page">
            <div className="new-product-content">
                <h1 className="new-product-title">Редактирование товара</h1>
                <input type="text" 
                className="new-product-name" 
                placeholder="Наименование товара" 
                value={name}
                onChange={(e)=>{
                    setName(e.target.value);
                }}/>
                <input type="text" 
                className="new-product-limit"
                placeholder="Лимит"
                value={limit}
                onChange={(e)=>{
                    setLimit(e.target.value);
                }}/>
                <select defaultValue={-1} className="new-product-category" onChange={(e)=>{
                    setCategory(parseInt(e.target.value));
                }}>
                    <option value={-1} disabled hidden>Категория</option>
                    <option value={0}>Сырьё</option>
                    <option value={1}>Готовая продукция</option>
                </select>
                <select className="new-product-type edit" value={type} onChange={(e)=>{
                    setType(parseInt(e.target.value))
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

export default EditProduct
