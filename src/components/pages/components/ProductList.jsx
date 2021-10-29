import React, {useState} from 'react'
import Search from '../components/Search';
import AddButton from '../../media/AddButton.svg';
import { useSelector } from 'react-redux';
import '../menu.css';

const ProductList = () => {
    const [filter, setFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(-1);
    const handleFilterByName = (e) => {
        setFilter(e.target.value);
    }
    const productList = useSelector((state)=>state);
    const categoriesList = useSelector((state)=>state).allProducts.categories;
    const renderList = productList.allProducts.products.filter((item)=>{
        if (item.category) console.log("Didn't");
        if (filter === '') {
            if (categoryFilter == -1) return item;
            else {
                if (item.category && item.category.id == categoryFilter) {
                    return item;
                } 
                else return item;
            }
        }
        else if (item.name.toLowerCase().includes(filter.toLowerCase())){
            if (categoryFilter == -1) return item;
            else {
                if (!item.category && item.category.id == categoryFilter) {
                    return item;
                }
            }
        }
    }).map(({id, name, description, price, image}, index)=>(
        <div className="menu-product-list-item" key={id} onClick={(e)=>{
            if (e.target.classList[1]) {
                e.target.classList.remove('selected');    
            }
            else {
                e.target.classList.add('selected');
            }
            
        }}>
            <div className="menu-product-list-item-number no-event">{index+1}</div>
            <img src={image} alt="product image" className="menu-product-list-item-image no-event"></img>
            <div className="menu-product-list-item-name no-event">{name}</div>
            <div className="menu-product-list-item-volume no-event">250 мл</div>
            <div className="menu-product-list-item-consist no-event">-</div>
            <div className="menu-product-list-item-price no-event">{price} c</div>
        </div>
    ));
    return (
        <>
            <div className="menu-filter-block">
                <div className="menu-filter-search">
                    <Search handleFilterByName={handleFilterByName}></Search>
                </div>
                <div className="menu-filter-select">
                    <select className="menu-filter-by-categories" defaultValue={-1} onChange={(e)=>{
                        setCategoryFilter(parseInt(e.target.value));
                        if (e.target.value != -1) {
                            e.target.style.color = "#000";
                        }
                    }}>
                        <option value={-1} disabled hidden>Категория товара</option>
                        {categoriesList.map(({id, image, name})=>(
                            <option key={id} value={id}>{name}</option>
                        ))}
                    </select>
                </div>
                <div className="menu-filter-other-options">
                    <img src={AddButton} alt="add button" className="menu-filter-add-button"/>
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