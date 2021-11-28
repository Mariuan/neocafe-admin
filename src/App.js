import './App.css';
import { Switch, Route, Redirect, Link, useHistory } from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { setProducts } from './redux/actions/productActions';
import Main from './components/Main';
import './components/main.css';
import Login from './components/Login';
import Menu from './components/pages/Menu';
import Store from './components/pages/Store';
import Branches from './components/pages/Branches';
import Employees from './components/pages/Employees';
import logo from './components/media/neocafe.svg';
import notification_logo from './components/media/notification-logo.svg'; 
import SignOutLogo from './components/media/SignOut.svg';
import LoginCheck from './components/LoginCheck';
import { setToken } from './redux/actions/productActions';
import EditDish from './components/pages/EditDish';
import NewDish from './components/pages/components/NewDish';
import NewProduct from './components/pages/components/NewProduct';
import NewEmployee from './components/pages/components/NewEmployee';
import NewBranch from './components/pages/components/NewBranch';
import EditBranch from './components/pages/components/EditBranch';
import EditEmployees from './components/pages/components/EdtiEmployee';

function App() {
  const dispatch = useDispatch()
  const state = useSelector((state)=>state);
  if (!state.allProducts.token) {
    if (localStorage.getItem('neo-cafe-admin-token')){
      axios.get('https://neocafe6.herokuapp.com/users', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('neo-cafe-admin-token')}`
            }
        }).catch((err)=>{
            localStorage.clear();
        }).then((res)=>{
            if (res.status) {
                if (res.status >= 200 && res.status < 400) {
                    dispatch(setToken(localStorage.getItem('neo-cafe-admin-token')));
                }
            }
        })
    }
    else {
      return(
        <>
          <Route path="/login" component={LoginCheck}/>
          <Redirect to="/login"/>
        </>
      )
    }
  }
  else {
    return(
      <>
        <Route path="/" component={Main}/>
        <Switch>
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/menu/new-dish" component={NewDish}/>
          <Route path="/menu/:id" component={EditDish}/>
          <Route exact path="/store" component={Store}/>
          <Route exact path="/store/new-product" component={NewProduct}/>
          <Route exact path="/branches" component={Branches}/>
          <Route exact path="/branches/new-branch" component={NewBranch}></Route>
          <Route path="/branches/:id" exact component={EditBranch}></Route>
          <Route exact path="/employees" component={Employees}/>
          <Route path="/employees/:phone" component={EditEmployees}/>
          <Route exact path="/new-employee" component={NewEmployee}></Route>
        </Switch>
      </>
    )
  }
  return (
    <></>
  );
}

export default App;