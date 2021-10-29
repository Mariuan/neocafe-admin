import React, { useState, useEffect } from 'react';
import './menu.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setProducts, setCategories } from '../../redux/actions/productActions';
import { useHistory } from 'react-router';
import ProductList from './components/ProductList';



const Menu = () => {
    const dispatch = useDispatch();
    
    
    const fetchProducts = async () => {
        const response = await axios.get('http://neocafe6.herokuapp.com/dishes').catch((err)=>console.log(err));
        dispatch(setProducts(response.data))
    }

    const fetchCategories = async () => {
        const response = await axios.get('https://neocafe6.herokuapp.com/categories');
        dispatch(setCategories(response.data));
    }
    

    useEffect(()=>{
        fetchProducts();
        fetchCategories();
    }, [])
    setTimeout(()=>{
        ;
    }, 500);
    return (
        <div className="menu">
            <ProductList></ProductList>
        </div>
    )
}

export default Menu
