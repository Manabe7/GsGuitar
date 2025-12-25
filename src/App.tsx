import { useEffect, useState } from 'react'
import './App.css'
import Home from './component/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from './component/Blog'
import Store from './component/Store'
import Course from './component/Course'
import UserProfilePage from './component/UserProfilePage';
import OrdersPage from './component/OrdersPage';
import SettingPage from './component/SettingPage';
import CartCheckOut from './component/CartCheckOut';
import AllNoti from './component/AllNoti';
import { AuthContext } from './component/Context/LogInContext';
import { UsersContext} from './component/Context/UserDataContext';
import { useContext } from 'react';
import GsServerAPI from './api/GsServerAPI';

function App() {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { 
    setFirstName,
    setEmail,
    setAccessToken,
    accessToken
  } = useContext(UsersContext); 
  useEffect( () => {
    const checkLoginStatus = async () => {
      try {
        const response = await GsServerAPI.get("/refresh", { withCredentials: true });
        if (response.status === 200) {
          if (response.data) {
              setFirstName && setFirstName(JSON.stringify(response.data.currentUser.firstName));
              setEmail && setEmail(JSON.stringify(response.data.currentUser.email));
              setAccessToken && setAccessToken(response.data.accessToken);
              localStorage.setItem("Name", JSON.stringify(response.data.currentUser.firstName));
              console.log("User is logged in:", response.data.currentUser);
              console.log("Access Token:", accessToken);
          }if (setIsLoggedIn) {
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("User is not logged in:", error);
        if (setIsLoggedIn) {
          setIsLoggedIn(false);
        }
      }
    };
    checkLoginStatus();
  }
  , [accessToken]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/Home' element={<Home/>}/>
          <Route path='/Blog' element={<Blog/>}/>
          <Route path='/Store' element={<Store/>}/>
          <Route path='/Course' element={<Course/>}/>
          <Route path='/UserProfilePage' element={<UserProfilePage/>}/>
          <Route path='/OrdersPage' element={<OrdersPage/>}/>
          <Route path='/SettingPage' element={<SettingPage/>}/>
          <Route path='/CartCheckOut' element={<CartCheckOut/>}/>
          <Route path='/AllNoti' element={<AllNoti/>}/>
          <Route path='*' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
