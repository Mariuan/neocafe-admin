import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import coffee_icon from '../media/Coffee.svg';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import './components/newDish.css';
import { setCategories, setProducts, setSelectedDish } from '../../redux/actions/productActions';
import { useParams } from 'react-router';

const fetchProducts = async () => {
    const response =  await axios.get('https://neocafe6.herokuapp.com/products');
    return await response.data;
}

const fetchCategories = async () => {
    const response = await axios.get('https://neocafe6.herokuapp.com/categories');
    return await response.data;
}

const fetchDish = async (id) => {
    const response = await axios.get(`https://neocafe6.herokuapp.com/dishes/${id}`);
    return response.data.data;
}


const EditDish = () => {
    const dispatch = useDispatch();
    const dishId = useParams();
    const state = useSelector((state)=>state);
    const [consists, setConsists] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(-1);
    const [ image, setImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    console.log(consists);
    let arrConsist = [];
    if (state.allProducts.selectedDish.length == 0) {
        fetchDish(dishId.id).then((res)=>{
            dispatch(setSelectedDish(res));
            if (consists.length == 0) {
                setConsists(res.recipe);
                console.log(res.recipe);
            }
            if (name == '') setName(res.name);
            if (price == '') setPrice(res.price);
            if (category < 0) setCategory(res.category);
            if (!image) {
                setImageSrc(res.image);
            }
        });
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
        data.append("id",dishId.id);
        data.append("name", name);
        data.append("category", category);
        data.append("price", price);
        for (let i = 0; i < consists.length; i++) {
            data.append("recipe", JSON.stringify(consists[i]));
        }
        if (image) data.append('image', image);
        // let config = {
        //     id: dishId.id,
        //     name: name,
        //     category: category,
        //     price: price,
        //     recipe: consists
        // }
        // if (image) {
        //     config = {...config, image: image}
        // }
        axios.patch(`https://neocafe6.herokuapp.com/dishes/${dishId.id}`, data).catch((err)=>console.log(err)).then((res)=>{
            window.location = "/menu";
        })
    }
    return (
        <div className="new-dish-back">
            <div className="new-dish-content">
                <h1 className="new-dish-title">Изменить блюдо</h1>
                <div className="new-dish-image-window">
                    <div className="image-window-content">
                            {!imageSrc &&
                            <img src={image} alt="dish image"/>}
                            {imageSrc &&
                            <img src={imageSrc} alt="dish image" width={110} />}
                            <p className="image-input-label"
                            onClick={(e)=>{
                                e.target.nextSibling.click(); 
                            }}>Изменить картинку</p>
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
                    value={name}
                    style={{color: "#464646"}}
                    onChange={(e)=>{
                        setName(e.target.value)
                    }}
                    required/>
                    <input className="input dish-price-input"
                    placeholder="Стоимость блюда"
                    value={price}
                    onChange={(e)=>{
                        setPrice(e.target.value);
                    }}/>
                    <select className="new-dish-category input" value={category}
                    onChange={(e)=>{
                        setCategory(parseInt(e.target.value));
                    }}>
                        <option 
                        value={-1}
                        >Категория</option>
                        {state.allProducts.categories.map((item, index)=>(
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <h1 className="new-dish-subtitle">Состав блюда</h1>
                    {consists.map((item, index)=>(
                        <div key={index}>
                            <select className="dish-name-input input"
                            defaultValue={-1}
                            onChange={(e)=>{
                                if (e.target.value != -1) {
                                    e.target.style.color = "#000";
                                }
                                let data = consists;
                                data[index].product = parseInt(e.target.value)
                                setConsists(data);
                            }}>
                                <option value={-1} disabled hidden>Ингридиент</option>
                                {state.allProducts.store.map((item, index)=>(
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <input type="text" 
                            className="dish-quantity-input input"
                            placeholder="Количество"
                            onChange={(e)=>{
                                let data = consists;
                                data[index].quantity = parseInt(e.target.value);
                                setConsists(data);
                            }}/>
                            {/* <select className="new-dish-category input" 
                            value={item.unit}
                            onChange={(e)=>{
                                let data = consists;
                                data[index].unit = e.target.value;
                                setConsists(data);
                            }}>
                                <option value={-1} disabled hidden>г, мл</option>
                                <option value='г'>Г</option>
                                <option value='Мл'>Мл</option>
                            </select> */}
                        </div>
                    ))}

                    <button type="button" className="new-dish-add-more-button" onClick={(e)=>{
                        let data = consists;
                        data = [...data, {product: null, quantity: null}]
                        setConsists(data);
                    }}>Добавить ещё</button>
                    <button type="submit" className="new-dish-save-button" onClick={handleSubmit}>Сохранить</button>
                    <button type="button" className="new-dish-cancel-button" onClick={()=>window.location = "/menu"}>Отменить</button>
            </div>
        </div>
    )
}

export default EditDish