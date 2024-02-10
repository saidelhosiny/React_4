
import jwtDecode from 'jwt-decode'
import React from 'react'
import { Helmet } from 'react-helmet';

export default function Profile() {


 let x  =  jwtDecode(localStorage.getItem("token"))

 console.log(x);
 

  return (
    <>
    <Helmet>
        <title>Profile: {x.name}</title>
      </Helmet>
    
    <h1 className=' text-center '>Hello Ya  {x.name} </h1>
    
   
    </>
  )
}
