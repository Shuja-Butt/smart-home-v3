import React , { useEffect }from "react";
import "./Footer.css";
import logo from "../../assets/logo.png";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFax,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";


const Footer = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);
  return (
    <section id="footer">
      <div className="container footer">
       
        <div className="footer-box">
          <h4>Contact Us</h4>
          <div className="footer-contact u-text-small">
            <p>
              <FaMapMarkerAlt /> &nbsp; Address: United States.
            </p>
            <p>
              <FaPhoneAlt /> &nbsp; Phone: +1230 123 1231.
            </p>
            <p>
              <FaFax /> &nbsp; Fax: +12342762178
            </p>
            <p>
              <FaEnvelope /> &nbsp; Email: info@socialx.com
            </p>
            <p>
              <FaGlobe /> &nbsp; Website: www.socialx.com
            </p>
          </div>
        </div>
        <div className="footer-box">
          <img src={logo} alt="" />
          <p className="u-text-small">&copy; Copyright 2021. Cloud Based Home Automation.com</p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
