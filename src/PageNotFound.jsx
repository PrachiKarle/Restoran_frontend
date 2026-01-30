import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const nav=useNavigate();
  const goTo=()=>{
    nav('/');
  }
  return (
   <>
    <div className="row m-0 p-5">
        <div className="col-12 m-0 p-5 text-center">
            <h1 className='cur_text fw-bold'>Page Not Found</h1>
            <button className='btn btn_1 text-light' onClick={()=>goTo()}>Go To Home</button>
        </div>
    </div>
   </>
  )
}

export default PageNotFound