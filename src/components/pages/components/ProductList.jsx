import React, {useState} from 'react'
import Search from '../components/Search';
import AddButton from '../../media/AddButton.svg';
import { useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import '../menu.css';
import NewDish from './NewDish';

const ProductList = () => {
    const [filter, setFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(-1);
    const [newDish, setNewDish] = useState(false);
    const handleFilterByName = (e) => {
        setFilter(e.target.value);
    }
    const productList = useSelector((state)=>state);
    const categoriesList = useSelector((state)=>state).allProducts.categories;
    const renderList = productList.allProducts.dishes.filter((item)=>{
        if (filter === '') {
            if (categoryFilter == -1 || categoryFilter == -2) return item;
            else {
                if (item.category && item.category.id == categoryFilter) {
                    return item;
                }
            }
        }
        else if (item.info.name.toLowerCase().includes(filter.toLowerCase())){
            if (categoryFilter == -1) return item;
            else {
                if (!item.info.category && item.info.category.id == categoryFilter) {
                    return item;
                }
            }
        }
    }).map((item, index)=>(
        <div className="menu-product-list-item" key={item.id} onClick={(e)=>{
            if (e.target.classList[1]) {
                e.target.classList.remove('selected');
            }
            else {
                e.target.classList.add('selected');
            }
            
        }}>
            <div className="menu-product-list-item-number no-event">{index+1}</div>
            <img src={item.info.image} alt="product image" className="menu-product-list-item-image no-event"></img>
            <div className="menu-product-list-item-name no-event">{item.info.name}</div>
            <div className="menu-product-list-item-volume no-event">{item.volume}</div>
            <div className="menu-product-list-item-consist no-event">{
                item.info.recipe.map((item, index)=>{
                    return (index < 4) && index !== 2 ? <p style={{margin: '0px'}} key={index}>{`${item.name} ${item.quantity} ${item.unit},`}&nbsp;</p> :
                    (index < 4) && index === 2 ? <p style={{margin: '0px'}} key={index}>{`${item.name} ${item.quantity} ${item.unit}`}&nbsp;</p> :
                    ''
                })
            }</div>
            <div className="menu-product-list-item-price no-event">{item.info.price} c</div>
            <div className="product-item-options"
            onClick={(e)=>{
                e.stopPropagation();
                e.target.childNodes[0].display = 'block';
                console.log(e.target.childNodes);
            }}>
                <div className="product-item-actions">
                    <p className="product-item-actions-list">Удалить</p>
                    <p className="product-item-actions-list">Редактировать</p>
                </div>
                <p className="dots no-event">.</p>
                <p className="dots no-event">.</p>
                <p className="dots no-event">.</p>
            </div>
        </div>
    ));
    return (
        <>
            <div className="menu-filter-block">
                <div className="menu-filter-search">
                    <Search handleFilterByName={handleFilterByName}></Search>
                </div>
                <div className="menu-filter-select">
                    <select className="menu-filter-by-categories" defaultValue={-2} onChange={(e)=>{
                        setCategoryFilter(parseInt(e.target.value));
                        if (e.target.value != -1) {
                            e.target.style.color = "#000";
                        }
                    }}>
                        <option value={-2} disabled hidden>Категория товара</option>
                        <option value={-1}>Все</option>
                        {categoriesList.map(({id, image, name})=>(
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className="menu-filter-other-options">
                    <a href="/menu/new-dish" className="menu-filter-add-button">
                    <img src={AddButton} alt="add button" className="menu-filter-add-button"/>
                    </a>
                    
                </div>
            </div>
            <div className="menu-product-list">
                <div className="menu-product-list-title">
                    <div className="menu-product-list-title-item menu-product-list-number">№</div>
                    <div className="menu-product-list-title-item menu-product-list-title">Наименование</div>
                    <div className="menu-product-list-title-item menu-product-list-volume">Объём</div>
                    <div className="menu-product-list-title-item menu-product-list-consist">Состав</div>
                    <div className="menu-product-list-title-item menu-product-list-price">Цена</div>
                </div>
                <div className="menu-product-list-content">
                    {renderList}
                </div>
            </div>
        </>
    )
}

export default ProductList
