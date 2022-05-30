import React, { useEffect } from "react";
import "./Header.css";
import Button from "../UI/Button/Button";
import "../UI/Button/Button.css";
import Headerimage from "../../assets/header.png";
import { BsMouse } from "react-icons/bs";
import Signin from '../../components/signin.component/signin'
import Signout from '../../components/signout.component/signout'
import { AuthenticatedTemplate, UnauthenticatedTemplate } from '@azure/msal-react'
import AOS from "aos";
import "aos/dist/aos.css";
import {useNavigate} from 'react-router-dom';

const Header = () => {


  const navigate = useNavigate()





  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <section id="header">
      <div className="container header">
        <div className="header-left" data-aos="fade-right">
          <h1>
            <span>Cloud Based Home Automation</span>  </h1>
          <h6>
            <span>Feel the luxury </span>
          </h6>
          <p className="u-text-small">
            SocialX is a Lorem ipsum dolor sit amet, consectetur adipisicing
            elit. Obcaecati ea aliquam sit nemo nisi! Nesciunt quis illum id qui
            et!
          </p>

          <UnauthenticatedTemplate>
            <div className="btn-dark">
              <Signin />
              <Signout />
            </div>
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <p class='auth-message' onClick={()=>navigate('/device_categories')} >Go To Devices</p>
          </AuthenticatedTemplate>
        </div>
        <div className="header-right" data-aos="fade-left">
          <img src={Headerimage} alt="phone" />
        </div>
      </div>
      <div className="floating-icon">
        <a href="#features">
          <BsMouse color="#fff" size={25} className="mouse" />
        </a>
      </div>
    </section>
  );
};

export default Header;
