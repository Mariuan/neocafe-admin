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
        axios.get('//neocafe6.herokuapp.com/dishes').catch((err)=>console.log(err)).then((res)=>dispatch(setProducts(res.data)));
    }

    const fetchCategories = async () => {
        axios.get('https://neocafe6.herokuapp.com/categories').then((res)=>dispatch(setCategories(res.data)));
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
