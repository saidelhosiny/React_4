import React from 'react'
import imgFooter  from "./404.png"

export default function Footer() {
  return (
    <>


    <div className="color-footer">
        <div className="container  pt-5">
            <h3>
                <h3> Get the FreshCart app</h3>
                <p className=' fs-5'>We Well Send You a link, open it in your phone to download the app</p>
             <div className="d-flex ">
             <input type="text" placeholder=' Email..' className=' form-control w-75' name="" id="" />
            <button className=' mx-4 btn bg-main text-white'> Share App Link</button>
            
             </div>
             <img src={imgFooter}  className=' w-75 pt-4' alt="" />
            </h3>
        </div>
    </div>
    
    
    </>
  )
}
