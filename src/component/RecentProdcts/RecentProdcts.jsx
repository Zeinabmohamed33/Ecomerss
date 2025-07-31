
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import useProducts from '../../Hooks/useproducts'



export default function RecentProdcts() {


  let {addproducttocard ,  numberitems ,setnumberitems} =useContext(CartContext)
  let {data , isError , error , isLoading } =useProducts()

if(isError){
  return <h3>{error}</h3> ;
  
}

if(isLoading){
  return <div className="spinner" /> ;
}
  
async function addToCart(id){
  
 let res = await  addproducttocard(id)
 console.log(res.data) ;
 if(res.data.status == "success"){
  toast.success(res.data.message);
  setnumberitems(numberitems+1)
 }else{
 toast.error(res.data.message);
 }

 
}




  
//     const [products, setproducts] = useState([])
    
//     function getproduct(){
//         axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
//         .then((res) => {
//             console.log(res.data.data)
//             setproducts(res.data.data)

//         })
//         .catch(function(res){
//                         console.log(res)


//         })
//     }

// useEffect(() =>{
// getproduct()
// } ,[])
  return (
       <div className='row'>
      {  data?.data?.data.map((product) => (
        <div key={product.id} className='w-1/6'>
      
    
      <div className='p-2 my-2 product'>

          <Link to={`productDetails/${product.id}/${product.category.name}`}>
        <img src={product.imageCover} className='w-full' alt="" />
        <h3 className=' text-emerald-600'>{product.category.name}</h3>
        <h3 className='mb-1 font-semibold'>{product.title.split(" ").slice(0,2).join(" ")}</h3>
        <div className='flex justify-between p-3'>
            <span>{product.price}EGP</span>
            <span><i className='text-yellow-400 fas fa-star'></i> {product.ratingsAverage}</span>
        </div>
</Link>

        
        <button onClick={() => addToCart(product.id)} className='btn '>Add To Cart</button>


        
        <div>
            
        </div>
        
        
      </div>
       
      
      
         
       </div>
    
    ) )  } 
      
    </div>
  )
}


