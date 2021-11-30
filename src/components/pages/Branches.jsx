import React, {useEffect, useState} from 'react';
import Search from './components/Search';
import AddButton from '../media/AddButton.svg';
import './branches.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setBranches } from '../../redux/actions/productActions';
import { toast } from 'react-toastify';


const fetchBranches = async () => {
    const response = await axios.get('https://neocafe6.herokuapp.com/branches');
    return await response.data.data;
}

const scheduleParse = (schedule) =>{
    let res = '';
    for (let i in schedule) {
        if (i == schedule.length-1) {
            res = res + schedule[i].name + '\t - с ' + schedule[i].start + ' до ' + schedule[i].finish;
        }
        else {
            res = res + schedule[i].name + '\t - с ' + schedule[i].start + ' до ' + schedule[i].finish + ',\n';
        }
    }
    return res;
}

const Branches = () => {
    const dispatch = useDispatch();
    const [ filterByName, setFilterByName] = useState('');
    const [deleteBranchData, setDeleteBranchData] = useState(null);
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
            {deleteBranchData && 
            <div className="delete-branch-frame">
                <div className="delete-branch-underframe">
                    <div className="delete-branch-window">
                        <div className="delete-branch-title">Вы правда хотите удалить филиал <b>«{deleteBranchData.name}»?</b></div>
                        <button
                        className="delete-branch-confirm-button"
                        onClick={(e)=>{
                            e.target.parentNode.style.opacity = '.8';
                            toast.promise(
                            axios.delete(`https://neocafe6.herokuapp.com/branches/${deleteBranchData.id}`).then((res)=>{
                                if (res.status == 200) deleteBranchData.element.remove();
                                setDeleteBranchData(null);
                                document.body.style.overflow = 'auto';
                                e.target.parentNode.style.opacity = '1';
                            }),
                            {
                                pending: 'Удаление',
                                success: 'Филиал удален',
                                error: 'Ошибка'
                            });
                        }}>Да</button>
                        <button
                        className="delete-branch-reject-button"
                        onClick={()=>{
                            setDeleteBranchData(null);
                            document.body.style.overflow = 'auto';
                        }}>Нет</button>
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
                        <p className="branches-card-description" style={{whiteSpace: "pre-wrap"}}>{scheduleParse(JSON.parse(opening_hours))}</p>
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
                                        setDeleteBranchData({id: id, name: name, element: e.target.parentNode.parentNode.parentNode.parentNode});
                                        e.target.parentNode.parentNode.previousSibling.style.display = 'none';
                                        e.target.parentNode.style.display = 'none';
                                        document.body.style.overflow = 'hidden';
                                    }}>Удалить</p>
                                    <p className="option-open-window-button"
                                    onClick={(e)=>window.location = `/branches/${id}`}>Редактировать</p>
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
