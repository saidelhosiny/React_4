import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'


export default function BrandDetails() {
  
  let [DataBrand, setDataBrand] = useState({})

let {id} =   useParams()



  async function getBrandDetails(){
 let {data} =  await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)


 setDataBrand(data.data)

 console.log(data.data);

}

let {image , name} =  DataBrand

useEffect(() => {
  getBrandDetails();
  
}, [])





  return (
    <>

<Helmet>
<title>{name}</title>
</Helmet>


<div className="row">

<div className="col-lg-12">
  <div>
    <img src={image} className=' w-75' alt="" />
  </div>
</div>

 
</div>
    
    </>
  )
}
