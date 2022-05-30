import React , { useState, useEffect }  from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
import './App.css';
import { css } from "@emotion/react"
import HomePage from './pages/homepage/homepage'
import HomeRegistrationContainer from './pages/home_registration_container/home_registration_container'
import Navbar from './components/navbar.component/navbar'
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import Header from './components/header/Header';
import Features from './components/features/Features';
import Faq from './components/faq/Faq';
import Subscribe from './components/subscribe/Subscribe';
import Download from './components/download/Download';
import ScrollToTop from './components/Scrolltotop/ScrollToTop';
import DeviceReg from './components/device_registration/device_registration';
import DashBaordPannel from './components/dashboard_pannel/dashboard_pannel';


// import {useIsAuthenticated} from '@azure/msal-react'



function App() {
  const [loading, setLoading] = useState(false);
  const override = css`
  display: block;
  margin-top: 20%;
  border-color: red;
`;
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)

  }, [])

  return (
    <div className='App'>
      {
        loading ? <PropagateLoader color={"#3d2514"} Loading={loading} css={override} size={40} />
          :
    <>
      <header className="header-bg">
        <Navbar />
      </header>
  
      <Routes>
      <Route path="/" element={< DashBaordPannel/>} />
        {/* <Route path="/register/devices" element={isUserAuthenticated?<HomeRegistration/>:<Navigate to='/'/>} /> */}
        <Route path="device_categories/*" element={<HomeRegistrationContainer/>} />
      </Routes>
     
  
      <Footer />


    </>
     }

     </div>
  );
}

export default App;
