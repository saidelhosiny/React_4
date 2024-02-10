import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import { Offline } from "react-detect-offline";
import Footer from '../footer/Footer';

export default function Layout() {
  return <>
  <Navbar/>

  
  <div className=' container'>


  <Outlet></Outlet>



  </div>
  <Footer/>
   <div className='network'>
    <Offline> <i className="fa-solid fa-wifi"></i>  you are offline (surprise!)</Offline>
   </div>
  </>
}
