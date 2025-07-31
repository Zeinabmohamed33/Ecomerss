/* eslint-disable react/jsx-key */
import React, { useContext, useEffect, useState } from 'react'

import style from "./Cart.module.css";
import { CartContext } from '../../context/CartContext';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';



export default function Cart() {
  const [cartDetails , setcartDetails ] =useState(null)
  let {getLoggedUsercart ,updateCartProductCountity ,DelateCartItem ,numberitems ,setnumberitems} = useContext(CartContext)
  async function getCartItems(){
    let response =await getLoggedUsercart();
    console.log(response.data.data)

    if(response.data.status == "success"){
      setcartDetails(response.data.data)

    }else{
        console.log(response)

    }

  }


 async function updatepriduct(id , count){

    if(count == 0){
        DelateItem(id)

    }else{
 let response =  await updateCartProductCountity(id ,count) ;
  console.log(response)
    
    if(response.data.status == "success"){
        setcartDetails(response.data.data)
          toast.success("product updated success ")

    }else{
       toast.error(" error  ")
    }
    }
 

  }


 async function DelateItem(productId){
  let response = await DelateCartItem(productId);
  console.log(response)
   if(response?.data?.status == "success"){
          toast.success("product updated success ")
          setcartDetails(response.data.data)
            setnumberitems(numberitems-1)

    }else{
       toast.error(" error  ")
       console.log(response)
    }

  }

  useEffect(() => {
getCartItems() ;
  } ,[])
  return (
  <>
    {cartDetails && cartDetails.products.length > 0 ? (
      <div>
        <div className='flex justify-around my-4'>
             <button className=' bg-emerald-600 text-white px-4 rounded-[16px] font-bold'>Clear All Product</button>
              <h2 className='text-center text-2xl text-emerald-600 font-bold capitalize my-4'>
          Total Price: {cartDetails.totalCartPrice}
        </h2>
        </div>
       

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">Product</th>
                <th scope="col" className="px-6 py-3">Qty</th>
                <th scope="col" className="px-6 py-3">Price</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartDetails.products.map((product) => (
                <tr
                  key={product._id}
                  className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 max-w-full max-h-full md:w-32"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => updatepriduct(product.product.id, product.count - 1)}
                        className="inline-flex items-center justify-center w-6 h-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full me-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Decrease</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span>{product.count}</span>
                      </div>
                      <button
                        onClick={() => updatepriduct(product.product.id, product.count + 1)}
                        className="inline-flex items-center justify-center w-6 h-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full ms-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Increase</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price * product.count}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                      onClick={() => DelateItem(product.product.id)}
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to={`/cheakout`}>
              <button className=' btn my-3' >CheckOut!</button>
          </Link>
      
        </div>


       
      </div>
    ) : (
      <h1 className="text-3xl text-red-800 font-bold text-center my-8">
        There are no items to show
      </h1>
    )}
  </>
);
}
