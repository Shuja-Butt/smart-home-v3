

import Header from "../header/Header";
import ScrollToTop from "../Scrolltotop/ScrollToTop";
import Faq from "../faq/Faq";
import Subscribe from "../subscribe/Subscribe";
import Features from "../features/Features";


const DashBaordPannel=()=>{

return (


    <>
   
    <header className="header-bg">
    <Header />
  </header>
   <ScrollToTop />
  <Features data-aos="fade-up" />
  <Subscribe />
  <Faq />
 

  </>




)



}

export default DashBaordPannel;