import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import coffee_icon from '../../media/Coffee.svg';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import './newDish.css';
import { setCategories, setProducts } from '../../../redux/actions/productActions';

const fetchProducts = async () => {
    const response =  await axios.get('https://neocafe6.herokuapp.com/products');
    return await response;
}

const fetchCategories = async () => {
    const response = await axios.get('https://neocafe6.herokuapp.com/categories');
    return await response;
}


const NewDish = () => {
    const dispatch = useDispatch();
    const state = useSelector((state)=>state);
    const [consistAmount, setConsistAmount] = useState(1);
    const [dishData ,setDishData] = useState({name: null, price: null, category: null, image: null, recipe: []})
    let consists = [{name: null, quantity: null, unit: null}]
    let arrConsist = [];
    for (let i = 0; i < consistAmount; i++) {
        arrConsist.push(i);
    }
    useEffect(() => {
        fetchProducts().then((res)=>{
            dispatch(setProducts(res.data));
        });
        fetchCategories().then((res)=>{
            dispatch(setCategories(res.data));
        })

    }, [])
    console.log(dishData);
    console.log(consists);
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
                            className="image-input"/>
                    </div>
                </div>
                <input type="text" 
                    className="input dish-name-input"
                    placeholder="Наименование блюда"
                    onChange={(e)=>{
                        setDishData({...dishData, name: e.target.value});
                    }}
                    required/>
                    <input className="input dish-price-input"
                    placeholder="Стоимость блюда"
                    onChange={(e)=>{
                        setDishData({...dishData, price: parseInt(e.target.value)});
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
                                consists[index].name = state.allProducts.store[index].name;
                            }}>
                                <option value={-1}>Ингридиент</option>
                                {state.allProducts.store.map((item, index)=>(
                                    <option key={item.id} value={index}>{item.name}</option>
                                ))}
                            </select>
                            <input type="text" 
                            className="dish-quantity-input input"
                            placeholder="Количество"/>
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
                        setConsistAmount(consistAmount+1);
                        consists = [...consists, {name: null, quantity: null, unit: null}];
                        console.log(consists);
                    }}>Добавить ещё</button>
                    <button type="submit" className="new-dish-save-button">Сохранить</button>
                    <button type="button" className="new-dish-cancel-button" onClick={()=>window.location = "/menu"}>Отменить</button>
            </div>
        </div>
    )
}

export default NewDish
