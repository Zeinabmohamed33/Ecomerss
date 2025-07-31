import React from 'react'

import style from  "./Home.module.css";
import RecentProdcts from '../RecentProdcts/RecentProdcts';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';



export default function Home() {
  return (
    <>
    <MainSlider/>
    <CategoriesSlider/>
<RecentProdcts/>
      
    </>
  )
}
