import React, {useState} from 'react'
import Search from '../components/Search';
import AddButton from '../../media/AddButton.svg';
import { useSelector } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import '../menu.css';
import NewDish from './NewDish';
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import DeleteDish from './windows/DeleteDish';
import { useHistory } from 'react-router';
import NewCategory from './windows/NewCategory';
import { setCategories } from '../../../redux/actions/productActions';
import { useDispatch } from 'react-redux';

const Delete = (data) =>{
    return (<DeleteDish data={data}></DeleteDish>)
}


const ProductList = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [filter, setFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState(-1);
    const [newDish, setNewDish] = useState(false);

    const [deleteDish, setDeleteDish] = useState(false);
    const [deleteDishData, setDeleteDishData] = useState(null);

    const [ options, setOptions ] = useState(false);
    const [ createCategory, setCreateCategory ] = useState(false);
    const [ deleteCategory, setDeleteCategory ] = useState(false);

    const handleFilterByName = (e) => {
        setFilter(e.target.value);
    }
    const productList = useSelector((state)=>state);
    const categoriesList = useSelector((state)=>state).allProducts.categories;
    const renderList = productList.allProducts.dishes.filter((item)=>{
        if (filter === '') {
            if (categoryFilter == -1 || categoryFilter == -2) return item;
            else {
                if (item.category && item.category == categoryFilter) {
                    return item;
                }
            }
        }
        else if (item.name.toLowerCase().includes(filter.toLowerCase())){
            if (categoryFilter == -1) return item;
            else {
                if (!item.category && item.category == categoryFilter) {
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
            <img src={item.image} alt="product image" className="menu-product-list-item-image no-event"></img>
            <div className="menu-product-list-item-name no-event">{item.name}</div>
            <div className="menu-product-list-item-volume no-event">{item.volume}</div>
            <div className="menu-product-list-item-consist no-event">{
                item.recipe.map((item, index)=>{
                    return (index < 4) && index !== 2 ? <p style={{margin: '0px'}} key={index}>{`${item.name} ${item.quantity} ${item.unit},`}&nbsp;</p> :
                    (index < 4) && index === 2 ? <p style={{margin: '0px'}} key={index}>{`${item.name} ${item.quantity} ${item.unit}`}&nbsp;</p> :
                    ''
                })
            }</div>
            <div className="menu-product-list-item-price no-event">{item.price} c</div>
            <div className="product-item-options"
            onClick={(e)=>{
                e.stopPropagation();
                if (e.target.childNodes[0].style.display != 'block') {
                    e.target.childNodes[0].style.display = 'block';
                    e.target.childNodes[1].style.display = 'block';
                }
            }}>
                <div className="product-item-actions-frame"
                onClick={(e)=>{
                    e.stopPropagation();
                    e.target.nextSibling.style.display = 'none';
                    e.target.style.display = 'none';
                    }}> 
                </div>
                <div className="product-item-actions">
                        <p 
                        className="product-item-actions-list"
                        onClick={(e)=>{
                            e.stopPropagation();
                            e.target.parentNode.previousSibling.click();
                            setDeleteDishData({id: item.id, name: item.name, close: ()=>setDeleteDish(false), element: e.target.parentNode.parentNode.parentNode});
                            setDeleteDish(true);
                            
                            
                        }}>Удалить</p>
                        <p 
                        className="product-item-actions-list"
                        onClick={(e)=>{
                            e.stopPropagation();
                            window.location = `/menu/${item.id}`
                        }}>Редактировать</p>
                    </div>
                <p className="dots no-event">.</p>
                <p className="dots no-event">.</p>
                <p className="dots no-event">.</p>
            </div>
        </div>
    ));
    return (
        <>
            {deleteDish && 
            <DeleteDish data={deleteDishData} />}
            {createCategory &&
            <NewCategory close={()=>setCreateCategory(false)} />}
            
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
                    {options &&
                    <div className="extra-options-window">
                        {deleteCategory &&
                        <>
                            {categoriesList.map((item, index)=>(
                                <p 
                                key={index}
                                onClick={()=>{
                                    toast.promise(
                                        axios.delete(`https://neocafe6.herokuapp.com/categories/${item.id}`).then((res)=>{
                                            setDeleteCategory(false);
                                            setOptions(false);
                                            axios.get('https://neocafe6.herokuapp.com/categories').then((res)=>{
                                                dispatch(setCategories(res.data.data));
                                            })
                                        }),
                                        {
                                            pending: 'Удаление',
                                            success: 'Категория удалена',
                                            error: 'Ошибка'
                                        }
                                    )
                                }}>{item.name}</p>
                            ))}
                        </>}
                        {!deleteCategory &&
                        <>
                            <p onClick={(e)=>{
                                history.push('/menu/new-dish')
                            }}>Добавить блюдо</p>
                            <p onClick={(e)=>{
                                setOptions(false);
                                setCreateCategory(true);
                            }}>Добавить категорию</p>
                            <p onClick={(e)=>{
                                setDeleteCategory(true);
                            }}>Удалить категорию</p>
                        </>}
                    </div>}
                    <img src={AddButton} onClick={()=>{
                        if(options) {
                            setOptions(false);
                            setDeleteCategory(false);
                        }
                        else setOptions(true);
                    }} alt="add button" className="menu-filter-add-button"/>
                    
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
