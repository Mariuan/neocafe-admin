import React from 'react'
import { useSelector } from 'react-redux';
import coffee_icon from '../../media/Coffee.svg';
import './newDish.css';

const NewDish = () => {
    const state = useSelector((state)=>state);
    const ConsistForm = () => (
        <>
            <input type="text" 
            className="dish-name-input" 
            placeholder="Ингридиент"/>
            <input type="text" 
            className="dish-quantity-input"
            placeholder="Количество"/>
            <select defaultValue={-1}>
                <option value={-1}>г, мл</option>
                <option value={0}>Г</option>
                <option value={1}>Мл</option>
            </select>
        </>
    )
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
                    className="dish-name-input"
                    placeholder="Наименование блюда" 
                    required/>
                    <input className="dish-price-input"
                    placeholder="Стоимость блюда"/>
                    <select defaultValue={-1}>
                        <option value={-1}>Категория</option>
                        {state.allProducts.categories.map((item)=>(
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <h1 className="new-dish-subtitle">Состав блюда</h1>
                    <ConsistForm />
                    <button type="button" className="new-dish-add-more-button">Добавить ещё</button>
                    <button type="submit" className="new-dish-save-button">Сохранить</button>
                    <button type="button" className="new-dish-cancel-button">Отменить</button>
            </div>
        </div>
    )
}

export default NewDish
