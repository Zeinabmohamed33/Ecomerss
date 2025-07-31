import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import slider1 from "../../assets/images/slider-image-1.jpeg"
import slider2 from "../../assets/images/slider-image-2.jpeg"
import slider3 from "../../assets/images/slider-image-3.jpeg"
import slider5 from "../../assets/images/grocery-banner-2.jpeg"


export default function MainSlider() {


        var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true ,
    autoplaySpeed:1000 ,

  };
  return (
    <div>


        <div className='my-5 row'>
            <div className='w-3/4'>
           
            <Slider {...settings}>
                 <img src={slider1} className='w-full h-[400px] object-cover' alt="" />
                  <img src={slider3} className='w-full h-[400px] object-cover' alt="" />
                   <img src={slider5} className='w-full h-[400px] object-cover' alt="" />
  
    </Slider>
                
            </div>

            <div className='w-1/4'>
            <img src={slider2} className='w-full h-[200px]' alt="" />
                  <img src={slider3} className='w-full h-[200px]' alt="" />
            </div>

        </div>

    </div>
  )
}
