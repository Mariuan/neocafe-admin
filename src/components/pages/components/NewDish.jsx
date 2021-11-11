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
    const [consists, setConsists] = useState([{name: null, quantity: null, unit: null}])
    const [ image, setImage] = useState();
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
    console.log(image);
    const handleSubmit = () => {
        axios.get('https://neocafe6.herokuapp.com/dishes').then((res)=>console.log(res));
        axios.post('https://neocafe6.herokuapp.com/dishes', {
            name: dishData.name,
            price: dishData.price,
            category: dishData.category,
            image: image,
            recipe: consists
        }).catch((err)=>console.log(err));
        // axios.post('https://neocafe6.herokuapp.com/dishes', {
        //     name: dishData.name,
        //     price: dishData.price,
        //     category: dishData.category,
        //     image: image,
        //     recipe: consists
        // },
        // {
        //     headers: `Bearer ${localStorage.getItem('neo-cafe-admin-token')}`
        // })
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
                                if (e.target.value != -1) {
                                    e.target.style.color = "#000";
                                }
                                let temp = consists;
                                temp[index].name = state.allProducts.store[parseInt(e.target.value)].name;
                                console.log(temp);
                                setConsists(temp);
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
                                const temp = consists;
                                temp[index].quantity = parseInt(e.target.value);
                                setConsists(temp);
                            }}/>
                            <select className="new-dish-category input" defaultValue={-1}
                            onChange={(e)=>{
                                if (e.target.value != -1) {
                                    e.target.style.color = "#000";
                                }
                                const temp = consists;
                                if (e.target.value == 0) consists[index].unit = 'Г'
                                else if (e.target.value == 1) consists[index].unit = 'Мл'
                            }}>
                                <option value={-1} disabled hidden>г, мл</option>
                                <option value={0}>Г</option>
                                <option value={1}>Мл</option>
                            </select>
                        </div>
                    ))}
                    <button type="button" className="new-dish-add-more-button" onClick={(e)=>{
                        setConsistAmount(consistAmount+1);
                        setConsists([...consists, {name: null, quantity: null, unit: null}]);
                        console.log(consists);
                    }}>Добавить ещё</button>
                    <button type="submit" className="new-dish-save-button" onClick={handleSubmit}>Сохранить</button>
                    <button type="button" className="new-dish-cancel-button" onClick={()=>window.location = "/menu"}>Отменить</button>
            </div>
        </div>
    )
}

export default NewDish
