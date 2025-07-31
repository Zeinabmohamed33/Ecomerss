/* eslint-disable react/jsx-key */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-3.jpeg"
import slider4 from "../../assets/images/grocery-banner.png"
import slider5 from "../../assets/images/grocery-banner-2.jpeg"



export default function CategoriesSlider() {

    const [Categories, setCategories] = useState([])

     var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay:true ,
    autoplaySpeed:1000 ,

  };

function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res) => {
        console.log(res.data.data)
        setCategories(res.data.data)

    })
    .catch()
}

useEffect(() =>{
    getCategories()
} ,[])

  return (
    <div>
        <h2 className='my-3 font-semibold text-gray-600 capitalize'> shop popular categories</h2>
   <Slider {...settings}>
   {Categories.map((Categories)=> 
    <div  key={Categories._id}>
        <img src={Categories.image} className='w-full h-[200px] object-cover' alt="" />
       
        <h4>{Categories.name} </h4>

    </div>

) }
    </Slider>
    </div>
  )
}
