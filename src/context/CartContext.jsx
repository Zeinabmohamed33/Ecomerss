/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";


export  let CartContext = createContext() ;

export default function CartContextprovider(props){
    const [cartId, setcartIdt] = useState(0)
    const [numberitems, setnumberitems] = useState(0)
  

    let headers ={ 
          token: localStorage.getItem("userToken") 
    };

function addproducttocard(productId){
   return axios
   .post(`https://ecommerce.routemisr.com/api/v1/cart` ,
         {productId : productId }, 
        {
           headers,
        })

        .then((res) => res)
        .catch((res) => res)
      
        

}

function getLoggedUsercart(){
    // console.log("headers:", headers);
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
        headers ,
    })
    .then((res) =>{
            // console.log(res.data.data._id)
            setcartIdt(res.data.data._id)
console.log(res.data.numOfCartItems)
 setnumberitems(res.data.numOfCartItems)

        return res
    }
        
    )
    .catch((err) => { throw err } )
    
}


function updateCartProductCountity(productId ,newcount){
    // console.log("headers:", headers);
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count:newcount} ,{headers} )
    .then((res) =>res)
    .catch((err) => { throw err } )
    
}

function DelateCartItem(productId){
 return   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}` ,{headers})
       .then((res) =>res)
    .catch((err) => { throw err } )

}


function Chackout(cardtId , url , formData  ){
 return   axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cardtId}?url=${url}` ,{shippingAddress:formData},{headers} )
       .then((res) =>res)
    .catch((err) => { throw err } )

}



    return <CartContext.Provider value={{
        addproducttocard ,
     getLoggedUsercart ,
     updateCartProductCountity ,
     DelateCartItem 
     , Chackout
     ,cartId
     , numberitems
     ,setnumberitems }}>
        {props.children}
    </CartContext.Provider>

}