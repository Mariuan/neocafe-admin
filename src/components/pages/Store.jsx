import React,{ useState, useEffect } from 'react'
import Search from './components/Search';
import AddButton from '../media/AddButton.svg';
import close from '../media/coolicon.svg';
import './store.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { setBranches, setProducts } from '../../redux/actions/productActions';
import { toast } from 'react-toastify';


const fethcProducts = async () => {
    const response = await axios.get('https://neocafe6.herokuapp.com/storages?limit=100').catch((err)=>console.log(err));
    return await response.data;
}

const fethcBranches = async () =>{
    const response = await axios.get('https://neocafe6.herokuapp.com/branches');
    return await response.data.data;
}

const Store = () => {
    const dispatch = useDispatch();
    const state = useSelector((state)=>state);
    const [filterByName, setFilterByName] = useState('');
    const [filterByBranch, setFilterByBranch] = useState(-2);
    const [filterByCategory, setFilterByCategory] = useState(-2);
    const [fillWindow, setFillWindow] = useState(false);
    const [fillData, setFillData] = useState(null);

    const handleFilterByName = (e) => {
        setFilterByName(e.target.value);
    }
    useEffect(() => {
        fethcProducts().then((res)=>dispatch(setProducts(res.data)));
        fethcBranches().then((res)=>dispatch(setBranches(res)));
    }, [])

    const products = useSelector((state)=>state);
    const renderList = products.allProducts.store;
    return (
        <div className="store">
            {fillWindow &&
            <div className="store-fill-holder">
                <div className="store-fill-window">
                    <img src={close} alt="close" 
                    className="store-fill-close-icon"
                    onClick={()=>{
                        setFillWindow(false);
                        setFillData(null);
                    }}/>
                    <h1 className="store-fill-title">{fillData.name}</h1>
                    <h1 className="store-fill-subtitle">{fillData.branch_name}</h1>
                    <input 
                    type="text"
                    placeholder="????????????????????"
                    className="store-fill-input"/>
                    <button
                    type="button"
                    className="store-fill-button"
                    onClick={(e)=>{
                        toast.promise(
                        axios.patch(`https://neocafe6.herokuapp.com/update-storage`, {
                            branch: fillData.branch,
                            product: fillData.id,
                            reserve: parseInt(e.target.previousSibling.value)
                        }).catch((err)=>{
                            console.log(err);
                        }).then((res)=>{
                            if (res.status >= 200 && res.status < 400) {
                                setFillWindow(false);
                                setFillData(null);
                                document.body.style.overflow = "auto";
                                fethcProducts().then((res)=>dispatch(setProducts(res.data)));
                            }
                        }),
                        {
                            pending: '????????????????????',
                            success: '?????????????? ????????????????',
                            error: '????????????'
                        });
                    }}>??????????????????</button>
                </div>
            </div>}
            <div className="store-filter-block">
                <div className="store-filter-search">
                    <Search handleFilterByName={handleFilterByName}></Search>
                </div>
                <div className="store-filter-select">
                    <select className="store-filter-by-branch" defaultValue={-2} onChange={(e)=>{
                        setFilterByBranch(parseInt(e.target.value));
                        if (e.target.value != -1) {
                            e.target.style.color = "#000";
                        }
                    }}>
                        <option value={-2} disabled hidden>???????????????? ????????????</option>
                        <option value={-1}>??????</option>
                        {state.allProducts.branches.map((item)=>(
                            <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                    </select>
                    <select className="store-filter-by-category" defaultValue={-2} onChange={(e)=>{
                        switch(parseInt(e.target.value)) {
                            case -1: {
                                setFilterByCategory(-1);
                                break;
                            }
                            case 0: {
                                setFilterByCategory('?????????????? ??????????????????');
                                break;
                            }
                            case 1: {
                                setFilterByCategory('??????????');
                                break;
                            }
                            case 2: {
                                setFilterByCategory('???????? ??????????????????');
                                break;
                            }
                        }
                        if (e.target.value != -2) {
                            e.target.style.color = "#000";
                        }
                    }}>
                        <option value={-2} disabled hidden>?????? ??????????????????</option>
                        <option value={-1}>??????</option>
                        <option value={0}>?????????????? ??????????????????</option>
                        <option value={1}>??????????</option>
                        <option value={2}>???????? ??????????????????</option>
                    </select>
                </div>
                <div className="store-filter-extra-options">
                    <a href="/store/new-product">
                    <img src={AddButton} alt="add new employees button" className="store-filter-add-button" />
                    </a>
                </div>
            </div>
            <div className="store-products-list-title">
                <div className="store-products-list-title-number">???</div>
                <div className="store-products-list-title-name">????????????????????????</div>
                <div className="store-products-list-title-quantity">????????????????????</div>
                <div className="store-products-list-title-limit">??????????</div>
                <div className="store-products-list-title-date">???????? ??????????????</div>
            </div>
            <div className="store-products-render-list">
                {renderList.filter((item)=>{
                    if (filterByName == '') return item;
                    else {
                        if (item.name.toLowerCase().includes(filterByName.toLowerCase())) return item;
                    }
                }).filter((item)=>{
                    if (filterByBranch < 0) return item;
                    else {
                        if (filterByBranch == item.branch_id) return item;
                    }
                }).filter((item)=>{
                    console.log(filterByCategory);
                    if (filterByCategory < 0) return item;
                    else {
                        if (filterByCategory == '???????? ??????????????????') {
                            if (item.reserve < item.limit) return item;
                        }
                        else {
                            if (filterByCategory == item.category) return item;
                        }
                    }
                }).map(({product, reserve, limit, branch_id, product_id, branch, last_update, unit}, index)=>(
                    <div 
                    key={index} 
                    className="store-product-list-item"
                    onClick={(e)=>{
                        if (e.target.classList[1]) {
                            e.target.classList.remove('selected');
                        }
                        else {
                            e.target.classList.add('selected');
                        }
                    }}>
                        <div className="store-product-list-item-number no-event">{index}</div>
                        <div className="store-product-list-item-name no-event">{product}</div>
                        <div className="store-product-list-item-quantity no-event">{reserve} {unit}</div>
                        <div className="store-product-list-item-limit no-event">{limit} {unit}</div>
                        <div className="store-product-list-item-date no-event">{last_update[8]}{last_update[9]}.{last_update[5]}{last_update[6]}.{last_update[0]}{last_update[1]}{last_update[2]}{last_update[3]}</div>
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
                                document.body.style.overflow = "hidden";
                                setFillWindow(true);
                                setFillData({branch: branch_id, id: product_id, name: product, branch_name: branch})
                                e.target.parentNode.previousSibling.click();
                            }}>??????????????????</p>
                        <p 
                        className="product-item-actions-list"
                        onClick={(e)=>{
                            e.stopPropagation();
                            toast.promise(
                            axios.delete(`https://neocafe6.herokuapp.com/products/${product_id}`).then((res)=>{
                                if (res.status == 200) e.target.parentNode.parentNode.parentNode.remove();
                            }),
                            {
                                pending: '????????????????',
                                success: '?????????? ????????????',
                                error: '????????????'
                            });
                            
                        }}>??????????????</p>
                        <p 
                        className="product-item-actions-list"
                        onClick={(e)=>{
                            e.stopPropagation();
                            window.location = `/store/${product_id}`
                        }}>??????????????????????????</p>
                        
                    </div>
                <p className="dots no-event">.</p>
                <p className="dots no-event">.</p>
                <p className="dots no-event">.</p>
            </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Store
