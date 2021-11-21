import React,{ useState, useEffect } from 'react'
import Search from './components/Search';
import AddButton from '../media/AddButton.svg';
import './store.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { setProducts } from '../../redux/actions/productActions';


const fethcProducts = async () => {
    const response = await axios.get('https://neocafe6.herokuapp.com/products').catch((err)=>console.log(err));
    return await response.data;
}

const Store = () => {
    const dispatch = useDispatch();
    const [filterByName, setFilterByName] = useState('');
    const [filterByBranch, setFilterByBranch] = useState(-1);
    const [filterByCategory, setFilterByCategory] = useState(-1);

    const handleFilterByName = (e) => {
        setFilterByName(e.target.value);
    }

    useEffect(() => {
        fethcProducts().then((res)=>dispatch(setProducts(res.data)));
        
    }, [])

    const products = useSelector((state)=>state);
    const renderList = products.allProducts.store;
    return (
        <div className="store">
            <div className="store-filter-block">
                <div className="store-filter-search">
                    <Search handleFilterByName={handleFilterByName}></Search>
                </div>
                <div className="store-filter-select">
                    <select className="store-filter-by-branch" defaultValue={-1} onChange={(e)=>{
                        setFilterByBranch(parseInt(e.target.value));
                        if (e.target.value != -1) {
                            e.target.style.color = "#000";
                        }
                    }}>
                        <option value={-1} disabled hidden>Выберите филиал</option>
                        <option value={0}>NeoCafe №1</option>
                        <option value={1}>NeoCafe №2</option>
                        <option value={2}>NeoCafe №3</option>
                        <option value={3}>NeoCafe №4</option>
                        <option value={4}>NeoCafe №5</option>
                        <option value={5}>NeoCafe №6</option>
                    </select>
                    <select className="store-filter-by-category" defaultValue={-1} onChange={(e)=>{
                        switch(parseInt(e.target.value)) {
                            case 0: {
                                setFilterByCategory('Готовая продукция');
                                break;
                            }
                            case 1: {
                                setFilterByCategory('Сырьё');
                                break;
                            }
                            case 2: {
                                setFilterByCategory('Надо пополнить');
                                break;
                            }
                        }
                        if (e.target.value != -1) {
                            e.target.style.color = "#000";
                        }
                    }}>
                        <option value={-1} disabled hidden>Вид продукции</option>
                        <option value={0}>Готовая продукция</option>
                        <option value={1}>Сырьё</option>
                        <option value={2}>Надо пополнить</option>
                    </select>
                </div>
                <div className="store-filter-extra-options">
                    <a href="/store/new-product">
                    <img src={AddButton} alt="add new employees button" className="store-filter-add-button" />
                    </a>
                </div>
            </div>
            <div className="store-products-list-title">
                <div className="store-products-list-title-number">№</div>
                <div className="store-products-list-title-name">Наименование</div>
                <div className="store-products-list-title-quantity">Количество</div>
                <div className="store-products-list-title-limit">Лимит</div>
                <div className="store-products-list-title-date">Дата прихода</div>
            </div>
            <div className="store-products-render-list">
                {renderList.filter((item)=>{
                    if (filterByName == '') {
                        if (filterByBranch == -1) {
                            if (filterByCategory == -1) {
                                return item;
                            }
                            else {
                                if (filterByCategory == item.category) return item;
                            }
                        }
                        else {
                            if (filterByBranch+1 == item.branch) {
                                if (filterByCategory == -1) {
                                    return item;
                                }
                                else {
                                    if (filterByCategory == item.category) return item;
                                };
                            }
                        }
                    } 
                    else {
                        if (filterByBranch == -1) {
                            if (filterByCategory == -1){
                                if (item.name.toLowerCase().includes(filterByName.toLowerCase())) return item; 
                            }
                            else {
                                if (filterByCategory == item.category) {
                                    if (item.name.toLowerCase().includes(filterByName.toLowerCase())) return item;
                                }
                            }
                        }
                        else {
                            if (filterByBranch == item.branch) {
                                if (filterByCategory == -1) {
                                    if (item.name.toLowerCase().includes(filterByName.toLowerCase())) return item;
                                }
                                else {
                                    if (filterByCategory == item.category) {
                                        if (item.name.toLowerCase().includes(filterByName.toLowerCase())) return item;
                                    }
                                }
                            }
                        }
                    }
                }).map(({id, name, min, unit, date}, index)=>(
                    <div key={id} className="store-product-list-item">
                        <div className="store-product-list-item-number no-event">{index}</div>
                        <div className="store-product-list-item-name no-event">{name}</div>
                        <div className="store-product-list-item-quantity no-event">-</div>
                        <div className="store-product-list-item-limit no-event">{min}{` ${unit}`}</div>
                        <div className="store-product-list-item-date no-event">{date}</div>
                        <div className="store-product-list-item-option">
                            <div>.</div>
                            <div>.</div>
                            <div>.</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Store
