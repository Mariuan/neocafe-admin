import React, { useState, useEffect } from 'react';
import './menu.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProducts, setCategories, setDishes } from '../../redux/actions/productActions';
import { Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';



const Menu = () => {
    const dispatch = useDispatch();
    
    
    const fetchDishes = async () => {
        axios.get('https://neocafe6.herokuapp.com/dishes/detailed',{page: 0, limit: 1000}).catch((err)=>console.log(err)).then((res)=>{
            dispatch(setDishes(res.data));
        });
    }

    const fetchCategories = async () => {
        axios.get('https://neocafe6.herokuapp.com/categories').then((res)=>dispatch(setCategories(res.data)));
    }
    

    useEffect(()=>{
        fetchDishes();
        fetchCategories();
    }, [])
    return (
        <div className="menu">
            <Switch>
                <ProductList></ProductList>
            </Switch>
            
        </div>
    )
}

export default Menu
