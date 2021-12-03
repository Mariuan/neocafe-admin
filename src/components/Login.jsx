import React, { useState} from 'react'
import './Login.css';
import Eye from './media/Eye.svg';
import EyeSlash from './media/EyeSlash.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../redux/actions/productActions';
import axios from 'axios';


const validatePhone = (phone) => {
    const re = /^((\+996|996|0)+([0-9]){9})$/;
    const regTest = new RegExp(re);
    return regTest.test(phone);
}


const Login = () => {
    const [ phone, setPhone ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ phoneValidate, setPhoneValidate ] = useState(true);
    const [ correctData, setCorrectData ] = useState(true);
    const [ visiblePassword, setVissiblePassword ] = useState(false);

    const state = useSelector((state)=>state);
    const dispatch = useDispatch();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        let loginPhone = '';
        if (validatePhone(phone)) {
            if (phone[0] == 0) loginPhone = phone.slice(1);
            else if (phone[0] == '+') loginPhone = phone.slice(4);
            else {
                loginPhone = phone.slice(3);
            }
            axios.post('https://neocafe6.herokuapp.com/adminLogin', {
            "phone": parseInt(loginPhone),
            "code": password
            }).catch((err)=>{
                setCorrectData(false);
            }).then((res)=>{
                if (res){
                    console.log(res);
                    dispatch(setLogin(res.data.token));
                    window.location = '/';
                }
                
            })
        }
        else setPhoneValidate(false);
    }

    return (
        <div className="login-page">
            <div className="login-window">
                <div className="login-title">
                    <h1 className="login-title-p">Вход</h1>
                </div>
                <form className="login-form" onSubmit={handleLoginSubmit}>
                    {correctData &&
                    <p className="login-input-title">Номер телефона</p>}
                    <div className="login-form-login-input-box">
                        <input type="text" 
                        className={`login-form-input ${!phoneValidate && `incorrect`} ${phoneValidate && `${!correctData && `incorrect`}`}`} 
                        value={phone}
                        placeholder="(999)-99-99-99"
                        onChange={(e)=>{
                            setPhone(e.target.value);
                        }}/>
                    </div>
                    {correctData &&
                    <p className="login-input-title">Пароль</p>}
                    <div className="login-form-password-input-box">
                        <input type="password" 
                        className={`login-form-input ${!correctData && `incorrect`}`}
                        placeholder="Пароль"
                        onChange={(e)=>{
                            setPassword(e.target.value);
                        }}/>
                        {!visiblePassword &&
                        <button type="button" className="show-password-icon" onClick={(e)=>{
                            setVissiblePassword(true);
                            e.target.previousSibling.type = 'text';
                        }}><img src={EyeSlash} alt="eye-icon" width={28}/></button>}
                        {visiblePassword &&
                            <button type="button" className="show-password-icon" onClick={(e)=>{
                                setVissiblePassword(false);
                                e.target.previousSibling.type = 'password';
                            }}><img src={Eye} alt="eye-icon" width={28}/></button>}
                    </div>
                    {!phoneValidate &&
                    <p style={{color: '#D70000', margin: '4px 0'}}>*Введите правильный номер телефона</p>}
                    {phoneValidate &&
                    <>
                        {!correctData && 
                        <p style={{color: '#D70000', margin: '4px 0'}}>*Неверный номер телефона или пароль</p>}
                    </>}




                    <br/>
                    <button type="submit" className="login-form-button">Далее</button>
                </form>
            </div>
        </div>
    )
}

export default Login
