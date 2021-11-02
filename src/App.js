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

function App() {
  const [page, setPage] = useState(0);
  const [header, setHeader ] = useState(true);
  const history = useHistory();
  useEffect(()=>{
    if (window.location.pathname == '/menu') setPage(0);
    else if (window.location.pathname == '/store') setPage(1);
    else if (window.location.pathname == '/branches') setPage(2);
    else if (window.location.pathname == '/employees') setPage(3);
    if (window.location.pathname=="/login") {
      setHeader(false);
    }
    else {
      setHeader(true);
    }
  }, [history]);

  return (
    <div className="App">
      {header && 
      <div className="header">
      <img src={logo} alt="logo" className="header_icon"/>
      <div className="header-nav">
        {page == 0 &&
          <Link to="/menu" className="header-nav_item active" onClick={(e)=>{
            const list =  e.target.parentNode.childNodes;
            for (let i = 0; i < 4; i++) {
              list[i].classList.remove('active');
            }
            e.target.classList.add('active');
            setPage(0);
          }}>
            Меню
          </Link>
        }
        {page != 0 &&
          <Link to="/menu" className="header-nav_item" onClick={(e)=>{
            const list =  e.target.parentNode.childNodes;
            for (let i = 0; i < 4; i++) {
              list[i].classList.remove('active');
            }
            e.target.classList.add('active');
            setPage(0);
          }}>
            Меню
          </Link>
        }
        {page == 1 &&
          <Link to="/store" className="header-nav_item active" onClick={(e)=>{
            const list =  e.target.parentNode.childNodes;
            for (let i = 0; i < 4; i++) {
              list[i].classList.remove('active');
            }
            e.target.classList.add('active');
            setPage(1);
          }}>
            Склад
          </Link>
        }
        {page != 1 &&
          <Link to="/store" className="header-nav_item" onClick={(e)=>{
            const list =  e.target.parentNode.childNodes;
            for (let i = 0; i < 4; i++) {
              list[i].classList.remove('active');
            }
            e.target.classList.add('active');
            setPage(1);
          }}>
            Склад
          </Link>
        }
        {page == 2 &&
        <Link to="/branches" className="header-nav_item active" onClick={(e)=>{
          const list =  e.target.parentNode.childNodes;
          for (let i = 0; i < 4; i++) {
            list[i].classList.remove('active');
          }
          e.target.classList.add('active');
          setPage(2);
        }}>
          Филиалы
        </Link>}
        {page != 2 &&
        <Link to="/branches" className="header-nav_item" onClick={(e)=>{
          const list =  e.target.parentNode.childNodes;
          for (let i = 0; i < 4; i++) {
            list[i].classList.remove('active');
          }
          e.target.classList.add('active');
          setPage(2);
        }}>
          Филиалы
        </Link>}
        {page == 3 &&
        <Link to="/employees" className="header-nav_item active" onClick={(e)=>{
          const list =  e.target.parentNode.childNodes;
          for (let i = 0; i < 4; i++) {
            list[i].classList.remove('active');
          }
          e.target.classList.add('active');
          setPage(3);
        }}>
          Сотрудники
        </Link>}
        {page != 3 &&
        <Link to="/employees" className="header-nav_item" onClick={(e)=>{
          const list =  e.target.parentNode.childNodes;
          for (let i = 0; i < 4; i++) {
            list[i].classList.remove('active');
          }
          e.target.classList.add('active');
          setPage(3);
        }}>
          Сотрудники
        </Link>}

      </div>
      <div className="header_extra-options">
        <img src={notification_logo} alt="notifications" className="header_notification-logo"/>
        <img src={SignOutLogo} alt="Sign out" className="header_signout-logo"/>
      </div>
    </div>}
      <Switch>
        <Route path="/" exact component={Main}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/menu" component={Menu}></Route>
        <Route path="/store" component={Store}></Route>
        <Route path="/branches" component={Branches}></Route>
        <Route path="/employees" component={Employees}></Route>
      </Switch>
    </div>
  );
}

export default App;