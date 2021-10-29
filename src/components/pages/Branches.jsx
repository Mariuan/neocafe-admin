import React, {useState} from 'react';
import Search from './components/Search';
import AddButton from '../media/AddButton.svg';
import './branches.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Branches = () => {
    const dispatch = useDispatch();
    const [ filterByName, setFilterByName] = useState('');
    const handleFilterByName = (e) => {
        setFilterByName(e.target.value);
    }
    const products = useSelector((state)=>state);
    const renderList = products.allProducts.branches;
    return (
        <div className="branches">
            <div className="branches-filter-block">
                <div className="branches-filter-search">
                    <Search handleFilterByName={handleFilterByName}></Search>
                </div>
                <div className="branches-filter-extra-options">
                    <img src={AddButton} alt="add new employees button" className="branches-filter-add-button" />
                </div>
            </div>
            <div className="branches-card-list">
                {renderList.filter((item)=>{
                    if (filterByName == '') return item;
                    else {
                        if (item.name.toLowerCase().includes(filterByName.toLowerCase())) return item;
                    }
                }).map(({id, name, address, schedule, phone})=>(
                    <div key={id} className="branches-card-list-item">
                        <h1 className="branches-card-title">{name}</h1>
                        <p className="branches-card-subtitle">Адрес:</p>
                        <p className="branches-card-description">{address}</p>
                        <p className="branches-card-subtitle">Телефон:</p>
                        <p className="branches-card-description">{phone}</p>
                        <p className="branches-card-subtitle">График работы:</p>
                        <p className="branches-card-description">{schedule[0]}</p>
                        <p className="branches-card-description">{schedule[1]}</p>
                        <p className="branches-card-description">{schedule[2]}</p>
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
                                        e.target.parentNode.parentNode.parentNode.parentNode.remove();
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
