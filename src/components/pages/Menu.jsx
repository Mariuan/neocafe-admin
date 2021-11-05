import React, { useState, useEffect } from 'react';
import './menu.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProducts, setCategories, setDishes } from '../../redux/actions/productActions';
import { Route, Switch } from 'react-router-dom';
import ProductList from './components/ProductList';
import NewDish from './components/NewDish';



const Menu = () => {
    const dispatch = useDispatch();
    
    
    const fetchDishes = async () => {
        axios.get('https://neocafe6.herokuapp.com/dishes/detailed').catch((err)=>console.log(err)).then((res)=>dispatch(setDishes(res.data)));
    }

    const fetchCategories = async () => {
        axios.get('https://neocafe6.herokuapp.com/categories').then((res)=>dispatch(setCategories(res.data)));
    }
    

    useEffect(()=>{
        fetchDishes();
        fetchCategories();
    }, [])
    setTimeout(()=>{
        ;
    }, 500);
    return (
        <div className="menu">
            <Switch>
                <ProductList></ProductList>
            </Switch>
            
        </div>
    )
}

export default Menu
