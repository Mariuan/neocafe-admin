import React, { useState} from 'react'
import './Login.css';
import Eye from './media/Eye.svg';
import EyeSlash from './media/EyeSlash.svg';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/requests';
import { setLogin } from '../redux/actions/productActions';


const validatePhone = (phone) => {
    const re = /^((\+996|996|0)+([0-9]){9})$/;
    const regTest = new RegExp(re);
    return regTest.test(phone);
}


const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ phoneValidate, setPhoneValidate ] = useState(true);
    const [ correctData, setCorrectData ] = useState(true);
    const [ visiblePassword, setVissiblePassword ] = useState(false);

    const state = useSelector((state)=>state);
    const dispatch = useDispatch();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const data = {
            phone: parseInt(email),
            code: password
        }
        login(data).then((res)=>{
            console.log(res.data.token);
            dispatch(setLogin(res.data.token));
        }).then(()=>window.location = "/")
        console.log(validatePhone(email));
        
        
        
    }

    return (
        <div className="login-page">
            <div className="login-window">
                <div className="login-title">
                    <h1 className="login-title-p">Вход</h1>
                </div>
                <form className="login-form" onSubmit={handleLoginSubmit}>
                    { !phoneValidate &&
                    <>
                        <p className="login-input-title" style={{color: '#D70000'}}>*Неверный номер телефона</p>
                        <div className="login-form-login-input-box">
                            <input type="text" className="login-form-input" value={email} placeholder="(999)-99-99-99" onChange={(e)=>{
                                setEmail(e.target.value); 
                                setCorrectData(true)
                            }} style={{border: '1px solid #D70000'}}/>
                        </div>
                    </>}
                    { !correctData &&
                    <>
                        <p className="login-input-title" style={{color: '#D70000'}}>Введите ваш номер телефона</p>
                        <div className="login-form-login-input-box">
                            <input type="text" className="login-form-input" value={email} placeholder="(999)-99-99-99" onChange={(e)=>{
                                setEmail(e.target.value); 
                                setCorrectData(true)
                            }} style={{border: '1px solid #D70000'}}/>
                        </div>
                        <p className="login-input-title" style={{color: '#D70000'}}>Введите ваш пароль</p>
                        <div className="login-form-password-input-box">
                            <input type="password" className="login-form-input" style={{border: '1px solid #D70000'}} placeholder="Пароль" onChange={(e)=>setPassword(e.target.value)}/>
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
                    </>}
                    { phoneValidate && 
                    <>
                        {correctData && 
                        <>
                            <p className="login-input-title">Номер телефона</p>
                            <div className="login-form-login-input-box">
                                <input type="text" className="login-form-input" value={email} placeholder="(999)-99-99-99" onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                        </>}
                    </>}
                    { correctData &&
                    <>
                        <p className="login-input-title">Пароль</p>
                        <div className="login-form-password-input-box">
                            <input type="password" className="login-form-input" placeholder="Пароль" onChange={(e)=>setPassword(e.target.value)}/>
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
                    </>}
                    {!correctData && 
                    <p style={{color: '#D70000', margin: '10px'}}>*Неверный логин или пароль</p>   }
                    <br/>
                    <button type="submit" className="login-form-button">Далее</button>
                </form>
            </div>
        </div>
    )
}

export default Login
