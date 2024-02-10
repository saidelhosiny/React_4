import React, { useContext } from 'react'

import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import {Helmet} from "react-helmet";
import Slider from 'react-slick'
import { shantaContext } from '../../context/ContextStore'
import toast from 'react-hot-toast'



export default function ProductDetails() {

  
  let {addToCart} =   useContext(shantaContext)
  async function addProduct(id) {
    let response = await addToCart(id);

    

    if(response.status ==="success"){
      toast.success(response.message);
    }
    else{
      toast.error('Relax, relax and try again') 
    }

  }
  let params =  useParams()

function getPruductDetials(id){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
}

 let {data} =  useQuery("productDetails", ()=> getPruductDetials(params.id))

 const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  speed: 3000,
  autoplaySpeed: 3000,
  cssEase: "linear",
};


 
  return (
    <>
     <Helmet>
                <title>{data?.data.data.title.split(" ").splice(0,3).join(" ")}</title>
              
            </Helmet>


    {data?.data.data?
   <div className="row  py-2 align-items-center my-4">
     <div className=' col-md-4 '>

     <Slider {...settings}>
  
  {data?.data.data.images.map((x,index)=>
  
    <img src={x} alt={data?.data.data.title} key={index} className='w-100'/>
    
  )}

  </Slider>
    

    </div>
    <div className="col-md-8">
      <h2 className='h5'>{data?.data.data.title}</h2>
      <p>{data?.data.data.description}</p>


      <h6 className=' text-main'>{data?.data.data.category?.name}</h6>
      <h6 className=' text-main'> Price : {data?.data.data.category?.name} EGP</h6>

      <div className=' d-flex  justify-content-between'>

        <span>
        ratingsQuantity : {data?.data.data.ratingsQuantity}
        </span>

        <span>
          <i className=' fas fa-star rating-color'>
            {data?.data.data.ratingsAverage}

          </i>
        </span>

      </div>
      <button onClick={()=>addProduct(data.data.data._id)} className=' btn bg-main text-white  w-100 mt-2'>
        Add to cart
      </button>
    </div>
   </div>
    
  :""}
    
    
    </>
  )
}
