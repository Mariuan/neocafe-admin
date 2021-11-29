import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import coffee_icon from '../../media/Coffee.svg';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import './newDish.css';
import { setCategories, setProducts } from '../../../redux/actions/productActions';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';

const fetchProducts = async () => {
    const response =  await axios.get('https://neocafe6.herokuapp.com/products');
    return await response.data;
}

const fetchCategories = async () => {
    const response = await axios.get('https://neocafe6.herokuapp.com/categories');
    return await response.data;
}



const NewDish = () => {
    const dispatch = useDispatch();
    const state = useSelector((state)=>state);
    const history = useHistory();
    const [consistAmount, setConsistAmount] = useState(1);
    const [dishData ,setDishData] = useState({name: null, price: null, category: null, image: null, recipe: []})
    const [consists, setConsists] = useState([{product: null, quantity: null}])
    const [ image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
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
    const handleSubmit = () => {
        let data = new FormData();
        data.append("name", dishData.name);
        data.append("price", dishData.price);
        data.append("category", dishData.category);
        data.append("image", image);
        for (let i  in consists) {
            data.append('recipe[]', JSON.stringify(consists[i]));
        }
        toast.promise(
        axios.post('https://neocafe6.herokuapp.com/dishes', data).catch((err)=>console.log(err)).then((res)=>history.push('/menu')),
        {
            pending: 'Добавление',
            success: 'Блюдо добавлено',
            error: 'Ошибка'
        });
    }
    return (
        <div className="new-dish-back">
            <div className="new-dish-content">
                <h1 className="new-dish-title">Новое блюдо</h1>
                <div className="new-dish-image-window">
                    <div className="image-window-content">
                            {!image &&
                            <img src={coffee_icon} alt="coffee icon" />}
                            {image &&
                            <img src={imageSrc} width={110} />}
                            {!image &&
                            <p className="image-input-label"
                            onClick={(e)=>{
                                e.target.nextSibling.click(); 
                            }}>Добавить картинку</p>}
                            {image &&
                            <p className="image-input-label"
                            onClick={(e)=>{
                                e.target.nextSibling.click(); 
                            }}>Изменить картинку</p>}
                            <input type="file" 
                            accept="image/png, image/svg, image/jpeg, image/png" 
                            name="image"
                            className="image-input"
                            onChange={(e)=>{
                                setImage(e.target.files[0]);
                                const file = e.target.files[0];
                                var reader = new FileReader();
                                var url = reader.readAsDataURL(file);
                                reader.onloadend = (e)=>{
                                    setImageSrc(reader.result);
                                }
                                setImageSrc(url);
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
                        setDishData({...dishData, category: parseInt(e.target.value)});
                    }}>
                        <option 
                        value={-1}
                        >Категория</option>
                        {state.allProducts.categories.map((item, index)=>(
                            <option key={index} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <h1 className="new-dish-subtitle">Состав блюда</h1>
                    {arrConsist.map((item, index)=>(
                        <div key={item.id}>
                            <select className="dish-name-input input"
                            defaultValue={-1}
                            onChange={(e)=>{
                                if (e.target.value != -1) {
                                    e.target.style.color = "#000";
                                }
                                let temp = consists;
                                temp[index].product = state.allProducts.store[parseInt(e.target.value)].id;
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
