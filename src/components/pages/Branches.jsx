import React, {useEffect, useState} from 'react';
import Search from './components/Search';
import AddButton from '../media/AddButton.svg';
import './branches.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setBranches } from '../../redux/actions/productActions';

const fetchBranches = async () => {
    const response = await axios.get('https://neocafe6.herokuapp.com/branches');
    return await response.data;
}

const Branches = () => {
    const dispatch = useDispatch();
    const [ filterByName, setFilterByName] = useState('');
    const [deleteBranch, setDeleteBranch] = useState(null);
    const handleFilterByName = (e) => {
        setFilterByName(e.target.value);
    }
    const handleRemove = (e)=>{
        e.target.parentNode.parentNode.parentNode.parentNode.remove();
    }
    const products = useSelector((state)=>state);
    const renderList = products.allProducts.branches;
    useEffect(()=>{
        fetchBranches().then((res)=>dispatch(setBranches(res)));
    }, [])
    return (
        <div className="branches">
            { deleteBranch != null && 
            <div className="branch-delete-frame">
                <div className="branch-delete-window">
                    <div className="branch-delete-title">Вы правда хотите удалить филиал <b>«{deleteBranch.name}»</b></div>
                    <div className="branch-delete-button-box">
                        <button 
                        type="button" 
                        className="branch-delete-confirm-button"
                        onClick={()=>{
                            deleteBranch.forEach((item)=>{
                                item.removeBranchElement();
                            });
                            setDeleteBranch(null);
                        }}>Да</button>
                        <button 
                        type="button" 
                        className="branch-delete-reject-button"
                        onClick={()=>setDeleteBranch(null)}>Нет</button>
                    </div>
                </div>
            </div>}
            <div className="branches-filter-block">
                <div className="branches-filter-search">
                    <Search handleFilterByName={handleFilterByName}></Search>
                </div>
                <div className="branches-filter-extra-options">
                    <a href="/branches/new-branch">
                        <img src={AddButton} alt="add new employees button" className="branches-filter-add-button" />
                    </a>
                </div>
            </div>
            <div className="branches-card-list">
                {renderList.filter((item)=>{
                    if (filterByName == '') return item;
                    else {
                        if (item.name.toLowerCase().includes(filterByName.toLowerCase())) return item;
                    }
                }).map(({id, name, address, opening_hours, phone})=>(
                    <div key={id} className="branches-card-list-item">
                        <h1 className="branches-card-title">{name}</h1>
                        <p className="branches-card-subtitle">Адрес:</p>
                        <p className="branches-card-description">{address}</p>
                        <p className="branches-card-subtitle">Телефон:</p>
                        <p className="branches-card-description">{phone}</p>
                        <p className="branches-card-subtitle">График работы:</p>
                        {opening_hours.split('#').map((item, index)=>(
                            <p key={index} className="branches-card-description">{item}</p>
                        ))}
                        <p className="branches-card-description">{}</p>
                        <div className="branches-card-options">
                            <div className="card-options-close-extra-window" onClick={(e)=>{
                                e.target.nextSibling.childNodes[1].style.display = "none";
                                e.target.style.display = 'none';
                            }}>
                            </div>
                            <div className="branches-card-option-button-holder">
                                <p className="branches-card-options-button" onClick={(e)=>{
                                    e.target.parentNode.previousSibling.style.display = "block";
                                    e.target.nextSibling.style.display = "block"
                                }}>...</p>
                                <div className="card-options-open-window">
                                    <p className="option-open-window-button" onClick={(e)=>{
                                        setDeleteBranch({id: id, name: name, removeBranchElement: (e)=>{e.target.parentNode.parentNode.parentNode.parentNode.remove()}});
                                        // axios.delete(`https://neocafe6.herokuapp.com/branches/${id}`).then((res)=>{
                                        //     if (res.status == 200) 
                                        // })
                                    }}>Удалить</p>
                                    <p className="option-open-window-button">Редактировать</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Branches
