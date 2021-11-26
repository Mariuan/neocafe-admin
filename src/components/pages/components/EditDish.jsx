import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import coffee_icon from '../../media/Coffee.svg';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import './newDish.css';
import { setCategories, setProducts } from '../../../redux/actions/productActions';
import { useParams } from 'react-router';

const fetchProducts = async () => {
    const response =  await axios.get('https://neocafe6.herokuapp.com/products');
    return await response;
}

const fetchCategories = async () => {
    const response = await axios.get('https://neocafe6.herokuapp.com/categories');
    return await response;
}

const fetchDish = async (id) => {
    const response = await axios.get(`https://neocafe6.herokuapp.com/dishes/${id}`);
    console.log(await response);
}

const NewDish = () => {
    const dispatch = useDispatch();
    const dishId = useParams();
    const state = useSelector((state)=>state);
    const [consistAmount, setConsistAmount] = useState(1);
    const [ image, setImage] = useState();
    let arrConsist = [];
    
    fetchDish();







    useEffect(() => {
        fetchProducts().then((res)=>{
            dispatch(setProducts(res.data));
        });
        fetchCategories().then((res)=>{
            dispatch(setCategories(res.data));
        })

    }, [])
    const handleSubmit = () => {
        
    }
    return (
        <div className="new-dish-back">
            <div className="new-dish-content">
                <h1 className="new-dish-title">Новое блюдо</h1>
                <div className="new-dish-image-window">
                    <div className="image-window-content">
                            <img src={coffee_icon} alt="coffee icon" />
                            <p className="image-input-label"
                            onClick={(e)=>{
                                e.target.nextSibling.click(); 
                            }}>Добавить картинку</p>
                            <input type="file" 
                            accept="image/png, image/svg, image/jpeg, image/png" 
                            name="image"
                            className="image-input"
                            onChange={(e)=>{
                                setImage(e.target.files[0]);
                            }}/>
                    </div>
                </div>
                <input type="text" 
                    className="input dish-name-input"
                    placeholder="Наименование блюда"
                    onChange={(e)=>{
                    }}
                    required/>
                    <input className="input dish-price-input"
                    placeholder="Стоимость блюда"
                    onChange={(e)=>{
                    }}/>
                    <select className="new-dish-category input" defaultValue={-1}
                    onChange={(e)=>{
                        setDishData({...dishData, category: state.allProducts.categories[parseInt(e.target.value)].id});
                    }}>
                        <option 
                        value={-1}
                        >Категория</option>
                        {state.allProducts.categories.map((item, index)=>(
                            <option key={item.id} value={index}>{item.name}</option>
                        ))}
                    </select>
                    <h1 className="new-dish-subtitle">Состав блюда</h1>
                    {arrConsist.map((item, index)=>(
                        <div key={item.id}>
                            <select className="dish-name-input input"
                            onChange={(e)=>{
                                if (e.target.value != -1) {
                                    e.target.style.color = "#000";
                                }
                            }}>
                                <option value={-1} disabled hidden>Ингридиент</option>
                                {state.allProducts.store.map((item, index)=>(
                                    <option key={item.id} value={index}>{item.name}</option>
                                ))}
                            </select>
                            <input type="text" 
                            className="dish-quantity-input input"
                            placeholder="Количество"
                            onChange={(e)=>{
                            }}/>
                            <select className="new-dish-category input" defaultValue={-1}
                            onChange={(e)=>{
                                if (e.target.value != -1) {
                                    e.target.style.color = "#000";
                                }
                            }}>
                                <option value={-1} disabled hidden>г, мл</option>
                                <option value={0}>Г</option>
                                <option value={1}>Мл</option>
                            </select>
                        </div>
                    ))}
                    <button type="button" className="new-dish-add-more-button" onClick={(e)=>{
                    }}>Добавить ещё</button>
                    <button type="submit" className="new-dish-save-button" onClick={handleSubmit}>Сохранить</button>
                    <button type="button" className="new-dish-cancel-button" onClick={()=>window.location = "/menu"}>Отменить</button>
            </div>
        </div>
    )
}

export default NewDish