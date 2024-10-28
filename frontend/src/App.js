import { Link, Outlet, Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux';
import { getTokenFromLocalStorage } from './utils/headerConfig';
import { setUser } from './features/users/userSlice';


function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authentication")
  ? localStorage.getItem("authentication")
  : null;
; 
  if (token) {
    try {
        const decode = jwtDecode(token);
        dispatch(setUser(decode.id));
    } catch (error) {
        console.error('Invalid token:', error);
    }
  }

  return(
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App;
