import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
export default function Useproducts() {
    


  function getproduct(){
   return  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }

let produtInfo = useQuery({
  queryKey:["recentproduct"] ,
  queryFn: getproduct,
  staleTime: 100000 ,  
  // retry: 7 ,
  // retryDelay:3000,
  // refetchInterval:3000, 
  // refetchIntervalInBackground: true ,
  // refetchOnWindowFocus: true ,
  
  
})
return produtInfo
  // eslint-disable-next-line no-unreachable
  return (
    <div>
      
    </div>
  )
}
