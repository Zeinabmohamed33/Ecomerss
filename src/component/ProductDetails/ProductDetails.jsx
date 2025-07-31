import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Slider from "react-slick";

import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import useProducts from '../../Hooks/useproducts';




Link
export default function ProductDetails() {
    let {addproducttocard} =useContext(CartContext)
  let {data , isError , error , isLoading } =useProducts()
    let {anything ,category} = useParams()
    const [product, setproduct] = useState(null)
    const [related , setrelated] = useState([])
    console.log(anything)


    function getproduct(anything){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${anything}`)

        .then((res)=> {
            console.log(res.data.data)
            setproduct(res.data.data)

        })
        .catch((res) =>{
 console.log(res)
        })
    }

    function getAllproduct(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then((res) =>{
            console.log(res.data.data)
      let related =      res.data.data.filter((product) => product.category.name == category )
      console.log(related)
      setrelated(related)
        })
        .catch((res) => {
            
        })
    }
useEffect(() => {
    getproduct(anything)  
    getAllproduct()
} ,[anything ,category]) 

     var settings = {
dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true ,
    autoplaySpeed:1000 ,

  };


if(isError){
  return <h3>{error}</h3> ;
  
}

if(isLoading){
  return <div className="spinner" /> ;
}
async function addToCart(id){
  
 let res = await  addproducttocard(id)
 console.log(res) ;
 if(res.data.status == "success"){
  toast.success(res.data.message);
 }else{
 toast.error(res.data.message);
 }

 
}
  return (
    <div>
     <div className='items-center row'>
        <div className='w-1/4'>
     
          <Slider {...settings}>
            {product?.images.map((src) =>  <img key={src._id} src={src} className='w-full' alt="" />)}
          </Slider>
            
        </div>
         <div className='w-3/4 p-4'>
         <h3 className='text-2xl font-semibold capitalize'>{product?.title}</h3>
         <h4 className='my-4 text-gray-700'>{product?.description}</h4>
         <h4 className=''>{product?.category.name}</h4>
         <div className='flex justify-between p-3 my-5'>
            <span>{product?.price}EGP</span>
            <span><i className='text-yellow-400 fas fa-star'></i> {product?.ratingsAverage}</span>
        </div>

         
        <button className='btn '>Add To Cart</button>
        </div>
     </div>
     
    <div className='row'>
      { related.length > 0 ?  related.map((related , index) => (
        <div key={index} className='w-1/6'>
      
    
      <div className='p-2 my-2 product'>

          <Link to={`/productDetails/${related.id}/${related.category.name}`}>
        <img src={related.imageCover} className='w-full' alt="" />
        <h3 className=' text-emerald-600'>{related.category.name}</h3>
        <h3 className='mb-1 font-semibold'>{related.title.split(" ").slice(0,2).join(" ")}</h3>
        <div className='flex justify-between p-3'>
            <span>{related.price}EGP</span>
            <span><i className='text-yellow-400 fas fa-star'></i> {related.ratingsAverage}</span>
        </div>
</Link>

        
        <button className='btn ' onClick={() => addToCart(related.id)}>Add To Cart</button>


        
        <div>
            
        </div>
        
        
      </div>
       
      
      
         
       </div>
    
    ) )  : <div className="spinner" />} 
      
    </div>
    </div>
  )
}
